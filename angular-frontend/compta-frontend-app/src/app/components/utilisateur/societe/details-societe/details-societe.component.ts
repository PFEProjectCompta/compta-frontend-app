import {Component, Input} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../../../services/office-service/UserService";

@Component({
  selector: 'app-details-societe',
  templateUrl: './details-societe.component.html',
  styleUrls: ['./details-societe.component.css']
})
export class DetailsSocieteComponent {
  @Input() someInput: string;
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
  constructor(private router:Router,private route:ActivatedRoute,private userService:UserService) {
    this.id_current_user=userService.profile.id;
    this.idSociete = this.route.snapshot.params['idSociete'];
    this.getSociete(this.idSociete);

  }

  getSociete(id){
    this.userService.getSocieteById(id).subscribe(societe => {
      console.log("this sos: ", societe)
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
}
