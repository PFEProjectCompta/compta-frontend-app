import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {UserService} from "../../../services/office-service/UserService";
import {Router, NavigationEnd} from "@angular/router";
import {filter} from 'rxjs/operators';
import {ConfirmationDialogService} from "../../../services/confirmation-dialog/ConfirmationDialogService";
import {SharedService} from "../../../shared/shared.service";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
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
  dataSourceBackup: any[];

  constructor(private http: HttpClient, public sharedService: SharedService, private userService: UserService, private router: Router, private confirmationDialogService: ConfirmationDialogService) {
    this.id_user_courrant = userService.profile.id;
    this.userService.loadSocietes(this.id_user_courrant).subscribe(societes => {
      this.dataSource = societes;
    });
  }

  details() {

  }

  update() {

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
    this.dataSourceBackup = this.dataSource.filter(user =>
      user.raison_social.toLowerCase().includes(this.inputElement.value.toLowerCase()) || user.ville.toLowerCase().includes(this.inputElement.value.toLowerCase()) || user.pays.toLowerCase().includes(this.inputElement.value.toLowerCase())
    );
  }

}
