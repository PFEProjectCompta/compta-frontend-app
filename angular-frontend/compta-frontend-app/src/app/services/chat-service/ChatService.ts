import {Injectable} from "@angular/core";
import {Apollo} from "apollo-angular";
import {Observable} from "rxjs";
import {COUNT_NEW_MESSAGES, GET_ADMINE, MESSAGES_CHAT} from "../../graphql/queries.graphql";
import {map} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ChatService{
  loading: boolean;
  public dataSource: any;
  public dms:any[]=[];
  public notification:any=[];
  constructor(private http: HttpClient,private apollo:Apollo) {
  }

  loadMessagesOfConversation(idSender,idRecever): Observable<any[]> {
    this.dms=[];
    this.apollo.client.clearStore();
    return this.apollo.use('chat')
      .watchQuery<any>({
        query: MESSAGES_CHAT,
        variables: {
          senderId:idSender,
          recipientId:idRecever
        }
      })
      .valueChanges.pipe(
        map(({ data, loading }) => {
          this.loading = loading;
          data.findChatMessages.forEach(mes=>{
            const message = {
              senderId: mes.senderId,
              recipientId: mes.recipientId,
              senderName: mes.senderName,
              recipientName: mes.recipientName,
              content: mes.content
            };
            this.dms.push(message);
          });
          this.dataSource = data.findChatMessages;

          console.log("hay hay : ",this.dms);
          return data.findChatMessages;
        })
      );
  }



  getNotification(recever): Observable<any[]>{
    return this.http.get<any[]>(`http://localhost:8086/messages/`+recever+`/newMessagesNotif`);
  }
  // countNewMessages(idSender,idRecever): Observable<any[]> {
  //   return this.apollo.use('chat')
  //     .watchQuery<any>({
  //       query: COUNT_NEW_MESSAGES,
  //       variables: {
  //         senderId:idSender,
  //         recipientId:idRecever
  //       }
  //     })
  //     .valueChanges.pipe(
  //       map(({ data, loading }) => {
  //         return data.findChatMessages;
  //       })
  //     );
  // }

}
