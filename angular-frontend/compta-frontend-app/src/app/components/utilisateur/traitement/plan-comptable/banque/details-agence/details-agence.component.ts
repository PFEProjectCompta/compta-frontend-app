import {Component, ElementRef, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../../../../../services/office-service/UserService";
import {BanqueService} from "../../../../../../services/banque-service/BanqueService";
import {ConfirmationDialogService} from "../../../../../../services/confirmation-dialog/ConfirmationDialogService";
interface ConfirmationDialogData {
  title: string;
  message: string;
}
@Component({
  selector: 'app-details-agence',
  templateUrl: './details-agence.component.html',
  styleUrls: ['./details-agence.component.css']
})
export class DetailsAgenceComponent {
  id_current_user:string;
  idSociete:any;
  idAgence:any;
  displayedColumns: string[] = ['abrege', 'intitule', 'telephone','adresse','email','action'];
  dataSource: any[];
  inputElement: any;
  dataSourceBackup: MatTableDataSource<any>;
  dataS:MatTableDataSource<any>;
  @ViewChild('paginator') paginator:MatPaginator;
  constructor(private router:Router,private route:ActivatedRoute,private userService:UserService,private banqueService:BanqueService,private confirmationDialogService: ConfirmationDialogService) {
    this.id_current_user=userService.profile.id;
    this.idSociete = this.route.snapshot.params['idSociete'];
    this.idAgence = this.route.snapshot.params['idAgence'];
    this.banqueService.loadBanque(this.idAgence).subscribe(banques => {
      this.dataSource=banques;
      this.dataS=new MatTableDataSource(this.dataSource);
      this.dataS.paginator=this.paginator;
    });

  }

  @ViewChild('searchInputRef', {static: false}) searchInputRef!: ElementRef;
  filterItems() {
    this.inputElement = this.searchInputRef.nativeElement as HTMLInputElement;
    this.dataSourceBackup = new MatTableDataSource<any>(
      this.dataSource.filter(user =>
        user.nom.toLowerCase().includes(this.inputElement.value.toLowerCase()) || user.ville.toLowerCase().includes(this.inputElement.value.toLowerCase())
      )
    )
    this.dataSourceBackup.paginator=this.paginator;
  }
  remove(id){


    const confirmationData: ConfirmationDialogData = {
      title: 'Confirmation',
      message: 'Est-ce-que vous êtes sur?',
    };
    this.confirmationDialogService.openConfirmationDialog(confirmationData)
      .then(result => {
        if (result) {
          this.banqueService.supprimerBanque(id);
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
  retourner(){
    this.router.navigate(['../utilisateur/traitement',this.idSociete,'plan-comptable',this.idSociete,'banque', this.idSociete]);
  }
  detailsBanque(id){
    this.router.navigate(['../utilisateur/traitement',this.idSociete,'plan-comptable',this.idSociete,'banque', this.idSociete,'details-agence',this.idAgence,this.idSociete,'details-banque',id,this.idAgence,this.idSociete,'compte-banciaire',id,this.idAgence,this.idSociete]);
  }
}
