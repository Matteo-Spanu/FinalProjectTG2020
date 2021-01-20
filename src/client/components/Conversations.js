import React from 'react'
import { ListGroup } from 'react-bootstrap'
import { useConversations } from '../contexts/ConversationsProvider';

export default function Conversations() {
    const { conversations, selectConversationIndex } = useConversations()
    return (
        <ListGroup variant="flush>">
        <div className='box-prova' >
        {conversations.map((conversation, index) => (
            <ListGroup.Item 
            key={index}
            action
            onClick={() => selectConversationIndex(index)}
            active={conversation.selected}
            >

                {conversation.game}
            </ListGroup.Item>
        ))}
        </div>
    </ListGroup>
    )
}

