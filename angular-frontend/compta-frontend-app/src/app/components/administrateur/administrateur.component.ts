import {Component, NgModule} from '@angular/core';

import {NgForm} from "@angular/forms";
import {Router} from "@angular/router";


@Component({
  selector: 'app-administrateur',
  templateUrl: './administrateur.component.html',
  styleUrls: ['./administrateur.component.css'],
})
export class AdministrateurComponent {
  constructor(private router:Router) {
  }
  listAdmins(){
    console.log(window.location.origin);
    this.router.navigate(["./list-admins"])
  }

  addAdmins(){
    console.log(window.location.origin);
    this.router.navigate(["./add"])
  }

}
