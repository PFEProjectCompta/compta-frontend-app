import {Injectable} from "@angular/core";
import {Apollo} from "apollo-angular";
import {HttpLink} from "apollo-angular/http";
import {KeycloakEventType, KeycloakService} from "keycloak-angular";
import {InMemoryCache} from "@apollo/client/core";
import {Observable, Subscription} from "rxjs";
import {KeycloakProfile} from "keycloak-js";
import {AdminService} from "./AdminService";
import {
  GET_ADMINE, GET_COMPTE_GENERAL_BY_ID, GET_COMPTES_GENERAUX_SOCIETE,
  GET_SOCIETE,
  GET_SOCIETE_BY_ID,
  GET_SOCIETE_MEMBERS,
  GET_SOCIETE_SHARED
} from "../../graphql/queries.graphql";
import {map} from "rxjs/operators";
import {Bureau} from "../../components/models/office-app/Bureau";
import {
  ADD_BUREAU, ADD_COMPTES_GENERAUX_SOCIETE,
  ADD_MEMBER_TO_SOCIETE,
  ADD_SOCIETE, Modifier_COMPTES_GENERAUX, REMOVE_MEMBER_TO_SOCIETE,
  REMOVE_SOCIETE,
  UPDATE_SOCIETE
} from "../../graphql/mutations.graphql";
import {Societe} from "../../components/models/office-app/Societe";
import {CompteGeneral} from "../../components/models/plan-comptable-app/CompteGeneral";

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

  addSociete(societe:Societe) : Promise<any> {
    return new Promise((resolve, reject) => {
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
            console.log('got data', data['ajouterSociete']);
            resolve(data)
          },
          error => {
            console.log('there was an error sending the query', error);
          },
        );
    })
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
  getSocieteMembers(id): Observable<any[]> {
    return this.adminService.apollo.use('office')
      .watchQuery<any>({
        query: GET_SOCIETE_MEMBERS,
        variables:{
          id:id
        },
      })
      .valueChanges.pipe(
        map(({ data, loading }) => {
          this.loading = loading;
          this.dataSource = data.membersList;
          return data.membersList;
        })
      );
  }

  addMemberToSociete(id_societe:string,id_createur:string,id_membre:string) {
    this.adminService.apollo.use("options2")
      .mutate({
        mutation: ADD_MEMBER_TO_SOCIETE ,
        variables: {
          id_societe:id_societe,
          createur:id_createur,
          member:id_membre
        }
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
  deleteMemberToSociete(id) {
    this.adminService.apollo.use("options2")
      .mutate({
        mutation: REMOVE_MEMBER_TO_SOCIETE ,
        variables: {
          id:id
        }
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

  getSocieteShared(id): Observable<any[]> {
    return this.adminService.apollo.use('office')
      .watchQuery<any>({
        query: GET_SOCIETE_SHARED,
        variables:{
          id:id
        },
      })
      .valueChanges.pipe(
        map(({ data, loading }) => {
          this.loading = loading;
          this.dataSource = data.membersListByMemberId;
          return data.membersListByMemberId;
        })
      );
  }
  addComptesGenerauxSociete(id_societe:string) {
    this.adminService.apollo.use("options3")
      .mutate({
        mutation: ADD_COMPTES_GENERAUX_SOCIETE ,
        variables: {
          id:id_societe
        }
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
  getCompteGenerauxSociete(id): Observable<any[]> {
    return this.adminService.apollo.use("options3")
      .watchQuery<any>({
        query: GET_COMPTES_GENERAUX_SOCIETE,
        variables:{
          id:id
        },
      })
      .valueChanges.pipe(
        map(({ data, loading }) => {
          this.loading = loading;
          this.dataSource = data.compteGeneralByIdSociete;
          return data.compteGeneralByIdSociete;
        })
      );
  }
  getCompteGeneralById(id): Observable<any[]> {
    return this.adminService.apollo.use("options3")
      .watchQuery<any>({
        query: GET_COMPTE_GENERAL_BY_ID,
        variables:{
          id:id
        },
      })
      .valueChanges.pipe(
        map(({ data, loading }) => {
          this.loading = loading;
          this.dataSource = data.compteGeneralById;
          return data.compteGeneralById;
        })
      );
  }
  updateCompteGeneral(id_compte:string,compte:CompteGeneral) {
    this.adminService.apollo.use("options3")
      .mutate({
        mutation: Modifier_COMPTES_GENERAUX ,
        variables: {
          id:id_compte,
          debut:compte.debutFaurchette,
          fin:compte.finFaurchette
        }
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
