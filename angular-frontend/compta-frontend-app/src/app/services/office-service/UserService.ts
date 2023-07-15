import {Injectable} from "@angular/core";
import {Apollo} from "apollo-angular";
import {HttpLink} from "apollo-angular/http";
import {KeycloakEventType, KeycloakService} from "keycloak-angular";
import {InMemoryCache} from "@apollo/client/core";
import {Observable, Subscription} from "rxjs";
import {KeycloakProfile} from "keycloak-js";
import {AdminService} from "./AdminService";
import {GET_ADMINE, GET_SOCIETE, GET_SOCIETE_BY_ID} from "../../graphql/queries.graphql";
import {map} from "rxjs/operators";
import {Bureau} from "../../components/models/office-app/Bureau";
import {ADD_BUREAU, ADD_SOCIETE, REMOVE_SOCIETE, UPDATE_SOCIETE} from "../../graphql/mutations.graphql";
import {Societe} from "../../components/models/office-app/Societe";

@Injectable({
  providedIn: 'root'
})
export class UserService{
  loading: boolean;
  private dataSource: any;
  public dataSourceBureaux: any;
  public profile?: KeycloakProfile;
  constructor(public adminService:AdminService) {
    this.profile=adminService.profile;
  }
  loadAdminsToSuperAdmin(): Observable<any[]> {
    return this.adminService.apollo.use('admins')
      .watchQuery<any>({
        query: GET_ADMINE,
      })
      .valueChanges.pipe(
        map(({ data, loading }) => {
          this.loading = loading;
          this.dataSource = data.searchAll;
          return data.searchAll;
        })
      );
  }
  //ajouter la class societe en angular pour l'ajout
  addBureau(bureau:Bureau) {
    this.adminService.apollo.use("options2")
      .mutate({
        mutation: ADD_SOCIETE ,
        variables: {
          nom:bureau.nom,
          adresse:bureau.adresse,
          ville:bureau.ville,
          pays:bureau.paye,
          numero_tele:bureau.numero_tele,
          email:bureau.email,
          admineId:bureau.adminId
        },context:{clientName:'addBureau'}
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

  addSociete(societe:Societe) {
    this.adminService.apollo.use("options2")
      .mutate({
        mutation: ADD_SOCIETE ,
        variables: {
          raison_social:societe.raison_social,
          activite:societe.activite,
          adresse:societe.adresse,
          compteUtilisateurId:societe.compteUtilisateurId,
          ville:societe.ville,
          pays:societe.pays,
          devise:societe.devise,
          forme_juridique:societe.forme_juridique,
          capital:societe.capital,
          telephone:societe.telephone,
          email:societe.email,
          site_internet:societe.site_internet,
          num_dossier:societe.num_dossier,
          identifiant_TVA:societe.identifiant_TVA
        },context:{clientName:'addSociete'}
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
  loadSocietes(id): Observable<any[]> {
    return this.adminService.apollo.use('office')
      .watchQuery<any>({
        query: GET_SOCIETE,
        variables: {
          idUtilisateur: id,
        }
      })
      .valueChanges.pipe(
        map(({ data, loading }) => {
          this.loading = loading;
          this.dataSource = data.societeByIdUtilisateur;
          return data.societeByIdUtilisateur;
        })
      );
  }
  updateSociete(id_societe:string,societe:Societe) {
    this.adminService.apollo.use("options2")
      .mutate({
        mutation: UPDATE_SOCIETE ,
        variables: {
          raison_social:societe.raison_social,
          activite:societe.activite,
          adresse:societe.adresse,
          compteUtilisateurId:societe.compteUtilisateurId,
          ville:societe.ville,
          pays:societe.pays,
          devise:societe.devise,
          forme_juridique:societe.forme_juridique,
          capital:societe.capital,
          telephone:societe.telephone,
          email:societe.email,
          site_internet:societe.site_internet,
          num_dossier:societe.num_dossier,
          identifiant_TVA:societe.identifiant_TVA,
          idSociete:id_societe
        },context:{clientName:'addSociete'}
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

  getSocieteById(id): Observable<any[]> {
    return this.adminService.apollo.use('office')
      .watchQuery<any>({
        query: GET_SOCIETE_BY_ID,
        variables: {
          idSociete: id,
        }
      })
      .valueChanges.pipe(
        map(({ data, loading }) => {
          this.loading = loading;
          this.dataSource = data.societeById;

          return data.societeById;
        })
      );
  }
  deleteSociete(id_societe:string) {
    this.adminService.apollo.use("options2")
      .mutate({
        mutation: REMOVE_SOCIETE ,
        variables: {
          id:id_societe
        },context:{clientName:'addSociete'}
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
