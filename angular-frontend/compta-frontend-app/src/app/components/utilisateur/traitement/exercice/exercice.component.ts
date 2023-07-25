import {Component, ElementRef, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {HttpClient} from "@angular/common/http";
import {SharedService} from "../../../../shared/shared.service";
import {UserService} from "../../../../services/office-service/UserService";
import {ActivatedRoute, Router} from "@angular/router";
import {ConfirmationDialogService} from "../../../../services/confirmation-dialog/ConfirmationDialogService";
import {ExerciceService} from "../../../../services/exercice-app/ExerciceService";
import {AttentionDialogService} from "../../../../services/attention-dialog/AttentionDialogService";
interface ConfirmationDialogData {
  title: string;
  message: string;
}
@Component({
  selector: 'app-exercice',
  templateUrl: './exercice.component.html',
  styleUrls: ['./exercice.component.css']
})
export class ExerciceComponent {
  idSociete: any;
  displayedColumns: string[] = ['exercice','date_debut', 'date_fin','etat','action'];
  id_user_courrant: string;
  dataSource: any[];
  inputElement: any;
  dataSourceBackup: MatTableDataSource<any>;
  dataS: MatTableDataSource<any>;
  counter:number=0;
  exercicesEtat:any=[];
  @ViewChild('paginator') paginator: MatPaginator;
  constructor(private http: HttpClient,private route:ActivatedRoute, private exerciceService: ExerciceService, private router: Router,private confirmationDialogService: ConfirmationDialogService,private  attentionDialogService:AttentionDialogService) {
    this.id_user_courrant = exerciceService.profile.id;
    this.idSociete = this.route.snapshot.params['idSociete'];
    this.exerciceService.loadExercice(this.idSociete).subscribe(exercice => {
      this.dataSource = exercice.slice().sort((a, b) => {
        const dateA = new Date(a.date_debut);
        const dateB = new Date(b.date_debut);
        return dateA.getTime() - dateB.getTime();
      });
      this.dataS = new MatTableDataSource(this.dataSource.slice().reverse());
      this.dataS.paginator = this.paginator;
    });
    this.exerciceService.loadExerciceEtat().subscribe(exerciceEtat => {
      this.exercicesEtat = exerciceEtat;
    });
  }


  isClose(idExercice){
    for(var i=0;i<this.exercicesEtat.length;i++){
      if(this.exercicesEtat[i].exerciceId===idExercice){
        return this.exercicesEtat[i].isFermer
      }
    }
  }


  @ViewChild('searchInputRef', {static: false}) searchInputRef!: ElementRef;
  filterItems() {
    this.inputElement = this.searchInputRef.nativeElement as HTMLInputElement;
    this.dataSourceBackup = new MatTableDataSource<any>(
      this.dataSource.filter(user =>
        user.date_debut.toLowerCase().includes(this.inputElement.value.toLowerCase()) || user.date_fin.toLowerCase().includes(this.inputElement.value.toLowerCase())
      )
    )
    this.dataSourceBackup.paginator = this.paginator;
  }
  fermerExercice(id){
    const confirmationData: ConfirmationDialogData = {
      title: 'Confirmation',
      message: 'Est-ce-que vous êtes sur?',
    };
    this.confirmationDialogService.openConfirmationDialog(confirmationData)
      .then(result => {
        if (result) {
          this.exerciceService.modifierExerciceEtat(id,true);
          location.reload();
        } else {
          console.log('Cancelled');
        }
      })
      .catch(error => {
        // Handle any errors that occurred during dialog interaction
        console.error('Confirmation dialog error:', error);
      });

  }


  redirect(){
    this.router.navigate(['../utilisateur/societes'])

  }
  ajouterExercice(){
    this.exerciceService.isAllExerciceCloseOfSocieteId(this.idSociete).subscribe(isAllClose => {
      if(isAllClose){
        this.router.navigate(['../utilisateur/traitement',this.idSociete,'exercice',this.idSociete,'add-exercice',this.idSociete])
      }else{
        const confirmationData: ConfirmationDialogData = {
          title: 'Attention!',
          message: 'Existe déjà un exercice ouvert',
        };
        this.attentionDialogService.openConfirmationDialog(confirmationData)
          .then(result => {
            if (result) {
              // location.reload();
            } else {
              console.log('Cancelled');
            }
          })
          .catch(error => {
            // Handle any errors that occurred during dialog interaction
            console.error('Confirmation dialog error:', error);
          });

      }
    });
  }
}
