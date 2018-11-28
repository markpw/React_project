import React, { Component } from 'react'
import '../style/ChatMessage.css'
import moment from 'moment';
import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';


class ChatMessage extends Component {


  onEditMessage = () => {
    if (!this.props.beingEdited) {
      console.log("id:" + this.props.id)
      console.log("Text:" + this.props.message)

      document.getElementById("txtChatBox").value = this.props.message;
      this.props.onEdit(this.props.id);
    }
  }
  onDeleteMessage = () => {
    if (!this.props.beingEdited) {
      console.log("id:" + this.props.id)
      this.props.onDelete(this.props.id);
    }
  }

  render() {

    const { onDeleteMessage, onEditMessage } = this;
    const createdAtTimestamp = new Date(this.props.time).getTime()
    //const nowTimestamp = new Date().getTime()
    const date = moment(createdAtTimestamp).format('D/M/YYYY H:mm');

    return (
      <div className='ChatMessage'>
        <div className='MessageHeader'>
          <div className='Username'>{this.props.username}</div>
          <div>
            <span className="spanMessage" id={this.props.id} >{this.props.message}</span>
            <div className="divMessage">
              <span className="messageEditButton" onClick={onEditMessage} >
                <img src="../images/edit-button.png" alt="Edit" />
              </span>
              <span className="messageDeleteButton" onClick={onDeleteMessage}>
                <img src="../images/delete.png" alt="Delete" />
              </span>
            </div>
          </div>
        </div>
        <div className='Time'>({date})</div>
      </div>

    )
  }

}


export default ChatMessage