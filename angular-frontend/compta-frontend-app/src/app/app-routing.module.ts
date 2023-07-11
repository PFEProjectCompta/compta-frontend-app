import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {OfficeComponent} from "./components/office/office.component";
import {ChatComponent} from "./components/chat/chat.component";
import {SecurityComponent} from "./components/security/security.component";
import {AdministrateurComponent} from "./components/administrateur/administrateur.component";
import {ListOfficesComponent} from "./components/administrateur/list-offices/list-offices.component";
import {AddOfficesComponent} from "./components/administrateur/add-offices/add-offices.component";
import {UpdateOfficesComponent} from "./components/administrateur/update-offices/update-offices.component";
import {CompteUserComponent} from "./components/administrateur/compte-user/compte-user.component";
import {AddCompteUserComponent} from "./components/administrateur/add-compte-user/add-compte-user.component";
import {UpdateCompteUserComponent} from "./components/administrateur/update-compte-user/update-compte-user.component";
import {UtilisateurComponent} from "./components/utilisateur/utilisateur.component";
import {SocieteComponent} from "./components/utilisateur/societe/societe.component";
import {AddSocieteComponent} from "./components/utilisateur/societe/add-societe/add-societe.component";

const routes: Routes = [
  {path: 'sec',component:SecurityComponent},
  {path: 'chat',component:ChatComponent},
  {
    path: 'administrateur',
    component:AdministrateurComponent,
    children:[
      {path:'list-office',component:ListOfficesComponent},
      {path:'add-office',component:AddOfficesComponent},
      {path:'update-office/:id',component:UpdateOfficesComponent},
      {path:'compte-user/:idBureau',component:CompteUserComponent},
      {path:'add-compte-user/:idBureau',component:AddCompteUserComponent},
      {path:'update-compte-user/:idCompteUser',component:UpdateCompteUserComponent}
    ]},
  {path: 'office',component:OfficeComponent},
  {
    path: 'utilisateur',
    component:UtilisateurComponent,
    children:[
      {
        path:'societes',
        component:SocieteComponent,
        children:[
          {path: 'add-societe',component:AddSocieteComponent}
        ]
      }
    ]
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes,{ enableTracing: true })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

