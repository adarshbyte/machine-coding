import { HttpLink } from '@apollo/client'
import { ApolloClient, InMemoryCache } from '@apollo/client'

const client = new ApolloClient({
  link: new HttpLink({
    uri: 'https://countries.trevorblades.com/',
  }),
  cache: new InMemoryCache(),
})

export default client
