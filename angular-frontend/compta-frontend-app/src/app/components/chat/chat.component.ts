import {Component, OnDestroy, OnInit} from '@angular/core';
// import {Component, HostListener} from '@angular/core';
import {WebSocketService} from "../../services/web-socket.service";
import {FormControl, NgForm} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
declare var SockJS;
declare var Stomp;

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],

})
export class ChatComponent implements OnInit{
  input: FormControl = new FormControl();
  currentUser:string;
  id: string;
  constructor(public route: ActivatedRoute) {


  }
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
    });
    //console.log("ewhdjwhd",);

  }
  name(nameForm:NgForm){
     this.currentUser=nameForm.value.name;
    this.initializeWebSocketConnection();
  }

  sendMessage(sendForm:NgForm){
    //this.webSocketService.sendMessage(sendForm.value.message,this.currentUser,sendForm.value.user);
    var msg =sendForm.value.message;
    if (msg !== "") {
      const message = {
        senderId: this.id,
        recipientId: sendForm.value.user,
        senderName: this.id,
        recipientName: sendForm.value.user,
        content: msg,
        timestamp: new Date(),
      };
      console.log(message);
      this.stompClient.send("/app/chat", {}, JSON.stringify(message));
      //console.log("haniiiiiiiiiiiii"+this.route.snapshot.params['id'])
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
    this.stompClient.connect({}, ()=>{
      // const idParam = this.route.snapshot.params['id'];
      console.log("haniiiiiiiiiiiii",this.route.snapshot.params['id']);
      that.stompClient.subscribe("/user/" + this.route.snapshot.params['id'] + "/queue/messages", (message) => {
        console.log("haniiiiiiiiiiiii")
        if (message.body) {
          console.log(message.body)
          that.msg.push(message.body);
        }
      });
    });
  }


}
