import React, { Component } from 'react';
import '../style/Chat.css'
import Chat from './Chat';
import {gql} from 'apollo-boost';
import {graphql} from 'react-apollo';


//const CHAT_USER_NAME_KEY = 'CHAT_USER_NAME'
//const CHAT_USER_ID_KEY = 'CHAT_USER_ID'

let name ="MK"

class App extends Component {
 async componentDidMount() {
   
     // let name ="MK"
      console.log("User:"+ name)
      const result = await this.props.createPersonMutation({
        variables: { name }
      })
      //localStorage.setItem(CHAT_USER_NAME_KEY, result.data.createPerson.name)
      //localStorage.setItem(CHAT_USER_ID_KEY, result.data.createPerson.id)
    
    //  console.log(`User: ${name}`)

  }

  render() {
    //const name = localStorage.getItem(CHAT_USER_NAME_KEY)
    //const userId = localStorage.getItem(CHAT_USER_ID_KEY)
    return (
      //<Chat name={name} userId={userId} />
      <Chat name={name} />
     
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