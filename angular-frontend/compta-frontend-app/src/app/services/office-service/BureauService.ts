import {Injectable} from "@angular/core";
import {Apollo} from "apollo-angular";
import {HttpLink} from "apollo-angular/http";
import {KeycloakService} from "keycloak-angular";
import {InMemoryCache} from "@apollo/client/core";
import {ADD_ADMIN} from "../../graphql/mutations.graphql";
import {Bureau} from "../../components/models/office-app/Bureau";

@Injectable({
  providedIn: 'root'
})
export class BureauService{
  constructor(private apollo:Apollo,httpLink: HttpLink,public keycloakService: KeycloakService) {
    const options1: any = { uri: 'http://localhost:8081/graphql' };
    apollo.createDefault({
      link: httpLink.create(options1),
      cache: new InMemoryCache()
    });
    // apollo.createNamed('options2',{
    //   link:httpLink.create(options2),
    //   cache:new InMemoryCache()
    // })
  }

}
