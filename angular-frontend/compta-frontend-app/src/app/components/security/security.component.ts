import {Component, OnInit} from '@angular/core';
import {GET_ADMINE, GET_USERNAME} from "../../graphql/queries.graphql";
import {Subscription} from "rxjs";
import {Apollo} from "apollo-angular";
import {AdminService} from "../../services/office-service/AdminService";
import {KeycloakService} from "keycloak-angular";
import {Router} from "@angular/router";
import {BureauAdminService} from "../../services/office-service/BureauAdminService";




@Component({
  selector: 'app-security',
  templateUrl: './security.component.html',
  styleUrls: ['./security.component.css']
  })
export class SecurityComponent implements OnInit{
  displayedColumns: string[] = ['id','userName','email','roles','firstname','lastName','AddRole'];
  dataSource: any[];

  private querySubscription:Subscription;
  loading: boolean;
  admins: any;


  userId: string;
  username:string;
  constructor(private keycloakService: KeycloakService, private apollo:Apollo, private adminService:AdminService, private router:Router) {
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
    this.adminService.loadAdminsToSuperAdmin().subscribe(admins => {
      console.log(admins);
      this.dataSource=admins.filter(admin=>admin.id!='2dbabe35-9b35-4687-8d5e-782680c025d2');
    });
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



}
