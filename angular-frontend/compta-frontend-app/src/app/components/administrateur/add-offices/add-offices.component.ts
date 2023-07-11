import { Component } from '@angular/core';
import {NgForm} from "@angular/forms";
import {AdminService} from "../../../services/office-service/AdminService";
import {BureauService} from "../../../services/office-service/BureauService";
import {Bureau} from "../../models/office-app/Bureau";
import {identity} from "rxjs";

@Component({
  selector: 'app-add-offices',
  templateUrl: './add-offices.component.html',
  styleUrls: ['./add-offices.component.css']
})
export class AddOfficesComponent {
  id:string
  nom_bureau:string='';
  adresse:string='';
  ville:string='';
  pays:string='';
  num_telephone:string='';
  email:string='';
  constructor(public adminService: AdminService) {
    this.id = adminService.profile.id;
  }
  addUser(addUserForm:NgForm){
    var bureau= new Bureau(addUserForm.value.nom_bureau,addUserForm.value.adresse,addUserForm.value.ville,addUserForm.value.pays,addUserForm.value.num_telephone,addUserForm.value.email,this.id)
    this.adminService.addBureau(bureau)
    location.reload();
  }
}
