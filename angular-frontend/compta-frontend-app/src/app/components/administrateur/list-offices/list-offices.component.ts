import {Component, ElementRef, ViewChild,Inject} from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import {AdminService} from "../../../services/office-service/AdminService";
import {Bureau} from "../../models/office-app/Bureau";
import {ActivatedRoute, Router} from "@angular/router";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {ConfirmationDialogService} from "../../../services/confirmation-dialog/ConfirmationDialogService";
// import {ConfirmationDialogData} from "../../confirmation-dialog-component"

interface ConfirmationDialogData {
  title: string;
  message: string;
}
@Component({
  selector: 'app-list-offices',
  templateUrl: './list-offices.component.html',
  styleUrls: ['./list-offices.component.css']
})
export class ListOfficesComponent {
  displayedColumns2: string[] = ['nom', 'email', 'adresse', 'numero_tele','ville','paye','action'];
  dataSourceBureaux:any[];
  id:string;
  inputElement: any;
  dataSourceBackup: any[];
  constructor(private adminService:AdminService,private route:Router,private confirmationDialogService: ConfirmationDialogService) {
    this.id = adminService.profile.id;
    this.loadBureaux();

  }

  loadBureaux(){
    console.log("Lolo")
    this.adminService.getBureaux(this.id).subscribe(bureaux => {
      console.log(bureaux)
      this.dataSourceBureaux=bureaux;
    });
  }

  removeBureau(id){
    const confirmationData: ConfirmationDialogData = {
      title: 'Confirmation',
      message: 'Est-ce-que vous êtes sur?',
    };
    this.confirmationDialogService.openConfirmationDialog(confirmationData)
      .then(result => {
        if (result) {
          this.adminService.removeBureau(id);
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
    console.log("search : ", this.inputElement.value);
    this.dataSourceBackup = this.dataSourceBureaux.filter(user =>
      user.nom.toLowerCase().includes(this.inputElement.value.toLowerCase()) || user.ville.toLowerCase().includes(this.inputElement.value.toLowerCase()) || user.paye.toLowerCase().includes(this.inputElement.value.toLowerCase())
    );
    console.log(this.dataSourceBackup)
  }
}
