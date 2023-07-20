import { Component } from '@angular/core';
import {FormControl, NgForm} from "@angular/forms";
import {Observable, startWith} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {PlanComptableService} from "../../../../../../services/plan-service/PlanComptableService";
import {CompteTiersService} from "../../../../../../services/comptes-tiers/CompteTiersService";
import {map} from "rxjs/operators";
import {Fournisseur} from "../../../../../models/compte-tiers/Fournisseur";

@Component({
  selector: 'app-update-fournisseur',
  templateUrl: './update-fournisseur.component.html',
  styleUrls: ['./update-fournisseur.component.css']
})
export class UpdateFournisseurComponent {
  id_current_user:string;
  idSociete:any;
  idFournisseur:any;

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
    this.idFournisseur = this.route.snapshot.params['idFournisseur'];
    this.planComptableService.loadPlanComptable(this.idSociete).subscribe(planComptable => {
      this.planComptable=planComptable;
    });
    this.filteredPlan = this.planFilterCtrl.valueChanges
      .pipe(
        startWith(''),
        map(planName => this.filterPlan(planName))
      );
    this.getFournisseurById(this.idFournisseur)
  }
  filterPlan(planName: string) {
    return this.planComptable.filter(plan =>
      plan.numeroCompte.toLowerCase().includes(planName.toLowerCase()) || plan.intitule.toLowerCase().includes(planName.toLowerCase())
    );
  }
  getFournisseurById(id){
    this.compteTiersService.fourniyId(id).subscribe(banque => {
      this.nom=banque["nom"]
      this.prenom=banque["prenom"]
      this.email=banque["email"]
      this.adresse=banque["adresse"]
      this.ville=banque["ville"]
      this.pays=banque["pays"]
      this.telephone=banque["telephone"]
      this.planComptableElementId=banque["planComptableElement"].numeroCompte+' - '+banque["planComptableElement"].intitule
    });
  }
  updateFournisseur(updateFournisseurForm:NgForm){
    var fournisseur=new Fournisseur(updateFournisseurForm.value.nom,updateFournisseurForm.value.prenom,updateFournisseurForm.value.email,
      updateFournisseurForm.value.adresse,updateFournisseurForm.value.ville,updateFournisseurForm.value.pays,
      updateFournisseurForm.value.telephone,this.idSociete,updateFournisseurForm.value.planComptableElementId.id)
    this.compteTiersService.modifierFournisseur(this.idFournisseur,fournisseur);
    this.router.navigate(['../utilisateur/traitement',this.idSociete,'plan-comptable',this.idSociete,'fournisseur',this.idSociete]);

  }
}
