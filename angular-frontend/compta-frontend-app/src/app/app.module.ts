import {APP_INITIALIZER, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { OfficeComponent } from './components/office/office.component';
import {KeycloakAngularModule, KeycloakService} from "keycloak-angular";
import { ChatComponent } from './components/chat/chat.component';
import { TfouComponent } from './tfou/tfou.component';


// export function kcFactory(kcService: KeycloakService){
//   return ()=>{
//     console.log("kycloak hiiii");
//     kcService.init({
//       config:{
//         realm:"compta-realm",
//         clientId:"office-client",
//         url:"http://localhost:9900"
//       },
//       initOptions:{
//         onLoad:"login-required",
//         checkLoginIframe:true
//       }
//     })
//   }
// }
@NgModule({

  declarations: [
    AppComponent,
    OfficeComponent,
    ChatComponent,
    TfouComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    GraphQLModule,
    HttpClientModule,
    FormsModule,
    KeycloakAngularModule,
    ReactiveFormsModule,

  ],
  providers: [
    // {provide:APP_INITIALIZER, deps:[KeycloakService],useFactory:kcFactory,multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
