import { Component } from '@angular/core';
import {MAT_DATE_FORMATS} from "@angular/material/core";
import {AdminService} from "../../../../../services/office-service/AdminService";
import {DatePipe} from "@angular/common";
import {ActivatedRoute, Router} from "@angular/router";
import {Exercice} from "../../../../models/exercice-app/Exercice";
import {ExerciceService} from "../../../../../services/exercice-app/ExerciceService";
import {CompteUtilisateur} from "../../../../models/office-app/CompteUtilisateur";
export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'DD-MM-YYYY',
  },
  display: {
    dateInput: 'DD-MM-YYYY',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY'
  },
};
export const DATE_FIN_FORMATS = {
  parse: {
    dateInput: 'DD-MM-YYYY',
  },
  display: {
    dateInput: 'DD-MM-YYYY',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY'
  },
};
@Component({
  selector: 'app-add-exercice',
  templateUrl: './add-exercice.component.html',
  styleUrls: ['./add-exercice.component.css'],
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },
    { provide: MAT_DATE_FORMATS, useValue: DATE_FIN_FORMATS }
  ]
})
export class AddExerciceComponent {
  date_debut:string='';
  date_fin:string='';
  idSociete:any;
  transformedDateDebut: string;
  transformedDateFin: string;

  constructor(public exerciceService: ExerciceService, private router: Router,private datePipe: DatePipe,private route:ActivatedRoute) {
    this.idSociete = this.route.snapshot.params['idSociete'];
    console.log("Socicete id : ",this.idSociete)
  }

  transformDate(dateDebut: string,dateFin:string) {
    const debut= new Date(dateDebut);
    const fin= new Date(dateFin);
    this.transformedDateDebut = this.datePipe.transform(debut, 'dd-MM-yyyy');
    this.transformedDateFin = this.datePipe.transform(fin, 'dd-MM-yyyy');
  }
  addExercice(addExerciceForm){
     this.transformDate(addExerciceForm.value.date_debut,addExerciceForm.value.date_fin)
     var exercice=new Exercice(this.transformedDateDebut,this.transformedDateFin,this.idSociete);
    this.exerciceService.ajouterExercice(exercice)
      .then(data => {
        this.exerciceService.ajouterExerciceEtat(data.ajouterExercice.id);
        this.router.navigate(['../utilisateur/traitement',this.idSociete,'exercice',this.idSociete])
      })
      .catch(error => {
      });
  }
}
