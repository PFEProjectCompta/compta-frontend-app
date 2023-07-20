import {Injectable} from "@angular/core";
import {KeycloakProfile} from "keycloak-js";
import {AdminService} from "../office-service/AdminService";
import {Observable} from "rxjs";
import {
  GET_AGENCE_BY_ID_SOCIETE, GET_BANQUE_ID, GET_CLIENT_BY_ID,
  GET_CLIENT_BY_IDSOCIETE, GET_FOURNISSEUR_BY_ID,
  GET_FOURNISSEUR_BY_ID_SOCIETE, GET_SALARIEE_BY_ID, GET_SALARIEE_BY_ID_SOCIETE
} from "../../graphql/queries.graphql";
import {map} from "rxjs/operators";
import {Banque} from "../../components/models/banque-app/Banque";
import {
  AJOUTE_CLIENT,
  AJOUTE_FOURNISSEUR,
  AJOUTE_SALARIEE,
  MODIFIER_CLIENT, MODIFIER_FOURNISSEUR, MODIFIER_SALARIEE, SUPPRIMER_CLIENT, SUPPRIMER_FOURNISSEUR, SUPPRIMER_SALARIEE
} from "../../graphql/mutations.graphql";
import {Client} from "../../components/models/compte-tiers/Client";
import {Fournisseur} from "../../components/models/compte-tiers/Fournisseur";
import {Salariee} from "../../components/models/compte-tiers/Salariee";

@Injectable({
  providedIn: 'root'
})
export class CompteTiersService{

  loading: boolean;
  public profile?: KeycloakProfile;
  constructor(public adminService:AdminService) {
    this.profile=adminService.profile;
  }

  loadClient(idSociete): Observable<any[]> {
    return this.adminService.apollo.use('compte_tier')
      .watchQuery<any>({
        query: GET_CLIENT_BY_IDSOCIETE,
        variables:{
          id:idSociete
        }
      })
      .valueChanges.pipe(
        map(({ data, loading }) => {
          this.loading = loading;
          return data.clientListByIdSociete;
        })
      );
  }
  loadFournisseur(idSociete): Observable<any[]> {
    return this.adminService.apollo.use('compte_tier')
      .watchQuery<any>({
        query: GET_FOURNISSEUR_BY_ID_SOCIETE,
        variables:{
          id:idSociete
        }
      })
      .valueChanges.pipe(
        map(({ data, loading }) => {
          this.loading = loading;
          return data.fournisseurByIdSociete;
        })
      );
  }
  loadSalariee(idSociete): Observable<any[]> {
    return this.adminService.apollo.use('compte_tier')
      .watchQuery<any>({
        query: GET_SALARIEE_BY_ID_SOCIETE,
        variables:{
          id:idSociete
        }
      })
      .valueChanges.pipe(
        map(({ data, loading }) => {
          this.loading = loading;
          return data.salarieeByIdSociete;
        })
      );
  }

  cltById(idBanque): Observable<any[]> {
    return this.adminService.apollo.use('compte_tier')
      .watchQuery<any>({
        query: GET_CLIENT_BY_ID,
        variables:{
          id:idBanque
        }
      })
      .valueChanges.pipe(
        map(({ data, loading }) => {
          this.loading = loading;
          return data.clientById;
        })
      );
  }
  fourniyId(idBanque): Observable<any[]> {
    return this.adminService.apollo.use('compte_tier')
      .watchQuery<any>({
        query: GET_FOURNISSEUR_BY_ID,
        variables:{
          id:idBanque
        }
      })
      .valueChanges.pipe(
        map(({ data, loading }) => {
          this.loading = loading;
          return data.fournisseurById;
        })
      );
  }
  salarieById(idBanque): Observable<any[]> {
    return this.adminService.apollo.use('compte_tier')
      .watchQuery<any>({
        query: GET_SALARIEE_BY_ID,
        variables:{
          id:idBanque
        }
      })
      .valueChanges.pipe(
        map(({ data, loading }) => {
          this.loading = loading;
          return data.salarieeById;
        })
      );
  }

  ajouterClient(client:Client) {
    this.adminService.apollo.use('compte_tier')
      .mutate({
        mutation: AJOUTE_CLIENT,
        variables: {
          nom:client.nom,
          prenom:client.prenom,
          email:client.email,
          adresse:client.adresse,
          ville:client.ville,
          pays:client.pays,
          telephone:client.telephone,
          societeId:client.societeId,
          planComptableElementId:client.planComptableElementId
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
  ajouterFournisseur(fournisseur:Fournisseur) {
    this.adminService.apollo.use('compte_tier')
      .mutate({
        mutation: AJOUTE_FOURNISSEUR,
        variables: {
          nom:fournisseur.nom,
          prenom:fournisseur.prenom,
          email:fournisseur.email,
          adresse:fournisseur.adresse,
          ville:fournisseur.ville,
          pays:fournisseur.pays,
          telephone:fournisseur.telephone,
          societeId:fournisseur.societeId,
          planComptableElementId:fournisseur.planComptableElementId
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
  ajouterSalariee(salariee:Salariee) {
    this.adminService.apollo.use('compte_tier')
      .mutate({
        mutation: AJOUTE_SALARIEE,
        variables: {
          nom:salariee.nom,
          prenom:salariee.prenom,
          email:salariee.email,
          adresse:salariee.adresse,
          ville:salariee.ville,
          pays:salariee.pays,
          telephone:salariee.telephone,
          societeId:salariee.societeId,
          planComptableElementId:salariee.planComptableElementId
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

  modifierClient(id:string,client:Client) {
    this.adminService.apollo.use('compte_tier')
      .mutate({
        mutation: MODIFIER_CLIENT,
        variables: {
          id:id,
          nom:client.nom,
          prenom:client.prenom,
          email:client.email,
          adresse:client.adresse,
          ville:client.ville,
          pays:client.pays,
          telephone:client.telephone,
          societeId:client.societeId,
          planComptableElementId:client.planComptableElementId
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
  modifierFournisseur(id:string,fournisseur:Fournisseur) {
    this.adminService.apollo.use('compte_tier')
      .mutate({
        mutation: MODIFIER_FOURNISSEUR,
        variables: {
          id:id,
          nom:fournisseur.nom,
          prenom:fournisseur.prenom,
          email:fournisseur.email,
          adresse:fournisseur.adresse,
          ville:fournisseur.ville,
          pays:fournisseur.pays,
          telephone:fournisseur.telephone,
          societeId:fournisseur.societeId,
          planComptableElementId:fournisseur.planComptableElementId
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
  modifierSalariee(id:string,salariee:Salariee) {
    this.adminService.apollo.use('compte_tier')
      .mutate({
        mutation: MODIFIER_SALARIEE,
        variables: {
          id:id,
          nom:salariee.nom,
          prenom:salariee.prenom,
          email:salariee.email,
          adresse:salariee.adresse,
          ville:salariee.ville,
          pays:salariee.pays,
          telephone:salariee.telephone,
          societeId:salariee.societeId,
          planComptableElementId:salariee.planComptableElementId
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
  supprimerClient(id:string) {
    this.adminService.apollo.use('compte_tier')
      .mutate({
        mutation: SUPPRIMER_CLIENT,
        variables: {
          id:id,
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
  supprimerFournisseur(id:string) {
    this.adminService.apollo.use('compte_tier')
      .mutate({
        mutation: SUPPRIMER_FOURNISSEUR,
        variables: {
          id:id,
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
  supprimerSalariee(id:string) {
    this.adminService.apollo.use('compte_tier')
      .mutate({
        mutation: SUPPRIMER_SALARIEE,
        variables: {
          id:id,
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
