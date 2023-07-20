import { Component } from '@angular/core';
import {NgForm} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {PlanComptableService} from "../../../../../../../../../services/plan-service/PlanComptableService";
import {BanqueService} from "../../../../../../../../../services/banque-service/BanqueService";
import {Contact} from "../../../../../../../../models/banque-app/Contact";

@Component({
  selector: 'app-update-contact',
  templateUrl: './update-contact.component.html',
  styleUrls: ['./update-contact.component.css']
})
export class UpdateContactComponent {

  id_current_user:string;
  idSociete:any;
  idAgence:any;
  idBanque:any;
  idContact:any;

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
    this.idContact = this.route.snapshot.params['idContact'];
    this.getContactById(this.idContact);
  }
  getContactById(id){
    this.banqueService.contactById(id).subscribe(contact => {

      this.type_contact=contact['type_contact']
      this.type_contact=contact['type_contact']
      this.nom=contact['nom']
      this.prenom=contact['prenom']
      this.service=contact['service']
      this.fonction=contact['fonction']
      this.telephone=contact['telephone']
      this.portable=contact['portable']
      this.email=contact['email']
      this.telecopie=contact['telecopie']

    });

  }
  updateContact(updateContactForm:NgForm){
    var contact=new Contact(updateContactForm.value.type_contact,updateContactForm.value.civilite,updateContactForm.value.nom,
      updateContactForm.value.prenom,updateContactForm.value.service,updateContactForm.value.fonction,updateContactForm.value.telephone,
      updateContactForm.value.portable,updateContactForm.value.email,updateContactForm.value.telecopie,this.idBanque)
    this.banqueService.modifierContact(this.idContact,contact);
    this.router.navigate(['../utilisateur/traitement',this.idSociete,'plan-comptable',this.idSociete,'banque', this.idSociete,'details-agence',this.idAgence,this.idSociete,'details-banque',this.idBanque,this.idAgence,this.idSociete,'contact',this.idBanque,this.idAgence,this.idSociete]);

  }
}
