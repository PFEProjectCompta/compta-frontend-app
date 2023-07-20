import {Injectable} from "@angular/core";
import {KeycloakProfile} from "keycloak-js";
import {AdminService} from "../office-service/AdminService";
import {Observable} from "rxjs";
import {
  GET_ADMINE,
  GET_AGENCE_BY_ID_SOCIETE,
  GET_AGENCE_ID,
  GET_BANQUE_BY_AGENCE_ID,
  GET_BANQUE_ID,
  GET_COMPTE_BANCAIRE_By_BANQUE,
  GET_COMPTE_BANCAIRE_By_ID,
  GET_CONTACT_BY_BANQUE, GET_CONTACT_BY_ID
} from "../../graphql/queries.graphql";
import {map} from "rxjs/operators";
import {
  ADD_ROLE,
  AJOUTE_AGENCE, AJOUTE_CONTACT,
  AJOUTER_BANQUE, AJOUTER_COMPTE_CANCAIRE,
  MODIFIER_AGENCE, MODIFIER_BANQUE, MODIFIER_COMPTE_CANCAIRE, MODIFIER_CONTACT,
  SUPPRIMER_AGENCE, SUPPRIMER_BANQUE, SUPPRIMER_COMPTE_CANCAIRE, SUPPRIMER_CONTACT
} from "../../graphql/mutations.graphql";
import {Agence} from "../../components/models/banque-app/Agence";
import {Banque} from "../../components/models/banque-app/Banque";
import {CompteBancaire} from "../../components/models/banque-app/CompteBancaire";
import {Contact} from "../../components/models/banque-app/Contact";

@Injectable({
  providedIn: 'root'
})
export class BanqueService{

  loading: boolean;
  public profile?: KeycloakProfile;
  constructor(public adminService:AdminService) {
    this.profile=adminService.profile;
  }
  loadAgences(idSociete): Observable<any[]> {
    return this.adminService.apollo.use('banque')
      .watchQuery<any>({
        query: GET_AGENCE_BY_ID_SOCIETE,
        variables:{
          id:idSociete
        }
      })
      .valueChanges.pipe(
        map(({ data, loading }) => {
          this.loading = loading;
          return data.agenceByIdSociete;
        })
      );
  }
  agenceById(idAgence): Observable<any[]> {
    return this.adminService.apollo.use('banque')
      .watchQuery<any>({
        query: GET_AGENCE_ID,
        variables:{
          id:idAgence
        }
      })
      .valueChanges.pipe(
        map(({ data, loading }) => {
          this.loading = loading;
          return data.agenceById;
        })
      );
  }
  ajouterAgence(agence:Agence) {
    this.adminService.apollo.use('banque')
      .mutate({
        mutation: AJOUTE_AGENCE,
        variables: {
          nom:agence.nom,
          complemet:agence.complement,
          codePost:agence.code_postale,
          ville:agence.ville,
          pays:agence.pays,
          idSociete:agence.societeId
        },context:{clientName:'agence'}
      })
      .subscribe(
        ({ data }) => {
          console.log('got data', data);

        },
        error => {
          console.log('there was an error sending the query', error);
        },
      );
  }
  modifierAgence(idAgence:string,agence:Agence) {
    this.adminService.apollo.use('banque')
      .mutate({
        mutation: MODIFIER_AGENCE,
        variables: {
          id:idAgence,
          nom:agence.nom,
          complement:agence.complement,
          code_postale:agence.code_postale,
          ville:agence.ville,
          pays:agence.pays,
          societeId:agence.societeId
        },context:{clientName:'agence'}
      })
      .subscribe(
        ({ data }) => {
          console.log('got data', data);

        },
        error => {
          console.log('there was an error sending the query', error);
        },
      );
  }
  supprimerAgence(idAgence:string) {
    this.adminService.apollo.use('banque')
      .mutate({
        mutation: SUPPRIMER_AGENCE,
        variables: {
          id:idAgence,
        },context:{clientName:'agence'}
      })
      .subscribe(
        ({ data }) => {
          console.log('got data', data);

        },
        error => {
          console.log('there was an error sending the query', error);
        },
      );
  }
  loadBanque(idAgence): Observable<any[]> {
    return this.adminService.apollo.use('banque')
      .watchQuery<any>({
        query: GET_BANQUE_BY_AGENCE_ID,
        variables:{
          id:idAgence
        }
      })
      .valueChanges.pipe(
        map(({ data, loading }) => {
          this.loading = loading;
          return data.banqueByIdAgence;
        })
      );
  }
  banqueById(idBanque): Observable<any[]> {
    return this.adminService.apollo.use('banque')
      .watchQuery<any>({
        query: GET_BANQUE_ID,
        variables:{
          id:idBanque
        }
      })
      .valueChanges.pipe(
        map(({ data, loading }) => {
          this.loading = loading;
          return data.banqueById;
        })
      );
  }
  ajouterBanque(banque:Banque) {
    this.adminService.apollo.use('banque')
      .mutate({
        mutation: AJOUTER_BANQUE,
        variables: {
          abrege:banque.abrege,
          intitule:banque.intitule,
          interlocuteur:banque.interlocuteur,
          codeBIC:banque.codeBIC,
          adresse:banque.adresse,
          code_postale:banque.code_postale,
          ville:banque.ville,
          pays:banque.pays,
          telephone:banque.telephone,
          telecopie:banque.telecopie,
          email:banque.email,
          site_internet:banque.site_internet,
          idAgence:banque.agenceId
        },context:{clientName:'agence'}
      })
      .subscribe(
        ({ data }) => {
          console.log('got data', data);

        },
        error => {
          console.log('there was an error sending the query', error);
        },
      );
  }
  modifierBanque(idBanque:string,banque:Banque) {
    this.adminService.apollo.use('banque')
      .mutate({
        mutation: MODIFIER_BANQUE,
        variables: {
          id:idBanque,
          abrege:banque.abrege,
          intitule:banque.intitule,
          interlocuteur:banque.interlocuteur,
          codeBIC:banque.codeBIC,
          adresse:banque.adresse,
          code_postale:banque.code_postale,
          ville:banque.ville,
          pays:banque.pays,
          telephone:banque.telephone,
          telecopie:banque.telecopie,
          email:banque.email,
          site_internet:banque.site_internet,
          agenceId:banque.agenceId
        },context:{clientName:'banque'}
      })
      .subscribe(
        ({ data }) => {
          console.log('got data', data);

        },
        error => {
          console.log('there was an error sending the query', error);
        },
      );
  }

