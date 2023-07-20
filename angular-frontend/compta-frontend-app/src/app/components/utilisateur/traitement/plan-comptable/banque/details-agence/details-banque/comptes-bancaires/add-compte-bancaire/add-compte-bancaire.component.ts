import { Component } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../../../../../../../../services/office-service/UserService";
import {BanqueService} from "../../../../../../../../../services/banque-service/BanqueService";
import {
  ConfirmationDialogService
} from "../../../../../../../../../services/confirmation-dialog/ConfirmationDialogService";
import {MatTableDataSource} from "@angular/material/table";
import {PlanComptableService} from "../../../../../../../../../services/plan-service/PlanComptableService";
import {NgForm} from "@angular/forms";
import { FormControl } from '@angular/forms';
import {Observable, startWith} from 'rxjs';
import {map} from "rxjs/operators";
import {CompteBancaire} from "../../../../../../../../models/banque-app/CompteBancaire";
@Component({
  selector: 'app-add-compte-bancaire',
  templateUrl: './add-compte-bancaire.component.html',
  styleUrls: ['./add-compte-bancaire.component.css']
})
export class AddCompteBancaireComponent {
  id_current_user:string;
  idSociete:any;
  idAgence:any;
  idBanque:any;

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

  bankCtrl = new FormControl();
  bankFilterCtrl = new FormControl();
  filteredBanks: Observable<any[]>;

  banks = [
    { name: 'Bank 1' },
    { name: 'Bank 2' },
    // Add more banks as needed...
  ];
  constructor(private router:Router,private route:ActivatedRoute,private planComptableService:PlanComptableService,private banqueService:BanqueService) {
    this.id_current_user=banqueService.profile.id;
    this.idSociete = this.route.snapshot.params['idSociete'];
    this.idAgence = this.route.snapshot.params['idAgence'];
    this.idBanque = this.route.snapshot.params['idBanque'];
    this.planComptableService.loadPlanComptable(this.idSociete).subscribe(planComptable => {
      this.planComptable=planComptable;
    });

    this.filteredBanks = this.bankFilterCtrl.valueChanges
      .pipe(
        startWith(''),
        map(bankName => this.filterBanks(bankName))
      );

    this.filteredPlan = this.planFilterCtrl.valueChanges
      .pipe(
        startWith(''),
        map(planName => this.filterPlan(planName))
      );

  }
  filterBanks(bankName: string) {
    return this.banks.filter(bank =>
      bank.name.toLowerCase().includes(bankName.toLowerCase())
    );
  }

  filterPlan(planName: string) {
    return this.planComptable.filter(plan =>
      plan.numeroCompte.toLowerCase().includes(planName.toLowerCase()) || plan.intitule.toLowerCase().includes(planName.toLowerCase())
    );
  }
  addCompteBancaire(addCompteBancaireForm:NgForm){
    var compteBancaire= new CompteBancaire(addCompteBancaireForm.value.abrege,addCompteBancaireForm.value.devise,addCompteBancaireForm.value.pays,
      addCompteBancaireForm.value.structure,addCompteBancaireForm.value.num_compte,addCompteBancaireForm.value.num_guichet,
      this.idBanque,addCompteBancaireForm.value.planComptableElementId.id)
    this.banqueService.ajouterCompteBanciare(compteBancaire);
    this.router.navigate(['../utilisateur/traitement',this.idSociete,'plan-comptable',this.idSociete,'banque', this.idSociete,'details-agence',this.idAgence,this.idSociete,'details-banque',this.idBanque,this.idAgence,this.idSociete,'compte-banciaire',this.idBanque,this.idAgence,this.idSociete]);
  }
}
