import React, { useRef } from 'react'
import { Modal, Form, Button } from 'react-bootstrap'
import { useContacts } from '../contexts/ContactsProvider';

export default function NewContactModal( props ) {
const idRef = useRef()
const nameRef = useRef()
const { createContact } = useContacts()


    function handleSubmit(e) {
        e.preventDefault()

        createContact(idRef.current.value, nameRef.current.value)
        props.closeModal()
    }

    return (
        <section className='box-new-module-consersation'>
           <Modal.Header closeButton>Create Contact</Modal.Header>
           <Modal.Body>
               <Form  className='new-module-consersation'onSubmit={handleSubmit}>
               <Form.Group>
                   <Form.Label>Id</Form.Label>
                   <Form.Control type="text" ref={idRef} required />
               </Form.Group>
               <Form.Group>
                   <Form.Label>Name</Form.Label>
                   <Form.Control type="text" ref={nameRef} required />
               </Form.Group>
               <Button type="submit">Create</Button>
               </Form>
            </Modal.Body> 
        </section>
    )
}
