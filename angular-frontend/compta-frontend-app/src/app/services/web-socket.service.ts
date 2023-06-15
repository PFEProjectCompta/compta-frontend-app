import { Injectable } from '@angular/core';
declare var SockJS;
declare var Stomp;
import {ChatMessage} from "../components/models/chat-app/ChatMessage";

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  public currentUser;


  constructor() {
    this.initializeWebSocketConnection();
  }
  public stompClient;
  public msg = [];
  initializeWebSocketConnection() {
    const serverUrl = "http://localhost:8086/ws";
    console.log(serverUrl);
    const ws = new SockJS(serverUrl);
    this.stompClient = Stomp.over(ws);
    const that = this;
    // tslint:disable-next-line:only-arrow-functions
    this.stompClient.connect({}, function(frame) {

      that.stompClient.subscribe("/user/" + this.currentUser + "/queue/messages", (message) => {
        console.log("haniiiiiiiiiiiii")
        if (message.body) {
          console.log(message.body)
          that.msg.push(message.body);
        }
      });
    });
  }
  public sendMessage(msg:string, sender:string ,recip:string){
    if (msg !== "") {
      this.currentUser=sender;
      const message = {
        senderId: sender,
        recipientId: recip,
        senderName: sender,
        recipientName: recip,
        content: msg,
        timestamp: new Date(),
      };
      console.log(message);
      this.stompClient.send("/app/chat", {}, JSON.stringify(message));
    }
  }
}
