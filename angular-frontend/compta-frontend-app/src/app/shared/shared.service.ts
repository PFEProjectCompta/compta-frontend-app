import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  // Define your shared variables and methods here
  public flag_auth: boolean;

  constructor() {
    // Initialize the shared variables if needed
    this.flag_auth = false;
  }
}
