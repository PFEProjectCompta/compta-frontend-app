import {Component, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {ActivatedRoute, Router} from "@angular/router";
import {PlanComptableService} from "../../../../../services/plan-service/PlanComptableService";
import {NgForm} from "@angular/forms";
import {UserService} from "../../../../../services/office-service/UserService";
import {PlanComptable} from "../../../../models/plan-comptable-app/PlanComptable";
import {PlanComptableDTO} from "../../../../models/plan-comptable-app/PlanComptableDTO";
import {ConfirmationDialogService} from "../../../../../services/confirmation-dialog/ConfirmationDialogService";

@Component({
  selector: 'app-update-plan-comptable',
  templateUrl: './update-plan-comptable.component.html',
  styleUrls: ['./update-plan-comptable.component.css']
})
export class UpdatePlanComptableComponent {
  id_current_user:string;
  idSociete:any;
  idPlanComptebleElement:any;
  numeroCompte:string='';
  intitule:string='';
  compteGeneral:string='';
  dataSourceComptesGeneraux: any[];
  constructor(private router:Router,private route:ActivatedRoute,private planComptableService:PlanComptableService,private userService:UserService) {
    this.id_current_user=planComptableService.profile.id;
    this.idSociete = this.route.snapshot.params['idSociete'];
    this.idPlanComptebleElement = this.route.snapshot.params['idPlanComptableElement'];
    this.userService.getCompteGenerauxSociete(this.idSociete).subscribe(comptes => {
      this.dataSourceComptesGeneraux=comptes;
    });
    this.getPlanComptableElement(this.idPlanComptebleElement)
  }
  getPlanComptableElement(id){
    this.planComptableService.getPlanCompatbleElementById(id).subscribe(planItem => {
      this.numeroCompte=planItem['numeroCompte']
      this.intitule=planItem["intitule"]
      this.compteGeneral=planItem['compteGeneral'].id
    });
  }
  updatePlanComptable(updatePlanComptableForm:NgForm){
    var planComptable=new PlanComptableDTO(updatePlanComptableForm.value.numeroCompte,updatePlanComptableForm.value.intitule,updatePlanComptableForm.value.compteGeneral)
    this.planComptableService.updatePlanComptableElement(this.idPlanComptebleElement,planComptable)
    this.router.navigate(['../utilisateur/traitement',this.idSociete,'plan-comptable',this.idSociete]);
  }

}