  supprimerBanque(idBanque:string) {
    this.adminService.apollo.use('banque')
      .mutate({
        mutation: SUPPRIMER_BANQUE,
        variables: {
          id:idBanque,
        },context:{clientName:'agence'}
      })
      .subscribe(
        ({ data }) => {
          console.log('got data', data);

        },
        error => {
          console.log('there was an error sending the query', error);
        },
      );
  }
  loadCompteBancaire(idBanque): Observable<any[]> {
    return this.adminService.apollo.use('banque')
      .watchQuery<any>({
        query: GET_COMPTE_BANCAIRE_By_BANQUE,
        variables:{
          id:idBanque
        }
      })
      .valueChanges.pipe(
        map(({ data, loading }) => {
          this.loading = loading;
          return data.compteBancaireListByBanqueId;
        })
      );
  }

  compteBancaireById(idCompteBanciare): Observable<any[]> {
    return this.adminService.apollo.use('banque')
      .watchQuery<any>({
        query: GET_COMPTE_BANCAIRE_By_ID,
        variables:{
          id:idCompteBanciare
        }
      })
      .valueChanges.pipe(
        map(({ data, loading }) => {
          this.loading = loading;
          return data.compteBancaireById;
        })
      );
  }
  ajouterCompteBanciare(compteBancaire:CompteBancaire) {
    this.adminService.apollo.use('banque')
      .mutate({
        mutation: AJOUTER_COMPTE_CANCAIRE,
        variables: {
          abrege:compteBancaire.abrege,
          devise:compteBancaire.devise,
          pays:compteBancaire.pays,
          structure:compteBancaire.structure,
          num_compte:compteBancaire.num_compte,
          num_guichet:compteBancaire.num_guichet,
          idBanque:compteBancaire.banqueId,
          planComptableElementId:compteBancaire.planComptableElementId
        },context:{clientName:'agence'}
      })
      .subscribe(
        ({ data }) => {
          console.log('got data', data);

        },
        error => {
          console.log('there was an error sending the query', error);
        },
      );
  }
  modifierCompteBancaire(idCompteBancaire:string,compteBancaire:CompteBancaire) {
    this.adminService.apollo.use('banque')
      .mutate({
        mutation: MODIFIER_COMPTE_CANCAIRE,
        variables: {
          id:idCompteBancaire,
          abrege:compteBancaire.abrege,
          devise:compteBancaire.devise,
          pays:compteBancaire.pays,
          structure:compteBancaire.structure,
          num_compte:compteBancaire.num_compte,
          num_guichet:compteBancaire.num_guichet,
          idBanque:compteBancaire.banqueId,
          planComptableElementId:compteBancaire.planComptableElementId
        },context:{clientName:'banque'}
      })
      .subscribe(
        ({ data }) => {
          console.log('got data', data);

        },
        error => {
          console.log('there was an error sending the query', error);
        },
      );
  }
  supprimerCompteBancaire(idCompteBancaire:string) {
    this.adminService.apollo.use('banque')
      .mutate({
        mutation: SUPPRIMER_COMPTE_CANCAIRE,
        variables: {
          id:idCompteBancaire,
        },context:{clientName:'agence'}
      })
      .subscribe(
        ({ data }) => {
          console.log('got data', data);

        },
        error => {
          console.log('there was an error sending the query', error);
        },
      );
  }
  loadContacts(idBanque): Observable<any[]> {
    return this.adminService.apollo.use('banque')
      .watchQuery<any>({
        query: GET_CONTACT_BY_BANQUE,
        variables:{
          id:idBanque
        }
      })
      .valueChanges.pipe(
        map(({ data, loading }) => {
          this.loading = loading;
          return data.contactByIdBanque;
        })
      );
  }

