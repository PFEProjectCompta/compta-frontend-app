import { Component } from '@angular/core';
import {FormControl, NgForm} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {PlanComptableService} from "../../../../../../../../../services/plan-service/PlanComptableService";
import {BanqueService} from "../../../../../../../../../services/banque-service/BanqueService";
import {Observable, startWith} from "rxjs";
import {map} from "rxjs/operators";
import {CompteBancaire} from "../../../../../../../../models/banque-app/CompteBancaire";

@Component({
  selector: 'app-update-compte-bancaire',
  templateUrl: './update-compte-bancaire.component.html',
  styleUrls: ['./update-compte-bancaire.component.css']
})
export class UpdateCompteBancaireComponent {

  id_current_user:string;
  idSociete:any;
  idAgence:any;
  idBanque:any;
  idCompteBancaire:any;
  abrege:string='';
  devise:string='';
  pays:string='';
  structure:string='';
  num_compte:string='';
  num_guichet:string='';
  planComptableElementId:string='';

  planComptable:any[]=[];
  planCtrl = new FormControl();
  planFilterCtrl = new FormControl();
  filteredPlan: Observable<any[]>;


  constructor(private router:Router,private route:ActivatedRoute,private planComptableService:PlanComptableService,private banqueService:BanqueService) {
    this.id_current_user=banqueService.profile.id;
    this.idSociete = this.route.snapshot.params['idSociete'];
    this.idAgence = this.route.snapshot.params['idAgence'];
    this.idBanque = this.route.snapshot.params['idBanque'];
    this.idCompteBancaire=this.route.snapshot.params['idCompteBancaire'];
    this.planComptableService.loadPlanComptable(this.idSociete).subscribe(planComptable => {
      this.planComptable=planComptable;
    });
    this.filteredPlan = this.planFilterCtrl.valueChanges
      .pipe(
        startWith(''),
        map(planName => this.filterPlan(planName))
      );

    this.getCompteBancaireById(this.idCompteBancaire)
  }
  getCompteBancaireById(id){
    this.banqueService.compteBancaireById(id).subscribe(banque => {
      this.abrege=banque["abrege"]
      this.devise=banque["devise"]
      this.pays=banque["pays"]
      this.structure=banque["structure"]
      this.num_compte=banque["num_compte"]
      this.num_guichet=banque["num_guichet"]
      this.planComptableElementId=banque["planComptableElement"].numeroCompte+' - '+banque["planComptableElement"].intitule
    });
  }
  filterPlan(planName: string) {
    return this.planComptable.filter(plan =>
      plan.numeroCompte.toLowerCase().includes(planName.toLowerCase()) || plan.intitule.toLowerCase().includes(planName.toLowerCase())
    );
  }
  updateCompteBancaire(updateCompteBancaireForm:NgForm){
    var compteBancaire= new CompteBancaire(updateCompteBancaireForm.value.abrege,updateCompteBancaireForm.value.devise,updateCompteBancaireForm.value.pays,
      updateCompteBancaireForm.value.structure,updateCompteBancaireForm.value.num_compte,updateCompteBancaireForm.value.num_guichet,
      this.idBanque,updateCompteBancaireForm.value.planComptableElementId.id)
    this.banqueService.modifierCompteBancaire(this.idCompteBancaire,compteBancaire);
    this.router.navigate(['../utilisateur/traitement',this.idSociete,'plan-comptable',this.idSociete,'banque', this.idSociete,'details-agence',this.idAgence,this.idSociete,'details-banque',this.idBanque,this.idAgence,this.idSociete,'compte-banciaire',this.idBanque,this.idAgence,this.idSociete]);

  }
}
