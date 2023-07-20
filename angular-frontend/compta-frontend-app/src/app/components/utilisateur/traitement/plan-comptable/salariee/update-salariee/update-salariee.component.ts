import { Component } from '@angular/core';
import {FormControl, NgForm} from "@angular/forms";
import {Observable, startWith} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {PlanComptableService} from "../../../../../../services/plan-service/PlanComptableService";
import {CompteTiersService} from "../../../../../../services/comptes-tiers/CompteTiersService";
import {map} from "rxjs/operators";
import {Salariee} from "../../../../../models/compte-tiers/Salariee";

@Component({
  selector: 'app-update-salariee',
  templateUrl: './update-salariee.component.html',
  styleUrls: ['./update-salariee.component.css']
})
export class UpdateSalarieeComponent {
  id_current_user:string;
  idSociete:any;
  idSalariee:any;
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
    this.idSalariee = this.route.snapshot.params['idSalariee'];
    this.planComptableService.loadPlanComptable(this.idSociete).subscribe(planComptable => {
      this.planComptable=planComptable;
    });
    this.filteredPlan = this.planFilterCtrl.valueChanges
      .pipe(
        startWith(''),
        map(planName => this.filterPlan(planName))
      );
    this.getSalarieeById(this.idSalariee)
  }
  filterPlan(planName: string) {
    return this.planComptable.filter(plan =>
      plan.numeroCompte.toLowerCase().includes(planName.toLowerCase()) || plan.intitule.toLowerCase().includes(planName.toLowerCase())
    );
  }
  getSalarieeById(id){
    this.compteTiersService.salarieById(id).subscribe(banque => {
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
  updateSalariee(updateSalarieeForm:NgForm){
    var salariee=new Salariee(updateSalarieeForm.value.nom,updateSalarieeForm.value.prenom,updateSalarieeForm.value.email,
      updateSalarieeForm.value.adresse,updateSalarieeForm.value.ville,updateSalarieeForm.value.pays,
      updateSalarieeForm.value.telephone,this.idSociete,updateSalarieeForm.value.planComptableElementId.id)
    this.compteTiersService.modifierSalariee(this.idSalariee,salariee);
    this.router.navigate(['../utilisateur/traitement',this.idSociete,'plan-comptable',this.idSociete,'salariee',this.idSociete]);

  }
}
