import { Component } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../../../../../../services/office-service/UserService";
import {BanqueService} from "../../../../../../../services/banque-service/BanqueService";
import {ConfirmationDialogService} from "../../../../../../../services/confirmation-dialog/ConfirmationDialogService";
import {NgForm} from "@angular/forms";
import {Banque} from "../../../../../../models/banque-app/Banque";

@Component({
  selector: 'app-update-banque',
  templateUrl: './update-banque.component.html',
  styleUrls: ['./update-banque.component.css']
})
export class UpdateBanqueComponent {
  id_current_user:string;
  idSociete:any;
  idAgence:any;
  idBanque:any;

  abrege:string='';
  intitule:string='';
  interlocuteur:string='';
  codeBIC:string='';
  adresse:string='';
  code_postale:string='';
  ville:string='';
  pays:string='';
  telephone:string='';
  telecopie:string='';
  email:string='';
  site_internet:string='';

  constructor(private router:Router,private route:ActivatedRoute,private userService:UserService,private banqueService:BanqueService,private confirmationDialogService: ConfirmationDialogService) {
    this.id_current_user=userService.profile.id;
    this.idSociete = this.route.snapshot.params['idSociete'];
    this.idAgence = this.route.snapshot.params['idAgence'];
    this.idBanque = this.route.snapshot.params['idBanque'];
    console.log("banque : ",this.idBanque)
    this.getBanque(this.idBanque);
  }
  getBanque(id){
    this.banqueService.banqueById(id).subscribe(banque => {
      this.abrege=banque["abrege"]
      this.intitule=banque["intitule"]
      this.interlocuteur=banque["interlocuteur"]
      this.codeBIC=banque["codeBIC"]
      this.adresse=banque["adresse"]
      this.code_postale=banque["code_postale"]
      this.ville=banque["ville"]
      this.pays=banque["pays"]
      this.telephone=banque["telephone"]
      this.telecopie=banque["telecopie"]
      this.email=banque["email"]
      this.site_internet=banque["site_internet"]
    });
  }
  updateBanque(updateBanqueForm:NgForm){
    var banque=new Banque(updateBanqueForm.value.abrege,updateBanqueForm.value.intitule,updateBanqueForm.value.interlocuteur,
      updateBanqueForm.value.codeBIC,updateBanqueForm.value.adresse,updateBanqueForm.value.code_postale,
      updateBanqueForm.value.ville,updateBanqueForm.value.pays,updateBanqueForm.value.telephone,updateBanqueForm.value.telecopie,
      updateBanqueForm.value.email,updateBanqueForm.value.site_internet,this.idAgence);
    this.banqueService.modifierBanque(this.idBanque,banque)
    this.router.navigate(['../utilisateur/traitement',this.idSociete,'plan-comptable',this.idSociete,'banque', this.idSociete,'details-agence',this.idAgence,this.idSociete]);

  }
}
