import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot
} from '@angular/router';
import {KeycloakAuthGuard, KeycloakService} from 'keycloak-angular';
import {SharedService} from "../shared/shared.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard extends KeycloakAuthGuard {
  flags:boolean;
  constructor(
    public shared:SharedService,
    protected override readonly router: Router,
    protected readonly keycloak: KeycloakService
  ) {
    super(router, keycloak);

  }

  public async isAccessAllowed(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) {


      console.log("haniiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii")
      // Get the roles required from the route.
      const requiredRoles = route.data['roles'];

      // Allow the user to proceed if no additional roles are required to access the route.
      if (!Array.isArray(requiredRoles) || requiredRoles.length === 0) {
        return true;
      }
      console.log("batwanas bik")
      // Allow the user to proceed if all the required roles are present.
      // return requiredRoles.every((role) => this.roles.includes(role));
      return true;


  }
}
