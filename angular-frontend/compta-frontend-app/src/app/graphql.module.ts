import {APOLLO_NAMED_OPTIONS, APOLLO_OPTIONS, ApolloModule, NamedOptions} from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { NgModule } from '@angular/core';
import { ApolloClientOptions, InMemoryCache } from '@apollo/client/core';

const admine = 'http://localhost:8081/graphql'; // <-- add the URL of the GraphQL server here
const exercice='http://localhost:8082/graphql';
export function createApollo(httpLink: HttpLink): NamedOptions {
  return {
      offices:{
        link: httpLink.create({ uri:admine }),
          cache: new InMemoryCache(),
      },
      exercices:{
        link: httpLink.create({uri:exercice}),
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
