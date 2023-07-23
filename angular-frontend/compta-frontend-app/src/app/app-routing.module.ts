import {NgModule} from '@angular/core';
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
import {BanqueComponent} from "./components/utilisateur/traitement/plan-comptable/banque/banque.component";
import {
  AddAgenceComponent
} from "./components/utilisateur/traitement/plan-comptable/banque/add-agence/add-agence.component";
import {
  UpdateAgenceComponent
} from "./components/utilisateur/traitement/plan-comptable/banque/update-agence/update-agence.component";
import {
  DetailsAgenceComponent
} from "./components/utilisateur/traitement/plan-comptable/banque/details-agence/details-agence.component";
import {
  AddBanqueComponent
} from "./components/utilisateur/traitement/plan-comptable/banque/details-agence/add-banque/add-banque.component";
import {
  UpdateBanqueComponent
} from "./components/utilisateur/traitement/plan-comptable/banque/details-agence/update-banque/update-banque.component";
import {
  DetailsBanqueComponent
} from "./components/utilisateur/traitement/plan-comptable/banque/details-agence/details-banque/details-banque.component";
import {
  ComptesBancairesComponent
} from "./components/utilisateur/traitement/plan-comptable/banque/details-agence/details-banque/comptes-bancaires/comptes-bancaires.component";
import {Contact} from "./components/models/banque-app/Contact";
import {
  ContactsComponent
} from "./components/utilisateur/traitement/plan-comptable/banque/details-agence/details-banque/contacts/contacts.component";
import {
  AddCompteBancaireComponent
} from "./components/utilisateur/traitement/plan-comptable/banque/details-agence/details-banque/comptes-bancaires/add-compte-bancaire/add-compte-bancaire.component";
import {
  UpdateCompteBancaireComponent
} from "./components/utilisateur/traitement/plan-comptable/banque/details-agence/details-banque/comptes-bancaires/update-compte-bancaire/update-compte-bancaire.component";
import {
  AddContactComponent
} from "./components/utilisateur/traitement/plan-comptable/banque/details-agence/details-banque/contacts/add-contact/add-contact.component";
import {
  UpdateContactComponent
} from "./components/utilisateur/traitement/plan-comptable/banque/details-agence/details-banque/contacts/update-contact/update-contact.component";
import {
  FournisseurComponent
} from "./components/utilisateur/traitement/plan-comptable/fournisseur/fournisseur.component";
import {ClientComponent} from "./components/utilisateur/traitement/plan-comptable/client/client.component";
import {SalarieeComponent} from "./components/utilisateur/traitement/plan-comptable/salariee/salariee.component";
import {
  AddClientComponent
} from "./components/utilisateur/traitement/plan-comptable/client/add-client/add-client.component";
import {
  UpdateClientComponent
} from "./components/utilisateur/traitement/plan-comptable/client/update-client/update-client.component";
import {
  AddFournisseurComponent
} from "./components/utilisateur/traitement/plan-comptable/fournisseur/add-fournisseur/add-fournisseur.component";
import {
  UpdateFournisseurComponent
} from "./components/utilisateur/traitement/plan-comptable/fournisseur/update-fournisseur/update-fournisseur.component";
import {
  AddSalarieeComponent
} from "./components/utilisateur/traitement/plan-comptable/salariee/add-salariee/add-salariee.component";
import {
  UpdateSalarieeComponent
} from "./components/utilisateur/traitement/plan-comptable/salariee/update-salariee/update-salariee.component";
import {PageGardeComponent} from "./components/page-garde/page-garde.component";


