import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {GET_ADMINE, GET_USERNAME} from "../../graphql/queries.graphql";
import {Subscription} from "rxjs";
import {Apollo} from "apollo-angular";
import {AdminService} from "../../services/office-service/AdminService";
import {KeycloakService} from "keycloak-angular";
import {Router} from "@angular/router";
import {BureauAdminService} from "../../services/office-service/BureauAdminService";
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from "@angular/material/table";



@Component({
  selector: 'app-security',
  templateUrl: './security.component.html',
  styleUrls: ['./security.component.css']
  })
export class SecurityComponent implements OnInit{
  displayedColumns: string[] = ['id','userName','email','roles','firstname','lastName','AddRole'];
  dataSource: any[];
  loading: boolean;
  admins: any;


  userId: string;
  username:string;
  inputElement: any;
  dataSourceBackup: MatTableDataSource<any>;
  dataS:MatTableDataSource<any>;
  @ViewChild('paginator') paginator:MatPaginator;

  constructor(private keycloakService: KeycloakService, private apollo:Apollo, private adminService:AdminService, private router:Router) {

    this.adminService.loadAdminsToSuperAdmin().subscribe(admins => {
      console.log(admins);
      this.dataSource=admins.filter(admin=>admin.id!='2dbabe35-9b35-4687-8d5e-782680c025d2');
      this.dataS=new MatTableDataSource(this.dataSource);
      this.dataS.paginator=this.paginator;
    });
  }


  // loadAdmins():void{
  //   this.querySubscription = this.apollo.use("admins")
  //     .watchQuery<any>({
  //       query: GET_ADMINE,
  //     })
  //     .valueChanges.subscribe(({ data, loading }) => {
  //       this.loading = loading;
  //       this.dataSource = data.searchAll;
  //     });
  // }

  ngOnInit(): void {

  }

  addRole(id,nom,prenom,email){
    this.adminService.addRoleAdmin(id);
    this.adminService.addAdministrateur(id,nom,prenom,email)
    // this.bureauAdminService.addAdministrateur(id);
    location.reload()
  }
  removeRole(id){
    this.adminService.removeRoleAdmin(id);
    this.adminService.removeAdministrateur(id);
    location.reload()
  }


  @ViewChild('searchInputRef', {static: false}) searchInputRef!: ElementRef;

  filterItems() {
    this.inputElement = this.searchInputRef.nativeElement as HTMLInputElement;
    this.dataSourceBackup = new MatTableDataSource<any>(
      this.dataSource.filter(user =>
        user.userName.toLowerCase().includes(this.inputElement.value.toLowerCase())
      )
    )
    this.dataSourceBackup.paginator=this.paginator;
    console.log("wa hano: ",this.dataSourceBackup)
  }
}
