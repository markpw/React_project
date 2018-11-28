import React, { Component } from 'react'
import '../style/ChatItems.css'

class ChatItems extends Component {
   
   render() {
      return (
         <div className="totalItems">
            {this.props.br} items
        </div>
      );
   }
}

export default ChatItems