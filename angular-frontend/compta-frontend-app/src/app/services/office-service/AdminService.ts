import {Injectable} from "@angular/core";
import {Subscription} from "rxjs";
import {
  GET_ADMINE,
  GET_BUREAU_BY_ID,
  GET_BUREAUX,
  GET_COMPTE_UTILISATEUR,
  GET_USERNAME
} from "../../graphql/queries.graphql";
import {Apollo} from "apollo-angular";
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  ADD_ADMIN,
  ADD_BUREAU, ADD_COMPTE_UTILISATEUR, ADD_KEYCLOAK_USER,
  ADD_ROLE, ADD_USER_ROLE,
  REMOVE_ADMIN, REMOVE_BUREAU, REMOVE_COMPTE_UTILISATEUR,
  REMOVE_ROLE, REMOVE_USER_ROLE,
  UPDATE_BUREAU, UPDATE_COMPTE_UTILISATEUR_ACTIF
} from "../../graphql/mutations.graphql";
import { HttpLink } from 'apollo-angular/http';
import {ApolloClient, ApolloLink, InMemoryCache} from "@apollo/client/core";
import {KeycloakEventType, KeycloakService} from "keycloak-angular";
import {KeycloakProfile} from "keycloak-js";
import {Bureau} from "../../components/models/office-app/Bureau";
import {CompteUtilisateur} from "../../components/models/office-app/CompteUtilisateur";
import {UserKeycloak} from "../../components/models/admin-app/UserKeycloak";




@Injectable({
  providedIn: 'root'
})
export class AdminService{
  private querySubscription:Subscription;
  loading: boolean;
  private dataSource: any;
  public dataSourceBureaux: any;
  public profile?: KeycloakProfile;
  constructor(public apollo:Apollo,httpLink: HttpLink,public keycloakService: KeycloakService) {
    this.init();
    const options1: any = { uri: 'http://localhost:8087/graphql' };
    const options2: any = { uri: 'http://localhost:8081/graphql' };
    const options3: any = { uri: 'http://localhost:8083/graphql' };
    const banque: any = { uri: 'http://localhost:8084/graphql' };
    const compte_tier: any = { uri: 'http://localhost:8085/graphql' };
    const exercice: any = { uri: 'http://localhost:8082/graphql' };
    apollo.createDefault({
      link: httpLink.create(options1),
      cache: new InMemoryCache()
    });
    apollo.createNamed('options2',{
      link:httpLink.create(options2),
      cache:new InMemoryCache()
    })
    apollo.createNamed('options3',{
      link:httpLink.create(options3),
      cache:new InMemoryCache()
    })
    apollo.createNamed('banque',{
      link:httpLink.create(banque),
      cache:new InMemoryCache()
    })
    apollo.createNamed('compte_tier',{
      link:httpLink.create(compte_tier),
      cache:new InMemoryCache()
    })
    apollo.createNamed('exercice',{
      link:httpLink.create(exercice),
      cache:new InMemoryCache()
    })
  }

  init(){
    this.keycloakService.keycloakEvents$.subscribe({
      next:(e) =>{
        if (e.type==KeycloakEventType.OnAuthSuccess){
          this.keycloakService.loadUserProfile().then(profile=>{
            this.profile=profile;
          });
        }
      }
    });
  }

