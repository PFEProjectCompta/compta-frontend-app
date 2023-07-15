import {Component, Input, Output, EventEmitter, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AdminService} from "../../../../services/office-service/AdminService";
import {UserService} from "../../../../services/office-service/UserService";
import {NgForm} from "@angular/forms";
import {Societe} from "../../../models/office-app/Societe";
import {SharedService} from "../../../../shared/shared.service";

@Component({
  selector: 'app-update-societe',
  templateUrl: './update-societe.component.html',
  styleUrls: ['./update-societe.component.css']
})
export class UpdateSocieteComponent{
  raison_social: string='' ;
  activite: string='' ;
  adresse: string ='';
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

  idSociete:any;
  constructor(public sharedService:SharedService,private router:Router,private route:ActivatedRoute,private userService:UserService) {
    this.id_current_user=userService.profile.id;
    this.idSociete = this.route.snapshot.params['idSociete'];
    this.getSociete(this.idSociete);

  }

  getSociete(id){
    this.userService.getSocieteById(id).subscribe(societe => {
      this.raison_social=societe['raison_social'];
      this.activite=societe['activite'] ;
      this.adresse =societe['adresse'] ;
      this.ville =societe['ville'] ;
      this.pays =societe['pays'] ;
      this.devise =societe['devise'] ;
      this.forme_juridique=societe['forme_juridique']  ;
      this.capital =societe['capital'] ;
      this.telephone =societe['telephone'] ;
      this.email =societe['email'] ;
      this.site_internet=societe['site_internet'] ;
      this.num_dossier =societe['num_dossier'] ;
      this.identifiant_TVA=societe['identifiant_TVA'] ;

    });
  }
  updateSociete(updateSocieteForm:NgForm){
    var societe= new Societe(updateSocieteForm.value.raison_social,updateSocieteForm.value.activite,
      updateSocieteForm.value.adresse,this.id_current_user, updateSocieteForm.value.ville, updateSocieteForm.value.pays,
      updateSocieteForm.value.devise, updateSocieteForm.value.forme_juridique, updateSocieteForm.value.capital,
      updateSocieteForm.value.telephone, updateSocieteForm.value.email, updateSocieteForm.value.site_internet,
      updateSocieteForm.value.num_dossier, updateSocieteForm.value.identifiant_TVA);
    this.userService.updateSociete(this.idSociete,societe);
    this.sharedService.setData(true);
    this.router.navigate(['../utilisateur/societes'])


  }

}
