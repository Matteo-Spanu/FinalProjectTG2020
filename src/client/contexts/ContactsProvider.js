import React, { useContext } from 'react'
import useLocalStorage from '../hooks/useLocalStorage';

const ContactsContext = React.createContext()

export function useContacts() {
    return useContext(ContactsContext)
}

export function ContactsProvider({ children }) {
    const [contacts, setContacts]= useLocalStorage('contacts', [{id:'test@account.com',name:'test@account.com'}])

    function createContact(id, name) {
        setContacts(prevContacts => {
            return [...prevContacts, { id, name }]
        })
    }

    return (
        <ContactsContext.Provider value={{ contacts, createContact }}>
           {children} 
        </ContactsContext.Provider>
    )
}
