import React, { useState, useCallback } from 'react'
import { Form, InputGroup, Button } from 'react-bootstrap'
import { useConversations } from '../contexts/ConversationsProvider';

export default function OpenConversation() {
  const [text, setText] = useState('')
  const setRef = useCallback(node => {
    if (node) {
      node.scrollIntoView({ smooth: true })
    }
  }, [])
  const { sendMessage, selectedConversation } = useConversations()

  function handleSubmit(e) {
    e.preventDefault()

    sendMessage(
      selectedConversation.recipients.map(r => r.id),
      selectedConversation.game,
      text
    )
    setText('')
  }

  return (
    <div  id='box' className="chat-box">
      <div className="chat-message">
        <div className="separatore-chat">
          {selectedConversation.messages.map((message, index) => {
            const lastMessage = selectedConversation.messages.length - 1 === index
            return (
              <div
                ref={lastMessage ? setRef : null}
                key={index}
                className={`my-1 d-flex flex-column ${message.fromMe ? 'align-self-end align-items-end' : 'align-items-start'}`}
              >
                <div
                  className={`message-from px-2 py-1 ${message.fromMe ? 'message-me text-black' : 'border'}`}>
                  {message.text}
                </div>
                <div className={`text-name-send ${message.fromMe ? 'text-right' : ''}`}>
                  {message.fromMe ? 'You' : message.senderName}
                </div>
              </div>
            )
          })}
        </div>


        <Form onSubmit={handleSubmit} className='box-text-send' >
        <Form.Group>
          <InputGroup>
            <Form.Control className=''
              as="textarea"
              required
              value={text}
              onChange={e => setText(e.target.value)}
              style={{ height: '45px', resize: 'none', }}
            />
            <InputGroup.Append>
              <Button className='button-send-chat' type="submit">Send</Button> 
            </InputGroup.Append>
          </InputGroup>
        </Form.Group>
      </Form>

      </div>
          
      
      
    </div>
  )
}
