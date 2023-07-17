import {Component, ElementRef, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {HttpClient} from "@angular/common/http";
import {SharedService} from "../../../shared/shared.service";
import {UserService} from "../../../services/office-service/UserService";
import {Router} from "@angular/router";
import {ConfirmationDialogService} from "../../../services/confirmation-dialog/ConfirmationDialogService";

@Component({
  selector: 'app-list-shared-societe',
  templateUrl: './list-shared-societe.component.html',
  styleUrls: ['./list-shared-societe.component.css']
})
export class ListSharedSocieteComponent {
  inputValue: string = ''
  displayedColumns: string[] = ['raison_social', 'activite', 'adresse', 'ville', 'capital', 'telephone', 'email', 'action'];
  id_user_courrant: string;
  dataSource: any[];
  inputElement: any;
  dataSourceBackup: MatTableDataSource<any>;
  dataS:MatTableDataSource<any>;
  @ViewChild('paginator') paginator:MatPaginator;
  constructor(private http: HttpClient, public sharedService: SharedService, private userService: UserService, private router: Router, private confirmationDialogService: ConfirmationDialogService) {
    this.id_user_courrant = userService.profile.id;
    this.userService.getSocieteShared(this.id_user_courrant).subscribe(societes => {
      this.dataSource = societes;
      this.dataS=new MatTableDataSource(this.dataSource);
      this.dataS.paginator=this.paginator;
      console.log("kkk : ",societes)
    });

  }
  removeSharing(idSociete,idCreator){
    this.dataSource.forEach(mem=>{
      if(mem.createur.id===idCreator && mem.member.id===this.id_user_courrant && mem.societe.id===idSociete){
        this.userService.deleteMemberToSociete(mem.id)
      }
    })
    location.reload();
  }
  @ViewChild('searchInputRef', {static: false}) searchInputRef!: ElementRef;

  filterItems() {
    this.inputElement = this.searchInputRef.nativeElement as HTMLInputElement;
    this.dataSourceBackup = new MatTableDataSource<any>(
      this.dataSource.filter(user =>
        user.raison_social.toLowerCase().includes(this.inputElement.value.toLowerCase()) || user.ville.toLowerCase().includes(this.inputElement.value.toLowerCase()) || user.pays.toLowerCase().includes(this.inputElement.value.toLowerCase())
      )
    )
    this.dataSourceBackup.paginator=this.paginator;
  }
}
