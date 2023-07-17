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
import {UpdateSocieteComponent} from "./components/utilisateur/societe/update-societe/update-societe.component";
import {DetailsSocieteComponent} from "./components/utilisateur/societe/details-societe/details-societe.component";
import {PlanComptableComponent} from "./components/utilisateur/traitement/plan-comptable/plan-comptable.component";
import {TraitementComponent} from "./components/utilisateur/traitement/traitement.component";
import {ShareSocieteComponent} from "./components/utilisateur/traitement/share-societe/share-societe.component";
import {ListSharedSocieteComponent} from "./components/utilisateur/list-shared-societe/list-shared-societe.component";
import {
  ComptesGenerauxComponent
} from "./components/utilisateur/traitement/plan-comptable/comptes-generaux/comptes-generaux.component";
import {
  UpdateComptesGenerauxComponent
} from "./components/utilisateur/traitement/plan-comptable/update-comptes-generaux/update-comptes-generaux.component";
import {
  UpdatePlanComptableComponent
} from "./components/utilisateur/traitement/plan-comptable/update-plan-comptable/update-plan-comptable.component";

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
          {path: 'add-societe',component:AddSocieteComponent},
          {path: 'update-societe/:idSociete',component:UpdateSocieteComponent},
          {path: 'details-societe/:idSociete',component:DetailsSocieteComponent}
        ]
      },
      {
        path: 'traitement/:idSociete',
        component:TraitementComponent,
        children:[
          {path: 'share-societe/:idSociete',component:ShareSocieteComponent},
          {path: 'plan-comptable/:idSociete',
            component:PlanComptableComponent,
            children:[
              {path: 'compte-generaux/:idSociete',
                component:ComptesGenerauxComponent,
                children:[
                  {path: 'update-compte-generaux/:idCompteGeneral/:idSociete',component:UpdateComptesGenerauxComponent},
                ]
              },
              {path: 'update-plan-comptable/:idSociete/:idPlanComptableElement',component:UpdatePlanComptableComponent},
            ]
          },
        ]
      },
      {path: 'list-shared-societe',component:ListSharedSocieteComponent},
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

