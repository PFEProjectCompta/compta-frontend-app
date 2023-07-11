import { Component } from '@angular/core';
import {AdminService} from "../../../services/office-service/AdminService";
import {NgForm} from "@angular/forms";
import {CompteUtilisateur} from "../../models/office-app/CompteUtilisateur";
import { DatePipe } from '@angular/common';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import {ActivatedRoute} from "@angular/router";
import {UserKeycloak} from "../../models/admin-app/UserKeycloak";

export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'DD-MM-YYYY',
  },
  display: {
    dateInput: 'DD-MM-YYYY',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY'
  },
};
@Component({
  selector: 'app-add-compte-user',
  templateUrl: './add-compte-user.component.html',
  styleUrls: ['./add-compte-user.component.css'],
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }
  ]
})
export class AddCompteUserComponent {
  id_admin_courant:string;
  idBureau:string;
  nom:string='';
  prenom:string='';
  email:string='';
  adresse:string='';
  ville:string='';
  pays:string='';
  telephone:string='';
  date_naissance:string='';
  actif:boolean=false;
  transformedDate: string;
  constructor(public adminService: AdminService,private datePipe: DatePipe,private route:ActivatedRoute) {
    this.id_admin_courant = adminService.profile.id;
    this.idBureau = this.route.snapshot.params['idBureau'];
  }

  transformDate(dateString: string) {
    const date = new Date(dateString);
    this.transformedDate = this.datePipe.transform(date, 'dd-MM-yyyy');
  }

  addUser(addUserForm:NgForm){
    var userKeycloak=new UserKeycloak(addUserForm.value.nom,addUserForm.value.email,"1234",addUserForm.value.nom,addUserForm.value.prenom)
    this.adminService.addKeycloakUser(userKeycloak)
      .then(data => {
        this.transformDate(addUserForm.value.date_naissance)
        var compteUser=new CompteUtilisateur(data['addUser'],addUserForm.value.nom,addUserForm.value.prenom,
          addUserForm.value.email,addUserForm.value.adresse,addUserForm.value.ville,
          addUserForm.value.pays,addUserForm.value.telephone,this.transformedDate,true,this.idBureau);
        this.adminService.addCompteUtilisateur(compteUser);
        location.reload();
      })
      .catch(error => {
        // Handle the error here
      });


  }

}
