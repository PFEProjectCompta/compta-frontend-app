import {Component, ElementRef, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {ExerciceService} from "../../../../../services/exercice-app/ExerciceService";
import {ConfirmationDialogService} from "../../../../../services/confirmation-dialog/ConfirmationDialogService";
import {AttentionDialogService} from "../../../../../services/attention-dialog/AttentionDialogService";
interface ConfirmationDialogData {
  title: string;
  message: string;
}
@Component({
  selector: 'app-details-exercice',
  templateUrl: './details-exercice.component.html',
  styleUrls: ['./details-exercice.component.css']
})
export class DetailsExerciceComponent {
  idSociete: any;
  idExercice:any;
  displayedColumns: string[] = ['code','intitule_journale', 'type_journal','action'];
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
    this.idExercice = this.route.snapshot.params['idExercice'];
    this.exerciceService.loadCodeJournal(this.idExercice).subscribe(exercice => {
      this.dataSource = exercice
      this.dataS = new MatTableDataSource(this.dataSource);
      this.dataS.paginator = this.paginator;
    });

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
  remove(id){
    const confirmationData: ConfirmationDialogData = {
      title: 'Confirmation',
      message: 'Est-ce-que vous êtes sur?',
    };
    this.confirmationDialogService.openConfirmationDialog(confirmationData)
      .then(result => {
        if (result) {
          this.exerciceService.supprimerCodeJournal(id)
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
    this.router.navigate(['../utilisateur/traitement',this.idSociete,'exercice',this.idSociete])

  }
}
