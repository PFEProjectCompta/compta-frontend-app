import { Component } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {AdminService} from "../../../services/office-service/AdminService";

@Component({
  selector: 'app-update-compte-user',
  templateUrl: './update-compte-user.component.html',
  styleUrls: ['./update-compte-user.component.css']
})
export class UpdateCompteUserComponent {
  idCompteUtilisateur:any;
  constructor(private route:ActivatedRoute,private adminService:AdminService) {
    this.idCompteUtilisateur = this.route.snapshot.params['idCompteUser'];
    console.log("haniiii : ",this.idCompteUtilisateur);
  }
}
