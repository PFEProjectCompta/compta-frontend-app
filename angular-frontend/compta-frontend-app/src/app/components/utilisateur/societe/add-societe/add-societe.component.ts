import { Component } from '@angular/core';
import {NgForm} from "@angular/forms";
import {Router} from "@angular/router";
import {Societe} from "../../../models/office-app/Societe";
import {UserService} from "../../../../services/office-service/UserService";

@Component({
  selector: 'app-add-societe',
  templateUrl: './add-societe.component.html',
  styleUrls: ['./add-societe.component.css']
})
export class AddSocieteComponent {
  raison_social: string='' ;
  activite: string='' ;
  adresse: string ='';
  compteUtilisateurId: string='' ;
  ville: string ='';
  pays: string ='';
  devise: string ='';
  forme_juridique: string='' ;
  capital: number =0;
  telephone: string ='';
  email: string ='';
  site_internet: string='' ;
  num_dossier: string ='';
  identifiant_TVA :string='' ;

  id_current_user:string;
  constructor(private router:Router,private userService:UserService) {
    this.id_current_user=userService.profile.id;
  }
  addSociete(addSocieteForm:NgForm){
    var societe= new Societe(addSocieteForm.value.raison_social,addSocieteForm.value.activite,
      addSocieteForm.value.adresse,this.id_current_user, addSocieteForm.value.ville, addSocieteForm.value.pays,
      addSocieteForm.value.devise, addSocieteForm.value.forme_juridique, addSocieteForm.value.capital,
      addSocieteForm.value.telephone, addSocieteForm.value.email, addSocieteForm.value.site_internet,
      addSocieteForm.value.num_dossier, addSocieteForm.value.identifiant_TVA)
    this.userService.addSociete(societe);
    this.router.navigate(['../utilisateur/societes'])
  }
}
