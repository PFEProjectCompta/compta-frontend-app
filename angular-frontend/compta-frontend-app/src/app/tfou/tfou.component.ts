import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-tfou',
  templateUrl: './tfou.component.html',
  styleUrls: ['./tfou.component.css']
})
export class TfouComponent implements OnInit{
  id:string;
  constructor(private route:ActivatedRoute) {
  }
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
  }

}
