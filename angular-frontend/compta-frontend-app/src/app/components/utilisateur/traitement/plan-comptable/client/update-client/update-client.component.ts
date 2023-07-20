import { Component } from '@angular/core';
import {FormControl, NgForm} from "@angular/forms";
import {Observable, startWith} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {PlanComptableService} from "../../../../../../services/plan-service/PlanComptableService";
import {CompteTiersService} from "../../../../../../services/comptes-tiers/CompteTiersService";
import {map} from "rxjs/operators";
import {Client} from "../../../../../models/compte-tiers/Client";

@Component({
  selector: 'app-update-client',
  templateUrl: './update-client.component.html',
  styleUrls: ['./update-client.component.css']
})
export class UpdateClientComponent {
  id_current_user:string;
  idSociete:any;
  idClient:any;
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
    this.idClient = this.route.snapshot.params['idClient'];
    this.planComptableService.loadPlanComptable(this.idSociete).subscribe(planComptable => {
      this.planComptable=planComptable;
    });
    this.filteredPlan = this.planFilterCtrl.valueChanges
      .pipe(
        startWith(''),
        map(planName => this.filterPlan(planName))
      );
    this.getClientById(this.idClient)
  }
  filterPlan(planName: string) {
    return this.planComptable.filter(plan =>
      plan.numeroCompte.toLowerCase().includes(planName.toLowerCase()) || plan.intitule.toLowerCase().includes(planName.toLowerCase())
    );
  }
  getClientById(id){
    this.compteTiersService.cltById(id).subscribe(banque => {
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
  updateClient(updateClientForm:NgForm){
    var client=new Client(updateClientForm.value.nom,updateClientForm.value.prenom,updateClientForm.value.email,
      updateClientForm.value.adresse,updateClientForm.value.ville,updateClientForm.value.pays,
      updateClientForm.value.telephone,this.idSociete,updateClientForm.value.planComptableElementId.id)
    this.compteTiersService.modifierClient(this.idClient,client);
    this.router.navigate(['../utilisateur/traitement',this.idSociete,'plan-comptable',this.idSociete,'client',this.idSociete]);

  }
}
