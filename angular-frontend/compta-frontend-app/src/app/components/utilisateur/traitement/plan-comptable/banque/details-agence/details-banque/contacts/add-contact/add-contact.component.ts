import { Component } from '@angular/core';
import {FormControl, NgForm} from "@angular/forms";
import {Observable} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {PlanComptableService} from "../../../../../../../../../services/plan-service/PlanComptableService";
import {BanqueService} from "../../../../../../../../../services/banque-service/BanqueService";
import {CompteBancaire} from "../../../../../../../../models/banque-app/CompteBancaire";
import {Contact} from "../../../../../../../../models/banque-app/Contact";

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.css']
})
export class AddContactComponent {
  id_current_user:string;
  idSociete:any;
  idAgence:any;
  idBanque:any;


  type_contact:string='';
  civilite:string='';
  nom:string='';
  prenom:string='';
  service:string='';
  fonction:string='';
  telephone:string='';
  portable:string='';
  email:string='';
  telecopie:string='';

  constructor(private router:Router,private route:ActivatedRoute,private planComptableService:PlanComptableService,private banqueService:BanqueService) {
    this.id_current_user=banqueService.profile.id;
    this.idSociete = this.route.snapshot.params['idSociete'];
    this.idAgence = this.route.snapshot.params['idAgence'];
    this.idBanque = this.route.snapshot.params['idBanque'];
  }
  addContact(addContactForm:NgForm){
    var contact=new Contact(addContactForm.value.type_contact,addContactForm.value.civilite,addContactForm.value.nom,
      addContactForm.value.prenom,addContactForm.value.service,addContactForm.value.fonction,addContactForm.value.telephone,
      addContactForm.value.portable,addContactForm.value.email,addContactForm.value.telecopie,this.idBanque)
    this.banqueService.ajouterContact(contact);
    this.router.navigate(['../utilisateur/traitement',this.idSociete,'plan-comptable',this.idSociete,'banque', this.idSociete,'details-agence',this.idAgence,this.idSociete,'details-banque',this.idBanque,this.idAgence,this.idSociete,'contact',this.idBanque,this.idAgence,this.idSociete]);

  }
}
