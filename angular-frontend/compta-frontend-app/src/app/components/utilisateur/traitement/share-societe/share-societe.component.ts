import {Component, ElementRef, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {KeycloakService} from "keycloak-angular";
import {Apollo} from "apollo-angular";
import {AdminService} from "../../../../services/office-service/AdminService";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../../../services/office-service/UserService";

@Component({
  selector: 'app-share-societe',
  templateUrl: './share-societe.component.html',
  styleUrls: ['./share-societe.component.css']
})
export class ShareSocieteComponent {
  displayedColumns: string[] = ['userName', 'email', 'firstname', 'lastName', 'Partager'];
  dataSource: any[];
  loading: boolean;
  admins: any;
  users: any[];

  userId: string;
  username: string;
  inputElement: any;
  dataSourceBackup: MatTableDataSource<any>;
  dataS: MatTableDataSource<any>;
  societeMembers:any[];
  @ViewChild('paginator') paginator: MatPaginator;
  id_current_user:string;
  idSociete:any;
  constructor(private route:ActivatedRoute,private keycloakService: KeycloakService, private apollo: Apollo, private userService: UserService, private router: Router) {
    this.id_current_user=userService.profile.id;
    this.idSociete = this.route.snapshot.params['idSociete'];
    this.userService.adminService.loadAdminsToSuperAdmin().subscribe(admins => {
      this.dataSource = admins.filter(admin => (admin.id != '2dbabe35-9b35-4687-8d5e-782680c025d2') && (admin.roles.includes("USER")) && admin.id!=this.id_current_user);
      this.dataS = new MatTableDataSource(this.dataSource);
      this.dataS.paginator = this.paginator;
    });
    this.userService.getSocieteMembers(this.idSociete).subscribe(societes => {
      console.log("Members : ",societes)
      this.societeMembers=societes;
    });
  }
  findMember(idUser):any{
    this.societeMembers.forEach(mem=>{
      if(mem.createur.id===this.id_current_user && mem.member.id===idUser && mem.societe.id===this.idSociete){
        this.userService.deleteMemberToSociete(mem.id)
      }
    })
  }
  isMember(id){
    for (var i=0; i<this.societeMembers.length;i++){
      if(this.societeMembers[i].createur.id===this.id_current_user && this.societeMembers[i].member.id===id && this.societeMembers[i].societe.id===this.idSociete){
        return true;
      }
    }
    return false;
  }
  addMemberToSociete(id) {
    this.userService.addMemberToSociete(this.idSociete,this.id_current_user,id)
    location.reload()
  }

  removeMemberToSociete(id) {
    this.findMember(id)
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
    this.dataSourceBackup.paginator = this.paginator;
    console.log("wa hano: ", this.dataSourceBackup)
  }

}
