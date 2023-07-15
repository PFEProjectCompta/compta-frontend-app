import { Component } from '@angular/core';
import {SharedService} from "../../../shared/shared.service";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../../services/office-service/UserService";

@Component({
  selector: 'app-plan-comptable',
  templateUrl: './plan-comptable.component.html',
  styleUrls: ['./plan-comptable.component.css']
})
export class PlanComptableComponent {
  id_current_user:string;
  idSociete:any;
  constructor(private router:Router,private route:ActivatedRoute,private userService:UserService) {
    this.id_current_user=userService.profile.id;
    this.idSociete = this.route.snapshot.params['idSociete'];
  }

}
