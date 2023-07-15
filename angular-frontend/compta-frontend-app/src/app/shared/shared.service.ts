import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SharedService {
  public child_flag:boolean;
  // Define your shared variables and methods here
  public flag_auth: boolean;

  constructor() {
    // Initialize the shared variables if needed
    this.flag_auth = false;
  }

  private dataSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public data$ = this.dataSubject.asObservable();

  setData(newValue: any) {
    this.dataSubject.next(newValue);
  }

  private dataSubject1: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public data1$ = this.dataSubject1.asObservable();

  setData1(newValue: any) {
    this.dataSubject1.next(newValue);
  }
}
