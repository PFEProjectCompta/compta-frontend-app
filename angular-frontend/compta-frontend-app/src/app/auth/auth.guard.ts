// import { Injectable } from '@angular/core';
// import {
//   ActivatedRouteSnapshot,
//   Router,
//   RouterStateSnapshot
// } from '@angular/router';
// import {KeycloakAuthGuard, KeycloakEventType, KeycloakService} from 'keycloak-angular';
// import {KeycloakProfile} from "keycloak-js";
// import {resolve} from "@angular/compiler-cli";
//
// @Injectable({
//   providedIn: 'root'
// })
// export class AuthGuard extends KeycloakAuthGuard {
//   flags:boolean;
//   profile: KeycloakProfile;
//   constructor(
//     protected override readonly router: Router,
//     protected readonly keycloak: KeycloakService
//   ) {
//     super(router, keycloak);
//     this.keycloak.keycloakEvents$.subscribe({
//       next:(e) =>{
//         if (e.type==KeycloakEventType.OnAuthSuccess){
//           this.keycloak.loadUserProfile().then(profile=>this.profile=profile)
//         }
//       }
//     });
//     console.log("wlh: ",this.profile)
//   }
//
//   public async isAccessAllowed(
//     route: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot
//   ) {
//     console.log("waaaaa ",this.keycloak.isLoggedIn().then())
//     // Force the user to log in if currently unauthenticated.
//
//     console.log(!this.profile)
//     if (!this.profile) {
//       console.log("3lah")
//       // await this.keycloak.login({
//       //   redirectUri: window.location.origin //+ state.url
//       // });
//     }
//
//     // Get the roles required from the route.
//     const requiredRoles = route.data['roles'];
//
//     // Allow the user to proceed if no additional roles are required to access the route.
//     if (!Array.isArray(requiredRoles) || requiredRoles.length === 0) {
//       return true;
//     }
//     console.log("dwlkd ", this.keycloak.getUserRoles())
//     console.log("dwlkd ", this.keycloak.getUserRoles())
//     const fa=this.keycloak.keycloakEvents$.subscribe({
//       next:(e) =>{
//         if (e.type==KeycloakEventType.OnAuthSuccess){
//           this.keycloak.loadUserProfile().then(profile=>{
//             console.log("wwwdqawlllsl : ",profile.id)
//             console.log("wa hay hay: " , )
//             // console.log("hnnak " , this.keycloak.getUserRoles())
//             // this.roles_user=this.keycloak.getUserRoles();
//             this.flags= requiredRoles.every((role) => this.keycloak.getUserRoles());
//           });
//         }
//       }
//     });
//     // Allow the user to proceed if all the required roles are present.
//     console.log("cocooooo")
//     return requiredRoles.every((role) => this.roles.includes(role));
//   }
//
// }
