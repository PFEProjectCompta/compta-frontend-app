import {Injectable} from "@angular/core";
import {KeycloakEventType, KeycloakService} from "keycloak-angular";
import {KeycloakProfile} from "keycloak-js";
import {AdminService} from "../office-service/AdminService";
import {Observable} from "rxjs";
import {GET_ADMINE} from "../../graphql/queries.graphql";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class SharedService{
  loading: boolean;
  private dataSource: any;
  public dataSourceBureaux: any;
  public profile?: KeycloakProfile;
  constructor(public adminService:AdminService) {
    console.log(adminService.profile);
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
          console.log("wyyyyyy: ",data.searchAll);
          return data.searchAll;
        })
      );
  }
}