  contactById(idContact): Observable<any[]> {
    return this.adminService.apollo.use('banque')
      .watchQuery<any>({
        query: GET_CONTACT_BY_ID,
        variables:{
          id:idContact
        }
      })
      .valueChanges.pipe(
        map(({ data, loading }) => {
          this.loading = loading;
          return data.contactById;
        })
      );
  }

  ajouterContact(contact:Contact) {
    this.adminService.apollo.use('banque')
      .mutate({
        mutation: AJOUTE_CONTACT,
        variables: {
          type_contact:contact.type_contact,
          civilite:contact.civilite,
          nom:contact.nom,
          prenom:contact.prenom,
          service:contact.service,
          fonction:contact.fonction,
          telephone:contact.telephone,
          portable:contact.portable,
          email:contact.email,
          telecopie:contact.telecopie,
          banqueId:contact.banqueId
        },context:{clientName:'agence'}
      })
      .subscribe(
        ({ data }) => {
          console.log('got data', data);
        },
        error => {
          console.log('there was an error sending the query', error);
        },
      );
  }

  modifierContact(idContact:string,contact:Contact) {
    this.adminService.apollo.use('banque')
      .mutate({
        mutation: MODIFIER_CONTACT,
        variables: {
          id:idContact,
          type_contact:contact.type_contact,
          civilite:contact.civilite,
          nom:contact.nom,
          prenom:contact.prenom,
          service:contact.service,
          fonction:contact.fonction,
          telephone:contact.telephone,
          portable:contact.portable,
          email:contact.email,
          telecopie:contact.telecopie,
          banqueId:contact.banqueId
        },context:{clientName:'banque'}
      })
      .subscribe(
        ({ data }) => {
          console.log('got data', data);

        },
        error => {
          console.log('there was an error sending the query', error);
        },
      );
  }
  supprimerContact(idContact:string) {
    this.adminService.apollo.use('banque')
      .mutate({
        mutation: SUPPRIMER_CONTACT,
        variables: {
          id:idContact,
        },context:{clientName:'agence'}
      })
      .subscribe(
        ({ data }) => {
          console.log('got data', data);

        },
        error => {
          console.log('there was an error sending the query', error);
        },
      );
  }
}
