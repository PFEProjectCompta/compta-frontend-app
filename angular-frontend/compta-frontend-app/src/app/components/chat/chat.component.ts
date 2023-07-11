import {AfterViewChecked, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {NgForm} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {AdminService} from "../../services/office-service/AdminService";
import {Observable} from 'rxjs';
import {ChatService} from "../../services/chat-service/ChatService";

declare var SockJS;
declare var Stomp;

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],

})
export class ChatComponent implements OnInit, AfterViewChecked {
  currentUser: string;
  id: string;
  username: string;
  dataSource: any[];
  dataSourceBackup: any[];
  recever_selected_id: string;
  recever_selected_username: string;
  messages_of_convercetion_selected: any[];
  notification_reced: any[] = [];
  dms: any[];
  input: string = '';
  public groupByName: { [key: string]: any[] } = {};
  inputElement: any;

  constructor(private http: HttpClient, public route: ActivatedRoute, public adminService: AdminService, public chatService: ChatService) {
    this.id = adminService.profile.id;
    this.username = adminService.profile.username;
    this.initializeWebSocketConnection();
    this.adminService.loadAdminsToSuperAdmin().subscribe(admins => {
      this.dataSource = admins;
    });
    this.dataSourceBackup = this.dataSource;
    this.getNotification().subscribe((data: any[]) => {
      data.forEach(a => {
        this.groupByName [a.senderName] = this.groupByName [a.senderName] || [];
        this.groupByName [a.senderName].push({
          senderId: a.senderId,
          senderName: a.senderName,
          timestamp: a.timestamp,
          nombre_message_unread: a.nombre_message_unread,
          status: a.status,
        });
      });
      this.notification_reced = data;
    });
  }

  notification() {
    this.getNotification().subscribe((data: any[]) => {
      console.log("salle : ", data);
      this.notification_reced = data;
    });
  }

  getNotification(): Observable<any[]> {
    return this.http.get<any[]>(`http://localhost:8086/messages/` + this.id + `/newMessagesNotif`);
  }

  getMessagesOfConversation(idsencer, idrecever): Observable<any[]> {
    return this.http.get<any[]>(`http://localhost:8086/messages/` + idsencer + `/` + idrecever);
  }

  name(nameForm: NgForm) {
    this.currentUser = nameForm.value.name;
    this.initializeWebSocketConnection();
  }

  sendMessage(sendForm: NgForm) {
    this.input = '';
    var msg = sendForm.value.message;
    if (msg !== "") {
      const message = {
        senderId: this.id,
        recipientId: this.recever_selected_id,
        senderName: this.username,
        recipientName: this.recever_selected_username,
        content: msg,
        timestamp: new Date(),
      };
      this.stompClient.send("/app/chat", {}, JSON.stringify(message));
      const message_to_push = {
        senderId: this.id,
        recipientId: this.recever_selected_id,
        senderName: this.username,
        recipientName: this.recever_selected_username,
        content: msg
      };
      this.dms.push(message_to_push);

    }
  }

  public stompClient;
  public msg = [];

  initializeWebSocketConnection() {
    const serverUrl = "http://localhost:8086/ws";
    console.log(serverUrl);
    const ws = new SockJS(serverUrl);
    this.stompClient = Stomp.over(ws);
    const that = this;
    this.stompClient.connect({}, () => {
      // const idParam = this.route.snapshot.params['id'];
      that.stompClient.subscribe("/user/" + this.id + "/queue/messages", (message) => {
        if (message.body) {
          var message_string = JSON.parse(message.body)
          console.log(message.body)

          if (message_string.senderId == this.recever_selected_id) {
            this.dms = [];
            this.chatService.loadMessagesOfConversation(this.id, this.recever_selected_id).subscribe(msg => {
              this.messages_of_convercetion_selected = msg;
            });

            this.getMessagesOfConversation(this.recever_selected_id, this.id).subscribe((data: any[]) => {
              console.log("salle : ", data);
              this.dms = data;
            });
          } else {
            this.getNotification().subscribe((data: any[]) => {
              data.forEach(a => {
                this.groupByName [a.senderName] = this.groupByName [a.senderName] || [];
                this.groupByName [a.senderName].push({
                  senderId: a.senderId,
                  senderName: a.senderName,
                  timestamp: a.timestamp,
                  nombre_message_unread: a.nombre_message_unread,
                  status: a.status,
                });
              });
              this.notification_reced = data;
            });
          }

        }
      });
    });
  }

  showConversation(id, username) {
    this.dms = [];
    this.recever_selected_id = id;
    this.recever_selected_username = username
    this.chatService.loadMessagesOfConversation(this.id, id).subscribe(msg => {
      this.messages_of_convercetion_selected = msg;
    });
    this.messages_of_convercetion_selected = this.chatService.dataSource;
    this.dms = this.chatService.dms;
    this.getMessagesOfConversation(id, this.id).subscribe((data: any[]) => {
      console.log("salle : ", data);
    });
  }

  @ViewChild('scrollMe') private myScrollContainer: ElementRef;

  ngOnInit() {
    this.scrollToBottom();
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) {
    }
  }

  showConversationNotification(notifs) {
    this.dms = [];
    for (let i = 0; i < notifs.length; i++) {
      this.recever_selected_id = notifs[i].senderId;
      this.recever_selected_username = notifs[i].senderName
    }
    this.chatService.loadMessagesOfConversation(this.id, this.recever_selected_id).subscribe(msg => {
      this.messages_of_convercetion_selected = msg;
    });
    this.dms = this.chatService.dms;
    this.getMessagesOfConversation(this.recever_selected_id, this.id).subscribe((data: any[]) => {
      this.dms = data;
    });
    this.getNotification()
      .toPromise()
      .then((data: any[]) => {
        this.groupByName = {};
        data.forEach((a) => {
          this.groupByName[a.senderName] = this.groupByName[a.senderName] || [];
          this.groupByName[a.senderName].push({
            senderId: a.senderId,
            senderName: a.senderName,
            timestamp: a.timestamp,
            nombre_message_unread: a.nombre_message_unread,
            status: a.status,
          });
        });
        this.notification_reced = data;
      }).catch((error) => {
      console.error("Error in getNotification():", error);
    });

  }

  @ViewChild('searchInputRef', {static: false}) searchInputRef!: ElementRef;

  filterItems() {
    this.inputElement = this.searchInputRef.nativeElement as HTMLInputElement;
    console.log("search : ", this.inputElement.value);
    this.dataSourceBackup = this.dataSource.filter(user =>
      user.userName.toLowerCase().includes(this.inputElement.value.toLowerCase())
    );
  }
}
