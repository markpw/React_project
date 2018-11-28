import React, { Component } from 'react'
import '../style/ChatInput.css'



class ChatInput extends Component {

  render() {
    return (
      <div className='ChatInput'>
        <input
          className='InputField'
          placeholder='Enter your message...'
          type='text'
          id='txtChatBox'
          value={this.props.message}
          autoFocus={true}
          onChange={(e) => this.props.onTextInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.keyCode === 13) { // ENTER MESSAGE
              this.props.onSend()
              this.props.onResetText()
            }
          }}
        />
      </div>
    )
  }
}

export default ChatInput