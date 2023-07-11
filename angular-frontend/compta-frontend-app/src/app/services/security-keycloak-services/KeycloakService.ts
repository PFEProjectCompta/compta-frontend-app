import { Injectable } from '@angular/core';
import { KeycloakInstance } from 'keycloak-js';
import Keycloak from 'keycloak-js';
import { Observable, of,Observer,BehaviorSubject   } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class KeycloakService{
  public keycloak: KeycloakInstance;
  private initialized: boolean = false;
  constructor() {
    this.keycloak = new Keycloak({
      realm:"compta-realm",
      clientId:"office-client",
      url:"http://localhost:9900"
    });

  }

  async init(): Promise<any> {
    if(!this.initialized){
      try {
        await this.keycloak.init({ onLoad: 'login-required' });
        this.initialized=true;
        return this.keycloak;
      } catch (error) {
        console.error('Keycloak initialization error:', error);
      }
    }

  }

  getToken(): string {

    return this.keycloak.token || '';
  }

  getUserId(): string {
    return this.keycloak.tokenParsed.sub || '';
  }

  getUserName(): Observable<string> {
    const userName = this.keycloak.tokenParsed['name'] || '';
    return of(userName);
  }
  // getUserName(): Observable<string> {
  //   const userName = this.keycloak.tokenParsed['name'] || '';
  //   return of(userName);
  // }


  logout(): void {
    localStorage.clear();
    // this.keycloak.clearToken();
    this.keycloak.logout().then(() => this.keycloak.clearToken());
    this.keycloak.logout();

    // this.keycloak.token="";
    // window.location.href = "http://localhost:9900/realms/compta-realm/protocol/openid-connect/logout";

      }
}
