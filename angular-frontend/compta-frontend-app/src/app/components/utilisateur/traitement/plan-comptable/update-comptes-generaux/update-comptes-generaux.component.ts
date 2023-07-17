import { Component } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../../../../services/office-service/UserService";
import {NgForm} from "@angular/forms";
import {Societe} from "../../../../models/office-app/Societe";
import {CompteGeneral} from "../../../../models/plan-comptable-app/CompteGeneral";

@Component({
  selector: 'app-update-comptes-generaux',
  templateUrl: './update-comptes-generaux.component.html',
  styleUrls: ['./update-comptes-generaux.component.css']
})
export class UpdateComptesGenerauxComponent {
  id_current_user:string;
  idCompteGeneral:any;
  idSociete:any;
  natureCompte:string='';
  debutFaurchette:string='';
  finFaurchette:string='';
  constructor(private router:Router,private route:ActivatedRoute,private userService:UserService) {
    this.id_current_user=userService.profile.id;
    this.idCompteGeneral = this.route.snapshot.params['idCompteGeneral'];
    this.idSociete = this.route.snapshot.params['idSociete'];
    this.getCompteGeneral(this.idCompteGeneral);
  }
  getCompteGeneral(id){
    this.userService.getCompteGeneralById(id).subscribe(compte => {
      console.log("haniii : ",compte)
      this.natureCompte=compte['natureCompte']
      this.debutFaurchette=compte["debutFaurchette"]
      this.finFaurchette=compte["finFaurchette"]
    });
  }

  updateCompteGeneral(updateCompteGeneralForm:NgForm){
    var compteGeneral=  new CompteGeneral(updateCompteGeneralForm.value.natureCompte,updateCompteGeneralForm.value.debutFaurchette,updateCompteGeneralForm.value.finFaurchette)

    this.userService.updateCompteGeneral(this.idCompteGeneral,compteGeneral);

    // this.router.navigate(['../../plan-comptable',this.idSociete])
    this.router.navigate(['../utilisateur/traitement',this.idSociete,'plan-comptable',this.idSociete,'compte-generaux', this.idSociete], );
    //console.log("jojo: ", this.route.url)

  }
}
