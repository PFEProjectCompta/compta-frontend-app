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
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
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
import { PlanComptableComponent } from './components/utilisateur/traitement/plan-comptable/plan-comptable.component';
import { TraitementComponent } from './components/utilisateur/traitement/traitement.component';
import {MatPaginatorModule} from "@angular/material/paginator";
import { ShareSocieteComponent } from './components/utilisateur/traitement/share-societe/share-societe.component';
import { ListSharedSocieteComponent } from './components/utilisateur/list-shared-societe/list-shared-societe.component';
import {
  ComptesGenerauxComponent
} from "./components/utilisateur/traitement/plan-comptable/comptes-generaux/comptes-generaux.component";
import { UpdateComptesGenerauxComponent } from './components/utilisateur/traitement/plan-comptable/update-comptes-generaux/update-comptes-generaux.component';
import { UpdatePlanComptableComponent } from './components/utilisateur/traitement/plan-comptable/update-plan-comptable/update-plan-comptable.component';
import {MatMenuModule} from "@angular/material/menu";
import { BanqueComponent } from './components/utilisateur/traitement/plan-comptable/banque/banque.component';
import { FournisseurComponent } from './components/utilisateur/traitement/plan-comptable/fournisseur/fournisseur.component';
import { ClientComponent } from './components/utilisateur/traitement/plan-comptable/client/client.component';
import { SalarieeComponent } from './components/utilisateur/traitement/plan-comptable/salariee/salariee.component';
import { AddAgenceComponent } from './components/utilisateur/traitement/plan-comptable/banque/add-agence/add-agence.component';
import { UpdateAgenceComponent } from './components/utilisateur/traitement/plan-comptable/banque/update-agence/update-agence.component';
import { DetailsAgenceComponent } from './components/utilisateur/traitement/plan-comptable/banque/details-agence/details-agence.component';
import { AddBanqueComponent } from './components/utilisateur/traitement/plan-comptable/banque/details-agence/add-banque/add-banque.component';
import { UpdateBanqueComponent } from './components/utilisateur/traitement/plan-comptable/banque/details-agence/update-banque/update-banque.component';
import { DetailsBanqueComponent } from './components/utilisateur/traitement/plan-comptable/banque/details-agence/details-banque/details-banque.component';
import { ComptesBancairesComponent } from './components/utilisateur/traitement/plan-comptable/banque/details-agence/details-banque/comptes-bancaires/comptes-bancaires.component';
import { ContactsComponent } from './components/utilisateur/traitement/plan-comptable/banque/details-agence/details-banque/contacts/contacts.component';
import { AddCompteBancaireComponent } from './components/utilisateur/traitement/plan-comptable/banque/details-agence/details-banque/comptes-bancaires/add-compte-bancaire/add-compte-bancaire.component';
import {MatSelectModule} from "@angular/material/select";
import {NgxMatSelectSearchModule} from "ngx-mat-select-search";
import { UpdateCompteBancaireComponent } from './components/utilisateur/traitement/plan-comptable/banque/details-agence/details-banque/comptes-bancaires/update-compte-bancaire/update-compte-bancaire.component';
import { AddContactComponent } from './components/utilisateur/traitement/plan-comptable/banque/details-agence/details-banque/contacts/add-contact/add-contact.component';
import { UpdateContactComponent } from './components/utilisateur/traitement/plan-comptable/banque/details-agence/details-banque/contacts/update-contact/update-contact.component';
import { AddClientComponent } from './components/utilisateur/traitement/plan-comptable/client/add-client/add-client.component';
import { UpdateClientComponent } from './components/utilisateur/traitement/plan-comptable/client/update-client/update-client.component';
import { AddFournisseurComponent } from './components/utilisateur/traitement/plan-comptable/fournisseur/add-fournisseur/add-fournisseur.component';
import { UpdateFournisseurComponent } from './components/utilisateur/traitement/plan-comptable/fournisseur/update-fournisseur/update-fournisseur.component';
import { AddSalarieeComponent } from './components/utilisateur/traitement/plan-comptable/salariee/add-salariee/add-salariee.component';
import { UpdateSalarieeComponent } from './components/utilisateur/traitement/plan-comptable/salariee/update-salariee/update-salariee.component';
import { PageGardeComponent } from './components/page-garde/page-garde.component';
import { ExerciceComponent } from './components/utilisateur/traitement/exercice/exercice.component';
import { AddExerciceComponent } from './components/utilisateur/traitement/exercice/add-exercice/add-exercice.component';
import { UpdateExerciceComponent } from './components/utilisateur/traitement/exercice/update-exercice/update-exercice.component';
import { AttentionDialogComponent } from './components/attention-dialog/attention-dialog.component';
import { DetailsExerciceComponent } from './components/utilisateur/traitement/exercice/details-exercice/details-exercice.component';
import { AddCodeJournalComponent } from './components/utilisateur/traitement/exercice/details-exercice/add-code-journal/add-code-journal.component';
import { DetailsCodeJournalComponent } from './components/utilisateur/traitement/exercice/details-exercice/details-code-journal/details-code-journal.component';
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
    ShareSocieteComponent,
    ListSharedSocieteComponent,
    ComptesGenerauxComponent,
    UpdateComptesGenerauxComponent,
    UpdatePlanComptableComponent,
    BanqueComponent,
    FournisseurComponent,
    ClientComponent,
    SalarieeComponent,
    AddAgenceComponent,
    UpdateAgenceComponent,
    DetailsAgenceComponent,
    AddBanqueComponent,
    UpdateBanqueComponent,
    DetailsBanqueComponent,
    ComptesBancairesComponent,
    ContactsComponent,
    AddCompteBancaireComponent,
    UpdateCompteBancaireComponent,
    AddContactComponent,
    UpdateContactComponent,
    AddClientComponent,
    UpdateClientComponent,
    AddFournisseurComponent,
    UpdateFournisseurComponent,
    AddSalarieeComponent,
    UpdateSalarieeComponent,
    PageGardeComponent,
    ExerciceComponent,
    AddExerciceComponent,
    UpdateExerciceComponent,
    AttentionDialogComponent,
    DetailsExerciceComponent,
    AddCodeJournalComponent,
    DetailsCodeJournalComponent,

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
    MatPaginatorModule,
    MatMenuModule,
    MatSelectModule,
    NgxMatSelectSearchModule
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
