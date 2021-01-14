import React, { useState , useRef} from 'react'
import { Modal, Form, Button } from 'react-bootstrap'
import { useContacts } from '../contexts/ContactsProvider'
import { useConversations } from '../contexts/ConversationsProvider'

export default function NewConversationModal( props ) {
    const [selectedContactIds, setSelectedContactIds] = useState([])
    const nameRef = useRef()
    const { contacts } = useContacts()
    const { createConversation } = useConversations()

    function handleSubmit(e) {
        e.preventDefault()

        createConversation(selectedContactIds, nameRef.current.value)
        props.closeModal()
    }

    function handleCheckBoxChange(contactId) {
        setSelectedContactIds(prevSelectedContacIds => {
            if (prevSelectedContacIds.includes(contactId)) {
                return prevSelectedContacIds.filter(prevId => {
                    return contactId !== prevId
                })
            } else {
                return [...prevSelectedContacIds, contactId]
            }
        })
        
    }

    return (
        < >
        <Modal.Header closeButton>Create Conversation</Modal.Header>
        <Modal.Body>
            <Form onSubmit={handleSubmit}>
             {contacts.map(contact => (
                <Form.Group controlId={contact.id} key={contact.id}>
                    <Form.Check
                    type="checkbox"
                    value={selectedContactIds.includes(contact.id)}
                    label={contact.name}
                    onChange={() => handleCheckBoxChange(contact.id)}
                    />

                </Form.Group>
             ))}
             <Form.Group>
                   <Form.Label>Name</Form.Label>
                   <Form.Control type="text" ref={nameRef} required />
               </Form.Group>
            <Button type="submit">Create</Button>
            </Form>
         </Modal.Body> 
     </ >
 )
    
}
