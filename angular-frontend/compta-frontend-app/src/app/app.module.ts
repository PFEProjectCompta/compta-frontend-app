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
import { SecurityComponent } from './components/security/security.component';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import {AdminService} from "./services/office-service/AdminService";
import {MatIcon, MatIconModule} from "@angular/material/icon";
import {SharedService} from "./services/shared/SharedService";
import { APOLLO_OPTIONS, ApolloModule } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { InMemoryCache } from '@apollo/client/core';
import {RouterModule} from "@angular/router";
import { AdministrateurComponent } from './components/administrateur/administrateur.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { ListOfficesComponent } from './components/administrateur/list-offices/list-offices.component';
import { AddOfficesComponent } from './components/administrateur/add-offices/add-offices.component';
import {BureauService} from "./services/office-service/BureauService";
import { UpdateOfficesComponent } from './components/administrateur/update-offices/update-offices.component';
import { CompteUserComponent } from './components/administrateur/compte-user/compte-user.component';
import { AddCompteUserComponent } from './components/administrateur/add-compte-user/add-compte-user.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {DatePipe} from "@angular/common";
import { MomentDateModule } from '@angular/material-moment-adapter';
import { UpdateCompteUserComponent } from './components/administrateur/update-compte-user/update-compte-user.component';
import {MatDialogModule} from "@angular/material/dialog";
import {
  ConfirmationDialogComponent
} from "./components/confirmation-dialog-component/confirmation-dialog-component.component";
import { UtilisateurComponent } from './components/utilisateur/utilisateur.component';
import {UserService} from "./services/office-service/UserService";
import { SocieteComponent } from './components/utilisateur/societe/societe.component';
import { AddSocieteComponent } from './components/utilisateur/societe/add-societe/add-societe.component';
import { DetailsSocieteComponent } from './components/utilisateur/societe/details-societe/details-societe.component';
import { UpdateSocieteComponent } from './components/utilisateur/societe/update-societe/update-societe.component';
import { PlanComptableComponent } from './components/utilisateur/plan-comptable/plan-comptable.component';
import { TraitementComponent } from './components/utilisateur/traitement/traitement.component';

export function kcFactory(kcService: KeycloakService) {

  return ()=>{
    kcService.init({
      config:{
        realm:"compta-realm",
        clientId:"office-client",
        url:"http://localhost:9900"
      },
      initOptions:{
        onLoad:"login-required",
        checkLoginIframe:true
      }
    })
  }
}
@NgModule({

  declarations: [
    AppComponent,
    OfficeComponent,
    ChatComponent,
    SecurityComponent,
    AdministrateurComponent,
    ListOfficesComponent,
    AddOfficesComponent,
    UpdateOfficesComponent,
    CompteUserComponent,
    AddCompteUserComponent,
    UpdateCompteUserComponent,
    ConfirmationDialogComponent,
    UtilisateurComponent,
    SocieteComponent,
    AddSocieteComponent,
    DetailsSocieteComponent,
    UpdateSocieteComponent,
    PlanComptableComponent,
    TraitementComponent,

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
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MomentDateModule,
    MatDialogModule,
    BrowserAnimationsModule,
  ],
  providers: [
    // {
    //   provide: APOLLO_OPTIONS,
    //   useFactory(httpLink: HttpLink) {
    //     return {
    //       cache: new InMemoryCache(),
    //       link: httpLink.create({
    //         uri: 'http://localhost:8087/graphql',
    //       }),
    //     };
    //   },
    //   deps: [HttpLink],
    // },
    SharedService,
    UserService,
    AdminService,
    BureauService,
    DatePipe,
    {provide:APP_INITIALIZER, deps:[KeycloakService],useFactory:kcFactory,multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
