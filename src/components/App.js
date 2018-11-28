import React, { Component } from 'react';
import '../style/Chat.css'
import Chat from './Chat';
import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';

let name = "MK"

class App extends Component {
  async componentDidMount() {

    const result = await this.props.createPersonMutation({
      variables: { name }
    })

  }

  render() {

    return (
      <Chat name={name} />
    )
  }
}



const createPerson = gql`
  mutation createPerson($name: String!) {
    createPerson(name: $name) {
      name
    }
  }
`


export default graphql(createPerson, { name: 'createPersonMutation' })(App)