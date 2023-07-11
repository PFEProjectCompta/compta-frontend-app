import { Component } from '@angular/core';
import {UserService} from "../../services/office-service/UserService";
import {SharedService} from "../../services/shared/SharedService";
import {KeycloakEventType, KeycloakService} from "keycloak-angular";
import {KeycloakProfile} from "keycloak-js";
import {Apollo} from "apollo-angular";
import {HttpLink} from "apollo-angular/http";
import {AdminService} from "../../services/office-service/AdminService";

@Component({
  selector: 'app-utilisateur',
  templateUrl: './utilisateur.component.html',
  styleUrls: ['./utilisateur.component.css']
})
export class UtilisateurComponent {

  constructor(public userService: UserService) {
    console.log("hhjhjhjhjhj : ",userService.profile);
    this.userService.loadAdminsToSuperAdmin().subscribe(admins => {
      console.log("wawawawa : ",admins);

    });
  }

}
