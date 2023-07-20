import {Component, ElementRef, ViewChild} from '@angular/core';
import {SharedService} from "../../../../shared/shared.service";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../../../services/office-service/UserService";
import * as XLSX from 'xlsx'
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {PlanComptableService} from "../../../../services/plan-service/PlanComptableService";
import {PlanComptable} from "../../../models/plan-comptable-app/PlanComptable";
import {ConfirmationDialogService} from "../../../../services/confirmation-dialog/ConfirmationDialogService";
interface ConfirmationDialogData {
  title: string;
  message: string;
}
@Component({
  selector: 'app-plan-comptable',
  templateUrl: './plan-comptable.component.html',
  styleUrls: ['./plan-comptable.component.css']
})
export class PlanComptableComponent {
  id_current_user:string;
  idSociete:any;
  excelData:any;


  inputValue: string = ''
  displayedColumns: string[] = ['numeroCompte', 'intitule','natureCompte','debutFaurchette','finFaurchette','action'];
  dataSource: any[];
  inputElement: any;
  dataSourceBackup: MatTableDataSource<any>;
  dataS:MatTableDataSource<any>;
  @ViewChild('paginator') paginator:MatPaginator;

  constructor(private router:Router,private route:ActivatedRoute,private planComptableService:PlanComptableService,private confirmationDialogService: ConfirmationDialogService) {
    this.id_current_user=planComptableService.profile.id;
    this.idSociete = this.route.snapshot.params['idSociete'];
    this.planComptableService.loadPlanComptable(this.idSociete).subscribe(planComptable => {
      // planComptable.forEach(item=>{
      //   console.log("joj: ",Number(item.numeroCompte.charAt(0))+1)
      // })

      this.dataSource = planComptable.slice().sort((a,b)=>Number(a.numeroCompte.charAt(0))-Number(b.numeroCompte.charAt(0)));
      this.dataS=new MatTableDataSource(this.dataSource);
      this.dataS.paginator=this.paginator;
    });
  }
  sortByFirstCharacter(a: any, b: any): number {
    const charA = a.numeroCompte.charAt(0);
    const charB = b.numeroCompte.charAt(0);

    // Use the localeCompare method to compare the characters numerically
    return charA.localeCompare(charB, undefined, { numeric: true });
  }

  readExcel(event:any){
    let file=event.target.files[0];
    let fileReader=new FileReader()
    fileReader.readAsBinaryString(file);
    fileReader.onload=(e)=> {
      var item=XLSX.read(fileReader.result,{type:'binary'});
      var sheetNames=item.SheetNames;
      this.excelData=XLSX.utils.sheet_to_json(item.Sheets[sheetNames[0]])
      console.log(this.excelData)
      this.excelData.forEach(item=>{
        var planComptable=new PlanComptable(Object.values(item)[0].toString(),Object.values(item)[1].toString(),this.idSociete)
        console.log("Plan : ",planComptable);
        this.planComptableService.addPlanComptableElement(planComptable);
        // console.log(Object.values(item)[0] , " / ", Object.values(item)[1])
      })
      // for (var i=0; i<this.excelData.length;i++){
      //   console.log(this.excelData[0][i])
      // }
    }
    console.log("Length : ", this.excelData)
    // this.excelData.forEach(item=>{
    //   console.log("hello : ",item[0][1])
    // })

  }

  @ViewChild('searchInputRef', {static: false}) searchInputRef!: ElementRef;

  filterItems() {
    this.inputElement = this.searchInputRef.nativeElement as HTMLInputElement;
    this.dataSourceBackup = new MatTableDataSource<any>(
      this.dataSource.filter(user =>
        user.numeroCompte.toLowerCase().startsWith(this.inputElement.value.toLowerCase()) || user.intitule.toLowerCase().includes(this.inputElement.value.toLowerCase())
      )
    )
    this.dataSourceBackup.paginator=this.paginator;
  }

  deletePlanCompatbleItem(id){
    const confirmationData: ConfirmationDialogData = {
      title: 'Confirmation',
      message: 'Est-ce-que vous êtes sur?',
    };
    this.confirmationDialogService.openConfirmationDialog(confirmationData)
      .then(result => {
        if (result) {
          this.planComptableService.deletePlanComptableElement(id)
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
}