  loadAdminsToSuperAdmin(): Observable<any[]> {
    return this.apollo.use('admins')
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

  addRoleAdmin(id) {
    this.apollo
      .mutate({
        mutation: ADD_ROLE,
        variables: {
          id: id,
        },context:{clientName:'security'}
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

  removeRoleAdmin(id) {
    this.apollo
      .mutate({
        mutation: REMOVE_ROLE,
        variables: {
          id: id,
        },context:{clientName:'security'}
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
  getUserNames(): Observable<any[]> {
    return this.apollo.use('usernames')
      .watchQuery<any>({
        query: GET_USERNAME,
      })
      .valueChanges.pipe(
        map(({ data, loading }) => {
          this.loading = loading;
          // this.dataSource = data.searchAll;
          return data.getUserName();
        })
      );
  }

  addAdministrateur(id,nom,prenom,email) {
    this.apollo.use("options2")
      .mutate({
        mutation: ADD_ADMIN,
        variables: {
          id: id,
          nom:nom,
          prenom:prenom,
          email:email
        },context:{clientName:'addAdmin'}
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
  removeAdministrateur(id) {
    this.apollo.use("options2")
      .mutate({
        mutation: REMOVE_ADMIN,
        variables: {
          id: id,
        },context:{clientName:'addAdmin'}
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

  addBureau(bureau:Bureau) {
    this.apollo.use("options2")
      .mutate({
        mutation: ADD_BUREAU,
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
  getBureaux(idAdministrateur): Observable<any[]> {
    console.log("hohoho: ")
    return this.apollo.use('office')
      .watchQuery<any>({
        query: GET_BUREAUX,
        variables: {
          id: idAdministrateur,
        }
      })
      .valueChanges.pipe(
        map(({ data, loading }) => {
          this.loading = loading;
          console.log("hohoho: ")
          this.dataSourceBureaux = data.bureauListByAdminId;
          return data.bureauListByAdminId;
        })
      );
  }
  updateBureau(idBureau:string,bureau:Bureau) {
    this.apollo.use('office')
      .mutate({
        mutation: UPDATE_BUREAU,
        variables: {
          idBureau: idBureau,
          nom:bureau.nom,
          adresse:bureau.adresse,
          ville:bureau.ville,
          paye:bureau.paye,
          numero_tele:bureau.numero_tele,
          email:bureau.email,
          adminId:bureau.adminId
        },context:{clientName:'office'}
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
  getBureauById(idBureau): Observable<any[]> {
    return this.apollo.use('office')
      .watchQuery<any>({
        query: GET_BUREAU_BY_ID,
        variables: {
          id: idBureau,
        }
      })
      .valueChanges.pipe(
        map(({ data, loading }) => {
          this.loading = loading;
          return data.bureauById;
        })
      );
  }

  removeBureau(id) {
    this.apollo.use("options2")
      .mutate({
        mutation: REMOVE_BUREAU,
        variables: {
          id: id,
        },context:{clientName:'addAdmin'}
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
  addKeycloakUser(userKeycloak: UserKeycloak): Promise<any> {
    return new Promise((resolve, reject) => {
      this.apollo
        .mutate({
          mutation: ADD_KEYCLOAK_USER,
          variables: {
            userName: userKeycloak.userName,
            email: userKeycloak.email,
            pass: userKeycloak.password,
            firstName: userKeycloak.firstname,
            lastName: userKeycloak.lastName
          },
          context: { clientName: 'adduser' }
        })
        .subscribe(
          ({ data }) => {
            console.log('got data', data);
            resolve(data);
          },
          error => {
            console.log('there was an error sending the query', error);
            reject(error);
          },
        );
    });
  }

  addCompteUtilisateur(compteUtilisateur:CompteUtilisateur) {
    this.apollo.use("options2")
      .mutate({
        mutation: ADD_COMPTE_UTILISATEUR,
        variables: {
          id:compteUtilisateur.id,
          nom:compteUtilisateur.nom,
          prenom:compteUtilisateur.prenom,
          email:compteUtilisateur.email,
          adresse:compteUtilisateur.adresse,
          ville:compteUtilisateur.ville,
          pays:compteUtilisateur.pays,
          telephone:compteUtilisateur.telephone,
          date_naissance:compteUtilisateur.date_naissance,
          actif:compteUtilisateur.actif,
          bureauId:compteUtilisateur.bureauId
        },context:{clientName:'addAdmin'}
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
  getComptesUtilisateursByBureauId(idBureau): Observable<any[]> {
    return this.apollo.use('office')
      .watchQuery<any>({
        query: GET_COMPTE_UTILISATEUR,
        variables: {
          idBureau: idBureau,
        }
      })
      .valueChanges.pipe(
        map(({ data, loading }) => {
          this.loading = loading;
          return data.compteUtilisateurListByBureauId;
        })
      );
  }

  removeCompteUtilisateur(id) {
    this.apollo.use("options2")
      .mutate({
        mutation: REMOVE_COMPTE_UTILISATEUR,
        variables: {
          id: id,
        },context:{clientName:'addAdmin'}
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

  addRoleUser(id) {
    this.apollo
      .mutate({
        mutation: ADD_USER_ROLE,
        variables: {
          id: id,
        },context:{clientName:'userRole'}
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
  removeRoleUser(id) {
    this.apollo
      .mutate({
        mutation: REMOVE_USER_ROLE,
        variables: {
          id: id,
        },context:{clientName:'userRole'}
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
  updateCompteUtilisateurActif(id,isActif) {
    this.apollo.use("options2")
      .mutate({
        mutation: UPDATE_COMPTE_UTILISATEUR_ACTIF,
        variables: {
          id: id,
          actif:isActif,
        },context:{clientName:'userRole'}
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
