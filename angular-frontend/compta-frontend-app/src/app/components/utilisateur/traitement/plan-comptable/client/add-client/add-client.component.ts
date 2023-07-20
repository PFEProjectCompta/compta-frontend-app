import { Component } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {PlanComptableService} from "../../../../../../services/plan-service/PlanComptableService";
import {BanqueService} from "../../../../../../services/banque-service/BanqueService";
import {FormControl, NgForm} from "@angular/forms";
import {Contact} from "../../../../../models/banque-app/Contact";
import {Client} from "../../../../../models/compte-tiers/Client";
import {Observable, startWith} from "rxjs";
import {map} from "rxjs/operators";
import {CompteTiersService} from "../../../../../../services/comptes-tiers/CompteTiersService";

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent {
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
  addClient(addClientForm:NgForm){
    var client=new Client(addClientForm.value.nom,addClientForm.value.prenom,addClientForm.value.email,
      addClientForm.value.adresse,addClientForm.value.ville,addClientForm.value.pays,
      addClientForm.value.telephone,this.idSociete,addClientForm.value.planComptableElementId.id)
    this.compteTiersService.ajouterClient(client);
    this.router.navigate(['../utilisateur/traitement',this.idSociete,'plan-comptable',this.idSociete,'client',this.idSociete]);

  }
}