const routes: Routes = [
  {path: '', component: PageGardeComponent},
  {path: 'sec', component: SecurityComponent},
  {path: 'chat', component: ChatComponent},
  {
    path: 'administrateur',
    component: AdministrateurComponent,
    children: [
      {path: 'list-office', component: ListOfficesComponent},
      {path: 'add-office', component: AddOfficesComponent},
      {path: 'update-office/:id', component: UpdateOfficesComponent},
      {path: 'compte-user/:idBureau', component: CompteUserComponent},
      {path: 'add-compte-user/:idBureau', component: AddCompteUserComponent},
      {path: 'update-compte-user/:idCompteUser', component: UpdateCompteUserComponent}
    ]
  },
  {path: 'office', component: OfficeComponent},
  {
    path: 'utilisateur',
    component: UtilisateurComponent,
    children: [
      {
        path: 'societes',
        component: SocieteComponent,
        children: [
          {path: 'add-societe', component: AddSocieteComponent},
          {path: 'update-societe/:idSociete', component: UpdateSocieteComponent},
          {path: 'details-societe/:idSociete', component: DetailsSocieteComponent}
        ]
      },
      {
        path: 'traitement/:idSociete',
        component: TraitementComponent,
        children: [
          {path: 'share-societe/:idSociete', component: ShareSocieteComponent},
          {
            path: 'plan-comptable/:idSociete',
            component: PlanComptableComponent,
            children: [
              {
                path: 'compte-generaux/:idSociete',
                component: ComptesGenerauxComponent,
                children: [
                  {
                    path: 'update-compte-generaux/:idCompteGeneral/:idSociete',
                    component: UpdateComptesGenerauxComponent
                  },
                ]
              },
              {
                path: 'update-plan-comptable/:idSociete/:idPlanComptableElement',
                component: UpdatePlanComptableComponent
              },
              {
                path: 'banque/:idSociete', component: BanqueComponent, children: [
                  {path: 'add-agence/:idSociete', component: AddAgenceComponent},
                  {path: 'update-agence/:idAgence/:idSociete', component: UpdateAgenceComponent},
                  {
                    path: 'details-agence/:idAgence/:idSociete',
                    component: DetailsAgenceComponent,
                    children: [
                      {path: 'add-banque/:idAgence/:idSociete', component: AddBanqueComponent},
                      {path: 'update-banque/:idBanque/:idAgence/:idSociete', component: UpdateBanqueComponent},
                      {
                        path: 'details-banque/:idBanque/:idAgence/:idSociete',
                        component: DetailsBanqueComponent,
                        children: [
                          {
                            path: 'compte-banciaire/:idBanque/:idAgence/:idSociete',
                            component: ComptesBancairesComponent,
                            children: [
                              {
                                path: 'add-compte-bancaire/:idBanque/:idAgence/:idSociete',
                                component: AddCompteBancaireComponent
                              },
                              {
                                path: 'update-compte-bancaire/:idCompteBancaire/:idBanque/:idAgence/:idSociete',
                                component: UpdateCompteBancaireComponent
                              },
                            ]
                          },
                          {
                            path: 'contact/:idBanque/:idAgence/:idSociete',
                            component: ContactsComponent,
                            children: [
                              {path: 'add-contact/:idBanque/:idAgence/:idSociete', component: AddContactComponent},
                              {
                                path: 'update-contact/:idContact/:idBanque/:idAgence/:idSociete',
                                component: UpdateContactComponent
                              },
                            ]
                          },
                        ]
                      },
                    ]
                  },
                ]
              },

              {
                path: 'fournisseur/:idSociete',
                component: FournisseurComponent,
                children: [
                  {path: 'add-fournisseur/:idSociete', component: AddFournisseurComponent},
                  {path: 'update-fournisseur/:idFournisseur/:idSociete', component: UpdateFournisseurComponent},
                ]
              },
              {
                path: 'client/:idSociete',
                component: ClientComponent,
                children: [
                  {path: 'add-client/:idSociete', component: AddClientComponent},
                  {path: 'update-client/:idClient/:idSociete', component: UpdateClientComponent},
                ]
              },
              {
                path: 'salariee/:idSociete',
                component: SalarieeComponent,
                children: [
                  {path: 'add-salariee/:idSociete', component: AddSalarieeComponent},
                  {path: 'update-salariee/:idSalariee/:idSociete', component: UpdateSalarieeComponent},
                ]
              },

            ]
          },
        ]
      },
      {path: 'list-shared-societe', component: ListSharedSocieteComponent},
    ]
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {enableTracing: true})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

