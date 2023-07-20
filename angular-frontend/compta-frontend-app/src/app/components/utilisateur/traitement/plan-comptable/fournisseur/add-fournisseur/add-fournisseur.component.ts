import { Component } from '@angular/core';
import {FormControl, NgForm} from "@angular/forms";
import {Observable, startWith} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {PlanComptableService} from "../../../../../../services/plan-service/PlanComptableService";
import {CompteTiersService} from "../../../../../../services/comptes-tiers/CompteTiersService";
import {map} from "rxjs/operators";
import {Fournisseur} from "../../../../../models/compte-tiers/Fournisseur";

@Component({
  selector: 'app-add-fournisseur',
  templateUrl: './add-fournisseur.component.html',
  styleUrls: ['./add-fournisseur.component.css']
})
export class AddFournisseurComponent {
  id_current_user:string;
  idSociete:any;

  nom:string='';
  prenom:string='';
  email:string='';
  adresse:string='';
  ville:string='';
  pays:string='';
  telephone:string='';
  planComptableElementId:string=''

  planComptable:any[]=[];
  planCtrl = new FormControl();
  planFilterCtrl = new FormControl();
  filteredPlan: Observable<any[]>;
  constructor(private router:Router,private route:ActivatedRoute,private planComptableService:PlanComptableService,private compteTiersService:CompteTiersService) {
    this.id_current_user=compteTiersService.profile.id;
    this.idSociete = this.route.snapshot.params['idSociete'];

    this.planComptableService.loadPlanComptable(this.idSociete).subscribe(planComptable => {
      this.planComptable=planComptable;
    });
    this.filteredPlan = this.planFilterCtrl.valueChanges
      .pipe(
        startWith(''),
        map(planName => this.filterPlan(planName))
      );
  }
  filterPlan(planName: string) {
    return this.planComptable.filter(plan =>
      plan.numeroCompte.toLowerCase().includes(planName.toLowerCase()) || plan.intitule.toLowerCase().includes(planName.toLowerCase())
    );
  }
  addFournisseur(addfournisseurForm:NgForm){
    var fournisseur=new Fournisseur(addfournisseurForm.value.nom,addfournisseurForm.value.prenom,addfournisseurForm.value.email,
      addfournisseurForm.value.adresse,addfournisseurForm.value.ville,addfournisseurForm.value.pays,
      addfournisseurForm.value.telephone,this.idSociete,addfournisseurForm.value.planComptableElementId.id)
    this.compteTiersService.ajouterFournisseur(fournisseur);
    this.router.navigate(['../utilisateur/traitement',this.idSociete,'plan-comptable',this.idSociete,'fournisseur',this.idSociete]);
  }
}
