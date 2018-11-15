import React, { Component} from 'react'
import '../style/ChatMessages.css'
import ChatMessage from './ChatMessage'

class ChatMessages extends Component {

  
render() {

    return (
      <div className='ChatMessages'>
        {this.props.messages.map((message, i) => {
        
          return (<ChatMessage
            key={i}
            message={message.text}
            id ={message.id}
            username={message.sentBy ? message.sentBy.name : 'MK'}
            time={message.createdAt}
            onEdit={this._OnEdit}
            onDelete={this._OnDelete}
          />)
        })}
        <div style={ {float:"left", clear: "both"} }
             ref={el => { this.props.endRef(el) }}></div>
      </div>
    )
  }

  
  _OnEdit = (element) => {
    console.log(element)
    this.onEdit = element
    this.props.onEditChat(element);
  }

  _OnDelete = (element) => {
    console.log("delete" + element)
    this.onDelete = element
    this.props.onDeleteChat(element);
  }
}



export default ChatMessages
