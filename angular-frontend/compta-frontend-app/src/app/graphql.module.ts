import {APOLLO_NAMED_OPTIONS, APOLLO_OPTIONS, ApolloModule, NamedOptions} from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { NgModule } from '@angular/core';
import { ApolloClientOptions, InMemoryCache } from '@apollo/client/core';

const admine = 'http://localhost:8087/graphql'; // <-- add the URL of the GraphQL server here
const exercice='http://localhost:8082/graphql';
const usernames = 'http://localhost:8087/graphql';
const security = 'http://localhost:8087/graphql';
const chat = 'http://localhost:8086/graphql';
const office = 'http://localhost:8081/graphql';
export function createApollo(httpLink: HttpLink): NamedOptions {
  return {
      admins:{
        link: httpLink.create({ uri:admine }),
          cache: new InMemoryCache(),
      },
      exercices:{
        link: httpLink.create({uri:exercice}),
          cache: new InMemoryCache(),
      },
      usernames:{
        link: httpLink.create({uri:usernames}),
        cache: new InMemoryCache(),
      },
      addRole:{
        link: httpLink.create({uri:security}),
        cache: new InMemoryCache(),
      },
      chat:{
        link: httpLink.create({uri:chat}),
        cache: new InMemoryCache(),
      },
    office:{
        link: httpLink.create({uri:office}),
        cache: new InMemoryCache(),
      }
  };
}

@NgModule({
  exports: [ApolloModule],
  providers: [
    {
      provide: APOLLO_NAMED_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
  ],
})
export class GraphQLModule {

}
