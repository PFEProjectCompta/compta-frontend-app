import {Component, ElementRef, ViewChild} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {AdminService} from "../../../services/office-service/AdminService";

@Component({
  selector: 'app-compte-user',
  templateUrl: './compte-user.component.html',
  styleUrls: ['./compte-user.component.css']
})
export class CompteUserComponent {
  dataSourceComptes:any[];
  displayedColumns: string[] = ['nom','prenom', 'email', 'adresse', 'telephone','ville','paye','date_naissance','action'];
  idBureau:any;
  inputElement: any;
  dataSourceBackup: any[];
  constructor(private route:ActivatedRoute,private adminService:AdminService) {
    this.idBureau = this.route.snapshot.params['idBureau'];
    this.loadCompteUtilisateur();
  }

  loadCompteUtilisateur(){
    this.adminService.getComptesUtilisateursByBureauId(this.idBureau).subscribe(comptes => {
      console.log("Comptaaate: ",comptes)
     this.dataSourceComptes=comptes;
    });
  }
  removeCompte(idCompte){
    this.adminService.removeCompteUtilisateur(idCompte);
    location.reload();
  }

  addRoleUser(id){
   this.adminService.addRoleUser(id);
   this.adminService.updateCompteUtilisateurActif(id,false);
   location.reload();
    console.log("haniii :", id)
  }
  removeRoleUser(id){
   this.adminService.removeRoleUser(id);
   this.adminService.updateCompteUtilisateurActif(id,true);
   location.reload();
    console.log("wiiii :", id)
  }
  @ViewChild('searchInputRef', {static: false}) searchInputRef!: ElementRef;
  filterItems() {
    this.inputElement = this.searchInputRef.nativeElement as HTMLInputElement;
    console.log("search : ", this.inputElement.value);
    this.dataSourceBackup = this.dataSourceComptes.filter(user =>
      user.nom.toLowerCase().includes(this.inputElement.value.toLowerCase()) || user.prenom.toLowerCase().includes(this.inputElement.value.toLowerCase()) || user.date_naissance.toLowerCase().includes(this.inputElement.value.toLowerCase())
    );
    console.log(this.dataSourceBackup)
  }
}
