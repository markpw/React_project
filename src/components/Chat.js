import React, { Component } from 'react';
import { gql } from 'apollo-boost';
import { graphql, compose } from 'react-apollo';
import '../style/Chat.css'
import ChatInput from './ChatInput'
import ChatMessages from './ChatMessages'
import ChatItems from './ChatItems'


const newMessageSubscription = gql`
  subscription {
    Message(filter: {
      mutation_in: [CREATED]
    }) {
      node {
        id
        text
        createdAt
        sentBy {
          id
          name
        }
      }
    }
  }
`

const getAllMessagesId = gql`
  {allMessages{id}}
`
class Chat extends Component {

  state = {
    message: '',
    id: ''
  }

  componentDidMount() {
    this.createMessageSubscription = this.props.allMessagesQuery.subscribeToMore({
      document: newMessageSubscription,
      updateQuery: (previousState, { subscriptionData }) => {
        const newMessage = subscriptionData.data.Message.node
        const messages = previousState.allMessages.concat([newMessage])
        return {
          allMessages: messages
        }
      },
      onError: (err) => console.error(err),
    })
  }


  render() {
    let br = Object(this.props.allMessagesQuery.allMessages).length;

    return (
      <div className='Chat'>
        <ChatItems
          br={br}
        />
        <ChatMessages
          messages={this.props.allMessagesQuery.allMessages || []}
          value={(message) => this.setState({ message })}
          endRef={this._endRef}
          onEditChat={this._onEditChat}
          onDeleteChat={this._onDeleteChat}
        />
        <ChatInput
          message={this.state.message}
          onTextInput={(message) => this.setState({ message })}
          onResetText={() => this.setState({ message: '' })}
          onSend={this._onSend}
        />
      </div>
    )
  }


  _onSend = () => {
    if (this.onEditChat != null) {
      document.getElementById(this.onEditChat).innerHTML = this.state.message;
      this.props.updateMessageMutation({
        variables: {
          id: this.onEditChat,
          text: this.state.message
        }
      })
      this.onEditChat = null;
    }
    else {
      this.props.createMessageMutation({
        variables: {
          text: this.state.message,
          sentById: this.props.userId
        }
      })
    }
  }

  /*
   * AUTO SCROLLING
   */

  _endRef = (element) => {
    this.endRef = element
  }

  _onDeleteChat = (element) => {
    this.onDeleteChat = element
    let id = element;
    this.props.deleteMessageMutation({
      variables: { id }
    })

   window.location.assign("http://localhost:3000/");
//   window.location.reload();
  }

  _onEditChat = (element) => {
    this.onEditChat = element
  }

  componentDidUpdate(prevProps) {
    // scroll down with every new message
    if (prevProps.allMessagesQuery.allMessages !== this.props.allMessagesQuery.allMessages && this.endRef) {
      this.endRef.scrollIntoView()
    }
  }

}

const allMessages = gql`
  query allMessages {
    allMessages(last: 100) {
      id
      text
      createdAt
      sentBy {
        id
        name
      }
    }
  }
`
const editMessage = gql`
  mutation updateMessage($id: ID!, $text: String!) {
    updateMessage(id: $id, text: $text) {
      id
      text
    }
  }
`
const deleteMessage = gql`
   mutation deleteMessage($id: ID!) {
    deleteMessage(id:$id) {
      id
    }
  }
`

const createMessage = gql`
  mutation createMessage($text: String!) {
    createMessage(text: $text) {
      id
      text
      createdAt
    
    }
  }
`

export default compose(
  graphql(createMessage, { name: 'createMessageMutation' }),
  graphql(getAllMessagesId),
  graphql(allMessages, { name: 'allMessagesQuery' }),
  graphql(deleteMessage, { name: 'deleteMessageMutation' }),
  graphql(editMessage, { name: 'updateMessageMutation' })
)(Chat)