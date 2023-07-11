import { Component } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {AdminService} from "../../../services/office-service/AdminService";
import {NgForm} from "@angular/forms";
import {Bureau} from "../../models/office-app/Bureau";

@Component({
  selector: 'app-update-offices',
  templateUrl: './update-offices.component.html',
  styleUrls: ['./update-offices.component.css']
})
export class UpdateOfficesComponent {
  idParam:any;
  id_admin_courent:string
  bureau:any;
  nom_bureau:string='';
  adresse:string='';
  ville:string='';
  pays:string='';
  num_telephone:string='';
  email:string='';
  constructor(private route:ActivatedRoute,private adminService:AdminService) {
    this.idParam = this.route.snapshot.params['id'];
    this.id_admin_courent = adminService.profile.id;
    // this.route.paramMap.subscribe(params=>{
    //   console.log("wa hoya nari : ",params.get('id'));
    // });

    this.getBureau(this.idParam);
    // this.nom_bureau=this.bureau.id
  }

  getBureau(id){
    this.adminService.getBureauById(id).subscribe(bureau => {
      this.bureau=bureau;
      this.nom_bureau=this.bureau.nom
      this.adresse=this.bureau.adresse;
      this.ville=this.bureau.ville;
      this.pays=this.bureau.paye;
      this.num_telephone=this.bureau.numero_tele;
      this.email=this.bureau.email;
    });
  }
  updateBureau(updateUserForm:NgForm){
    var bureau= new Bureau(updateUserForm.value.nom_bureau,updateUserForm.value.adresse,updateUserForm.value.ville,updateUserForm.value.pays,updateUserForm.value.num_telephone,updateUserForm.value.email,this.id_admin_courent)
    this.adminService.updateBureau(this.idParam,bureau)
    location.reload();
  }
}
