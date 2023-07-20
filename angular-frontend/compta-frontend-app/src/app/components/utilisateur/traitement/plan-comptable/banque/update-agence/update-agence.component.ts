import { Component } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {BanqueService} from "../../../../../../services/banque-service/BanqueService";
import {NgForm} from "@angular/forms";
import {Agence} from "../../../../../models/banque-app/Agence";

@Component({
  selector: 'app-update-agence',
  templateUrl: './update-agence.component.html',
  styleUrls: ['./update-agence.component.css']
})
export class UpdateAgenceComponent {
  id_current_user:string;
  idSociete:string;
  idAgence:string;

  nom:string='';
  complement:string='';
  code_postale:string='';
  ville:string='';
  pays:string='';
  constructor(private router:Router,private banqueService:BanqueService,private route:ActivatedRoute) {
    this.id_current_user=banqueService.profile.id;
    this.idSociete = this.route.snapshot.params['idSociete'];
    this.idAgence=this.route.snapshot.params['idAgence'];
    this.getAgence(this.idAgence);
  }

  getAgence(id){
    this.banqueService.agenceById(id).subscribe(compte => {
      this.nom=compte['nom']
      this.complement=compte["complement"]
      this.code_postale=compte["code_postale"]
      this.ville=compte["ville"]
      this.pays=compte["pays"]
    });
  }
  updateAgence(updateAgenceForm:NgForm){
    var agence= new Agence(updateAgenceForm.value.nom,updateAgenceForm.value.complement,updateAgenceForm.value.code_postale,
      updateAgenceForm.value.ville,updateAgenceForm.value.pays,this.idSociete)


    this.banqueService.modifierAgence(this.idAgence,agence)
    this.router.navigate(['../utilisateur/traitement',this.idSociete,'plan-comptable',this.idSociete,'banque', this.idSociete]);

  }
}
