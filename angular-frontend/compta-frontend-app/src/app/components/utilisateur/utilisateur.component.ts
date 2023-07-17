import { Component } from '@angular/core';
import {UserService} from "../../services/office-service/UserService";
import {SharedService} from "../../services/shared/SharedService";
import {KeycloakEventType, KeycloakService} from "keycloak-angular";
import {KeycloakProfile} from "keycloak-js";
import {Apollo} from "apollo-angular";
import {HttpLink} from "apollo-angular/http";
import {AdminService} from "../../services/office-service/AdminService";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-utilisateur',
  templateUrl: './utilisateur.component.html',
  styleUrls: ['./utilisateur.component.css']
})
export class UtilisateurComponent {
  id_current_user:string;
  constructor(private router:Router,private route:ActivatedRoute,private userService:UserService) {
    this.id_current_user=userService.profile.id;
    // this.userService.getSocieteMembers(this.idSociete).subscribe(societes => {
    //   console.log("Members : ",societes)
    //   this.societeMembers=societes;
    // });
  }

}
