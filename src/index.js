import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import './style/index.css'
import {
  ApolloProvider,
  createNetworkInterface,
  ApolloClient,
} from 'react-apollo'
import {SubscriptionClient} from 'subscriptions-transport-ws'
import { addGraphQLSubscriptions } from 'add-graphql-subscriptions';


const projectId = 'cjoimvyqrbmgr0134xcaif5c9'


const graphQLEndpoint = `https://api.graph.cool/simple/v1/${projectId}`

const networkInterface = createNetworkInterface({
  uri: graphQLEndpoint
})


const subscriptionsClient = new SubscriptionClient(`wss://subscriptions.graph.cool/v1/cjoimvyqrbmgr0134xcaif5c9`, {
  reconnect: true
})


const networkInterfaceWithSubscriptions = addGraphQLSubscriptions(
  networkInterface,
  subscriptionsClient
)

const client = new ApolloClient({
  networkInterface: networkInterfaceWithSubscriptions,
  dataIdFromObject: o => o.id,
})



ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
  ,
  document.getElementById('root')
)
