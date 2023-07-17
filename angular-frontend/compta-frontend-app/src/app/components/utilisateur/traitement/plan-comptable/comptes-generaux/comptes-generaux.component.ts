import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../../../../services/office-service/UserService";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";

@Component({
  selector: 'app-comptes-generaux',
  templateUrl: './comptes-generaux.component.html',
  styleUrls: ['./comptes-generaux.component.css']
})
export class ComptesGenerauxComponent {
  id_current_user:string;
  idSociete:any;
  displayedColumns: string[] = ['natureCompte', 'debutFaurchette', 'finFaurchette','modifier'];
  dataSource: any[];
  inputElement: any;
  dataSourceBackup: MatTableDataSource<any>;
  dataS:MatTableDataSource<any>;
  @ViewChild('paginator') paginator:MatPaginator;
  constructor(private router:Router,private route:ActivatedRoute,private userService:UserService) {
    this.id_current_user=userService.profile.id;
    this.idSociete = this.route.snapshot.params['idSociete'];
    this.userService.getCompteGenerauxSociete(this.idSociete).subscribe(comptes => {
      this.dataSource=comptes;
      this.dataS=new MatTableDataSource(this.dataSource);
      this.dataS.paginator=this.paginator;
    });
  }

  @ViewChild('searchInputRef', {static: false}) searchInputRef!: ElementRef;

  filterItems() {
    this.inputElement = this.searchInputRef.nativeElement as HTMLInputElement;
    this.dataSourceBackup = new MatTableDataSource<any>(
      this.dataSource.filter(user =>
        user.natureCompte.toLowerCase().includes(this.inputElement.value.toLowerCase()) || user.debutFaurchette.toLowerCase().includes(this.inputElement.value.toLowerCase())
      )
    )
    this.dataSourceBackup.paginator=this.paginator;
  }


}
