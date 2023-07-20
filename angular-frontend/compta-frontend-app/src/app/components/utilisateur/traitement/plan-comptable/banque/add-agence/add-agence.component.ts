import { Component } from '@angular/core';
import {NgForm} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../../../../../services/office-service/UserService";
import {Societe} from "../../../../../models/office-app/Societe";
import {Agence} from "../../../../../models/banque-app/Agence";
import {BanqueService} from "../../../../../../services/banque-service/BanqueService";

@Component({
  selector: 'app-add-agence',
  templateUrl: './add-agence.component.html',
  styleUrls: ['./add-agence.component.css']
})
export class AddAgenceComponent {
  nom:string='';
  complement:string='';
  code_postale:string='';
  ville:string='';
  pays:string='';

  id_current_user:string;
  idSociete:string;
  constructor(private router:Router,private banqueService:BanqueService,private route:ActivatedRoute) {
    this.id_current_user=banqueService.profile.id;
    this.idSociete = this.route.snapshot.params['idSociete'];
  }
  addAgence(addAgenceForm:NgForm){
    var agence= new Agence(addAgenceForm.value.nom,addAgenceForm.value.complement,addAgenceForm.value.code_postale,
      addAgenceForm.value.ville,addAgenceForm.value.pays,this.idSociete)
    this.banqueService.ajouterAgence(agence)
    this.router.navigate(['../utilisateur/traitement',this.idSociete,'plan-comptable',this.idSociete,'banque', this.idSociete]);
  }
}
