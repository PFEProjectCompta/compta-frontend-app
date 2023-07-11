import {Injectable} from "@angular/core";
import {Apollo} from "apollo-angular";
import {HttpLink} from "apollo-angular/http";
import {InMemoryCache} from "@apollo/client/core";
import {ADD_ADMIN, ADD_ROLE} from "../../graphql/mutations.graphql";

@Injectable({
  providedIn: 'root'
})
export class BureauAdminService {

  constructor(private apollo:Apollo,httpLink: HttpLink) {
    const options: any = { uri: 'http://localhost:8081/graphql' };
    apollo.createDefault({
      link: httpLink.create(options),
      cache: new InMemoryCache()
    });
  }

}
