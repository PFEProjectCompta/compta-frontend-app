import {Component, ElementRef, ViewChild} from '@angular/core';
import {UserService} from "../../../services/office-service/UserService";
import {Router} from "@angular/router";
import {ConfirmationDialogService} from "../../../services/confirmation-dialog/ConfirmationDialogService";
import {SharedService} from "../../../shared/shared.service";
import {HttpClient} from "@angular/common/http";
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from "@angular/material/table";

interface ConfirmationDialogData {
  title: string;
  message: string;
}

@Component({
  selector: 'app-societe',
  templateUrl: './societe.component.html',
  styleUrls: ['./societe.component.css']
})
export class SocieteComponent {
  inputValue: string = ''
  displayedColumns: string[] = ['raison_social', 'activite', 'adresse', 'ville', 'capital', 'telephone', 'email', 'action'];
  id_user_courrant: string;
  dataSource: any[];
  inputElement: any;
  dataSourceBackup: MatTableDataSource<any>;
  dataS: MatTableDataSource<any>;
  @ViewChild('paginator') paginator: MatPaginator;

  constructor(private http: HttpClient, public sharedService: SharedService, private userService: UserService, private router: Router, private confirmationDialogService: ConfirmationDialogService) {
    this.id_user_courrant = userService.profile.id;
    this.userService.loadSocietes(this.id_user_courrant).subscribe(societes => {
      this.dataSource = societes;
      this.dataS = new MatTableDataSource(this.dataSource);
      this.dataS.paginator = this.paginator;
    });
  }


  remove(id) {
    const confirmationData: ConfirmationDialogData = {
      title: 'Confirmation',
      message: 'Est-ce-que vous êtes sur?',
    };
    this.confirmationDialogService.openConfirmationDialog(confirmationData)
      .then(result => {
        if (result) {
          this.userService.deleteSociete(id)
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
  @ViewChild('searchInputRef', {static: false}) searchInputRef!: ElementRef;
  filterItems() {
    this.inputElement = this.searchInputRef.nativeElement as HTMLInputElement;
    this.dataSourceBackup = new MatTableDataSource<any>(
      this.dataSource.filter(user =>
        user.raison_social.toLowerCase().includes(this.inputElement.value.toLowerCase()) || user.ville.toLowerCase().includes(this.inputElement.value.toLowerCase()) || user.pays.toLowerCase().includes(this.inputElement.value.toLowerCase())
      )
    )
    this.dataSourceBackup.paginator = this.paginator;
  }
}
