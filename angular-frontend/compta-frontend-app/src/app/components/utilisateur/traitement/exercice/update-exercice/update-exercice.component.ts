import { Component } from '@angular/core';
import {ExerciceService} from "../../../../../services/exercice-app/ExerciceService";
import {ActivatedRoute, Router} from "@angular/router";
import {DatePipe} from "@angular/common";
import {Exercice} from "../../../../models/exercice-app/Exercice";
import {NgForm} from "@angular/forms";
import {MAT_DATE_FORMATS} from "@angular/material/core";
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
  selector: 'app-update-exercice',
  templateUrl: './update-exercice.component.html',
  styleUrls: ['./update-exercice.component.css'],
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },
    { provide: MAT_DATE_FORMATS, useValue: DATE_FIN_FORMATS }
  ]
})
export class UpdateExerciceComponent {
  date_debut:string='';
  date_fin:string='';
  idSociete:any;
  idExercice:any;
  transformedDateDebut: string;
  transformedDateFin: string;

  constructor(public exerciceService: ExerciceService, private router: Router,private datePipe: DatePipe,private route:ActivatedRoute) {
    this.idSociete = this.route.snapshot.params['idSociete'];
    this.idExercice = this.route.snapshot.params['idExercice'];
    console.log("Socicete id : ",this.idSociete)
    this.getExercice(this.idExercice);
  }
  getExercice(id){
    this.exerciceService.exerciceById(id).subscribe(exercice => {
      console.log("date : ",exercice['date_debut'])
      this.date_debut=exercice['date_debut'];
      this.date_fin=exercice['date_fin'] ;
    });
  }
  transformDate(dateDebut: string,dateFin:string) {
    const debut= new Date(dateDebut);
    const fin= new Date(dateFin);
    this.transformedDateDebut = this.datePipe.transform(debut, 'dd-MM-yyyy');
    this.transformedDateFin = this.datePipe.transform(fin, 'dd-MM-yyyy');
  }
  updateExercice(updateExerciceForm:NgForm){
    this.transformDate(updateExerciceForm.value.date_debut,updateExerciceForm.value.date_fin)
    var exercice=new Exercice(this.transformedDateDebut,this.transformedDateFin,this.idSociete);
    this.exerciceService.modifierExercice(this.idExercice,exercice)
    this.router.navigate(['../utilisateur/traitement',this.idSociete,'exercice',this.idSociete])

  }
}
