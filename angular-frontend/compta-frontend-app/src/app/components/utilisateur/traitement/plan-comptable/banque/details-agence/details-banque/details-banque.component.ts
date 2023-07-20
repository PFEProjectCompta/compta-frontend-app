import { Component } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../../../../../../services/office-service/UserService";
import {BanqueService} from "../../../../../../../services/banque-service/BanqueService";
import {ConfirmationDialogService} from "../../../../../../../services/confirmation-dialog/ConfirmationDialogService";

@Component({
  selector: 'app-details-banque',
  templateUrl: './details-banque.component.html',
  styleUrls: ['./details-banque.component.css']
})
export class DetailsBanqueComponent {
  id_current_user:string;
  idSociete:any;
  idAgence:any;
  idBanque:any;

  constructor(private router:Router,private route:ActivatedRoute,private userService:UserService,private banqueService:BanqueService,private confirmationDialogService: ConfirmationDialogService) {
    this.id_current_user=userService.profile.id;
    this.idSociete = this.route.snapshot.params['idSociete'];
    this.idAgence = this.route.snapshot.params['idAgence'];
    this.idBanque = this.route.snapshot.params['idBanque'];
  }

  compteBancaire(){
    this.router.navigate(['../utilisateur/traitement',this.idSociete,'plan-comptable',this.idSociete,'banque', this.idSociete,'details-agence',this.idAgence,this.idSociete,'details-banque',this.idBanque,this.idAgence,this.idSociete,'compte-banciaire',this.idBanque,this.idAgence,this.idSociete]);
  }
  contacts(){
    this.router.navigate(['../utilisateur/traitement',this.idSociete,'plan-comptable',this.idSociete,'banque', this.idSociete,'details-agence',this.idAgence,this.idSociete,'details-banque',this.idBanque,this.idAgence,this.idSociete,'contact',this.idBanque,this.idAgence,this.idSociete]);

  }
}
