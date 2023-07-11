import {Component} from '@angular/core';
import {KeycloakEventType, KeycloakService} from "keycloak-angular";
import {KeycloakProfile} from "keycloak-js";
import {SharedService} from "./services/shared/SharedService";
import {AdminService} from "./services/office-service/AdminService";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  profile: KeycloakProfile;
  constructor(public keycloakService: KeycloakService,public adminService:AdminService,public sharedService:SharedService) {
  this.init();
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
  login(){
    this.keycloakService.login({
      redirectUri:window.location.origin
    });
  }
  logout(){
    this.keycloakService.logout(window.location.origin);
  }

}
