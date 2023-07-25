import { Component } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../../../../../services/office-service/UserService";
import {NgForm} from "@angular/forms";
import {Societe} from "../../../../../models/office-app/Societe";
import {CodeJournal} from "../../../../../models/exercice-app/CodeJournal";
import {ExerciceService} from "../../../../../../services/exercice-app/ExerciceService";

@Component({
  selector: 'app-add-code-journal',
  templateUrl: './add-code-journal.component.html',
  styleUrls: ['./add-code-journal.component.css']
})
export class AddCodeJournalComponent {
  code: string='' ;
  intitule_journale: string='' ;
  type_journal: string ='';
  idSociete:any;
  idExercice:any;
  id_current_user:string;
  constructor(private router:Router,private route:ActivatedRoute,private exerciceService:ExerciceService) {
    this.id_current_user=exerciceService.profile.id;
    this.idSociete = this.route.snapshot.params['idSociete'];
    this.idExercice = this.route.snapshot.params['idExercice'];
    console.log("IdExo : ", this.idExercice)
  }
  addCodeJournal(addCodeJournalForm:NgForm){
    var code_journal=new CodeJournal(addCodeJournalForm.value.code,addCodeJournalForm.value.intitule_journale,
      addCodeJournalForm.value.type_journal,this.idExercice)
    this.exerciceService.ajouterCodeJournal(code_journal)
      .then(data => {
        console.log("")
      this.exerciceService.ajouterAllSaisieJournal(data.ajouterCodeJournal.id);
      this.router.navigate(['../utilisateur/traitement',this.idSociete,'exercice',this.idSociete,'details-exercice',this.idExercice,this.idSociete])
    })
      .catch(error => {
      });
  }
}
