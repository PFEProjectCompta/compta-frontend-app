import {Injectable} from "@angular/core";
import {KeycloakProfile} from "keycloak-js";
import {AdminService} from "../office-service/AdminService";
import {Bureau} from "../../components/models/office-app/Bureau";
import {
  ADD_SOCIETE,
  AJOUTER_PLANCOMPATNLE_ELEMENT,
  MODIFIER_PLANCOMPATNLE_ELEMENT, SUPPRIMER_PLANCOMPATNLE_ELEMENT
} from "../../graphql/mutations.graphql";
import {PlanComptable} from "../../components/models/plan-comptable-app/PlanComptable";
import {Observable} from "rxjs";
import {
  GET_ADMINE,
  GET_COMPTE_GENERAL_BY_ID,
  GET_PLAN_COMPTABLE,
  GET_PLAN_COMPTABLE_BY_ID
} from "../../graphql/queries.graphql";
import {map} from "rxjs/operators";
import {PlanComptableDTO} from "../../components/models/plan-comptable-app/PlanComptableDTO";

@Injectable({
  providedIn: 'root'
})
export class PlanComptableService{
  loading: boolean;
  private dataSource: any;
  public profile?: KeycloakProfile;
  constructor(public adminService:AdminService) {
    this.profile=adminService.profile;
  }
  loadPlanComptable(id): Observable<any[]> {
    return this.adminService.apollo.use('options3')
      .watchQuery<any>({
        query: GET_PLAN_COMPTABLE,
        variables:{
          id:id
        }
      })
      .valueChanges.pipe(
        map(({ data, loading }) => {
          this.loading = loading;
          this.dataSource = data.planComptableElementBySocieteId;
          return data.planComptableElementBySocieteId;
        })
      );
  }
  addPlanComptableElement(planComptable:PlanComptable) {
    this.adminService.apollo.use("options3")
      .mutate({
        mutation: AJOUTER_PLANCOMPATNLE_ELEMENT ,
        variables: {
          num:planComptable.numeroCompte,
          intit:planComptable.intitule,
          societeId:planComptable.societeId,
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
  getPlanCompatbleElementById(id): Observable<any[]> {
    return this.adminService.apollo.use("options3")
      .watchQuery<any>({
        query: GET_PLAN_COMPTABLE_BY_ID,
        variables:{
          id:id
        },
      })
      .valueChanges.pipe(
        map(({ data, loading }) => {
          this.loading = loading;
          this.dataSource = data.planComptableElementById;
          return data.planComptableElementById;
        })
      );
  }
  updatePlanComptableElement(idPlanComptableElement:string,planComptableDTO:PlanComptableDTO) {
    this.adminService.apollo.use("options3")
      .mutate({
        mutation: MODIFIER_PLANCOMPATNLE_ELEMENT ,
        variables: {
          id:idPlanComptableElement,
          num:planComptableDTO.numeroCompte,
          intit:planComptableDTO.intitule,
          compGen:planComptableDTO.compteGeneralId
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
  deletePlanComptableElement(idPlanComptableElement:string) {
    this.adminService.apollo.use("options3")
      .mutate({
        mutation: SUPPRIMER_PLANCOMPATNLE_ELEMENT ,
        variables: {
          id:idPlanComptableElement,
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
}
