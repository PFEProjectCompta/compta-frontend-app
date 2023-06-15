import {Component, OnDestroy, OnInit} from '@angular/core';
import {Apollo} from "apollo-angular";
import {Subscription} from "rxjs";
import {GET_ADMINE, GET_EXERCICES} from "../../graphql/queries.graphql";

@Component({
  selector: 'app-office',
  templateUrl: './office.component.html',
  styleUrls: ['./office.component.css']
})
export class OfficeComponent implements OnInit,OnDestroy{
  loading: boolean;
  admins: any;
  exercices:any;
  private querySubscription:Subscription;
  constructor(
    private apollo:Apollo
  ) {
  }
  ngOnInit(): void {
    this.loadAdmins();
    this.loadExercice();
  }
  loadAdmins():void{
    this.querySubscription = this.apollo.use("offices")
      .watchQuery<any>({
        query: GET_ADMINE,
      })
      .valueChanges.subscribe(({ data, loading }) => {
        this.loading = loading;
        this.admins = data.adminesBureauList;
        console.log(data)
      });
  }
  loadExercice():void{
    this.querySubscription = this.apollo.use("exercices")
      .watchQuery<any>({
        query: GET_EXERCICES,
      })
      .valueChanges.subscribe(({ data, loading }) => {
        this.loading = loading;
        this.exercices = data.exerciceList;
        console.log(data.exerciceList)
      });
  }
  ngOnDestroy(): void {
    this.querySubscription.unsubscribe();
  }

}
