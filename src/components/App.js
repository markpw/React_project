import React, { Component } from 'react';
import '../style/Chat.css'
//import ApolloClient from "apollo-boost";
//import {ApolloProvider} from 'react-apollo';
import Chat from './Chat';
import {gql} from 'apollo-boost';
import {graphql} from 'react-apollo';


const CHAT_USER_NAME_KEY = 'CHAT_USER_NAME'
const CHAT_USER_ID_KEY = 'CHAT_USER_ID'


class App extends Component {
 async componentDidMount() {
   // let name = localStorage.getItem(CHAT_USER_NAME_KEY)
   let name ="MK"
    //console.log("User:"+ name)
    //if (!name) {
   //   name = "goran"
      console.log("User:"+ name)
      const result = await this.props.createPersonMutation({
        variables: { name }
      })
      localStorage.setItem(CHAT_USER_NAME_KEY, result.data.createPerson.name)
      localStorage.setItem(CHAT_USER_ID_KEY, result.data.createPerson.id)
   // }
    console.log(`User: ${name}`)

  }

  render() {
    const name = localStorage.getItem(CHAT_USER_NAME_KEY)
    const userId = localStorage.getItem(CHAT_USER_ID_KEY)
    return (
      <Chat name={name} userId={userId} />
    )
  }
}



const createPerson = gql`
  mutation createPerson($name: String!) {
    createPerson(name: $name) {
      id
      name
    }
  }
`


export default graphql(createPerson, {name: 'createPersonMutation'})(App)