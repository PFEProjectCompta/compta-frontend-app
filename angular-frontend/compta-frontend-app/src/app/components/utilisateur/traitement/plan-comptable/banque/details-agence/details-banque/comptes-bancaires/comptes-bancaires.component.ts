import {Component, ElementRef, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../../../../../../../services/office-service/UserService";
import {BanqueService} from "../../../../../../../../services/banque-service/BanqueService";
import {
  ConfirmationDialogService
} from "../../../../../../../../services/confirmation-dialog/ConfirmationDialogService";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {PlanComptableService} from "../../../../../../../../services/plan-service/PlanComptableService";

interface ConfirmationDialogData {
  title: string;
  message: string;
}

@Component({
  selector: 'app-comptes-bancaires',
  templateUrl: './comptes-bancaires.component.html',
  styleUrls: ['./comptes-bancaires.component.css']
})
export class ComptesBancairesComponent {
  id_current_user: string;
  idSociete: any;
  idAgence: any;
  idBanque: any;

  displayedColumns: string[] = ['abrege', 'devise', 'structure', 'planComptableElement', 'num_compte', 'num_guichet', 'action'];
  dataSource: any[];
  inputElement: any;
  dataSourceBackup: MatTableDataSource<any>;
  dataS: MatTableDataSource<any>;
  @ViewChild('paginator') paginator: MatPaginator;

  constructor(private router: Router, private route: ActivatedRoute, private planComptableService: PlanComptableService, private banqueService: BanqueService, private confirmationDialogService: ConfirmationDialogService) {
    this.id_current_user = planComptableService.profile.id;
    this.idSociete = this.route.snapshot.params['idSociete'];
    this.idAgence = this.route.snapshot.params['idAgence'];
    this.idBanque = this.route.snapshot.params['idBanque'];
    this.banqueService.loadCompteBancaire(this.idBanque).subscribe(comptes => {
      this.dataSource = comptes;
      this.dataS = new MatTableDataSource(this.dataSource);
      this.dataS.paginator = this.paginator;
    });
  }


  @ViewChild('searchInputRef', {static: false}) searchInputRef!: ElementRef;

  filterItems() {
    this.inputElement = this.searchInputRef.nativeElement as HTMLInputElement;
    this.dataSourceBackup = new MatTableDataSource<any>(
      this.dataSource.filter(user =>
        user.abrege.toLowerCase().includes(this.inputElement.value.toLowerCase()) || user.planComptableElement.numeroCompte.toLowerCase().includes(this.inputElement.value.toLowerCase())
      )
    )
    this.dataSourceBackup.paginator = this.paginator;
  }

  remove(id) {
    const confirmationData: ConfirmationDialogData = {
      title: 'Confirmation',
      message: 'Est-ce-que vous êtes sur?',
    };
    this.confirmationDialogService.openConfirmationDialog(confirmationData)
      .then(result => {
        if (result) {
          this.banqueService.supprimerCompteBancaire(id);
          location.reload();
        } else {
          console.log('Cancelled');
        }
      })
      .catch(error => {
        // Handle any errors that occurred during dialog interaction
        console.error('Confirmation dialog error:', error);
      });
  }

  retourner() {
    this.router.navigate(['../utilisateur/traitement', this.idSociete, 'plan-comptable', this.idSociete, 'banque', this.idSociete, 'details-agence', this.idAgence, this.idSociete]);
  }
}
