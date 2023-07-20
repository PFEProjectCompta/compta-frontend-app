import {Component, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../../../../../../services/office-service/UserService";
import {BanqueService} from "../../../../../../../services/banque-service/BanqueService";
import {ConfirmationDialogService} from "../../../../../../../services/confirmation-dialog/ConfirmationDialogService";
import {NgForm} from "@angular/forms";
import {Banque} from "../../../../../../models/banque-app/Banque";

@Component({
  selector: 'app-add-banque',
  templateUrl: './add-banque.component.html',
  styleUrls: ['./add-banque.component.css']
})
export class AddBanqueComponent {
  id_current_user:string;
  idSociete:any;
  idAgence:any;

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
  }

  addBanque(addBanqueForm:NgForm){
    var banque=new Banque(addBanqueForm.value.abrege,addBanqueForm.value.intitule,addBanqueForm.value.interlocuteur,
      addBanqueForm.value.codeBIC,addBanqueForm.value.adresse,addBanqueForm.value.code_postale,
      addBanqueForm.value.ville,addBanqueForm.value.pays,addBanqueForm.value.telephone,addBanqueForm.value.telecopie,
      addBanqueForm.value.email,addBanqueForm.value.site_internet,this.idAgence);
    this.banqueService.ajouterBanque(banque)
    this.router.navigate(['../utilisateur/traitement',this.idSociete,'plan-comptable',this.idSociete,'banque', this.idSociete,'details-agence',this.idAgence,this.idSociete]);

  }
}
