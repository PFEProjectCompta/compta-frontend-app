import {Component, ElementRef, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../../../../services/office-service/UserService";
import {CompteTiersService} from "../../../../../services/comptes-tiers/CompteTiersService";
import {ConfirmationDialogService} from "../../../../../services/confirmation-dialog/ConfirmationDialogService";
interface ConfirmationDialogData {
  title: string;
  message: string;
}
@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent {
  id_current_user:string;
  idSociete:any;
  displayedColumns: string[] = ['nom', 'prenom', 'email','adresse','ville','planComptableElement','action'];
  dataSource: any[];
  inputElement: any;
  dataSourceBackup: MatTableDataSource<any>;
  dataS:MatTableDataSource<any>;
  @ViewChild('paginator') paginator:MatPaginator;
  constructor(private router:Router,private route:ActivatedRoute,private compteTiersService: CompteTiersService,private confirmationDialogService: ConfirmationDialogService) {
    this.id_current_user=compteTiersService.profile.id;
    this.idSociete = this.route.snapshot.params['idSociete'];
    this.compteTiersService.loadClient(this.idSociete).subscribe(clients => {
      this.dataSource=clients;
      this.dataS=new MatTableDataSource(this.dataSource);
      this.dataS.paginator=this.paginator;
    });
  }

  @ViewChild('searchInputRef', {static: false}) searchInputRef!: ElementRef;

  filterItems() {
    this.inputElement = this.searchInputRef.nativeElement as HTMLInputElement;
    this.dataSourceBackup = new MatTableDataSource<any>(
      this.dataSource.filter(user =>
        user.nom.toLowerCase().includes(this.inputElement.value.toLowerCase()) || user.prenom.toLowerCase().includes(this.inputElement.value.toLowerCase())
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
          this.compteTiersService.supprimerClient(id)
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
    this.router.navigate(['../utilisateur/traitement',this.idSociete,'plan-comptable',this.idSociete]);
  }

}
