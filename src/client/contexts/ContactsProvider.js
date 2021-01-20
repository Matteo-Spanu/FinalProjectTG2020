import React, { useContext,useEffect } from 'react'
import useLocalStorage from '../hooks/useLocalStorage';

import { getData} from "../../function/getdata";
import { useAuth0 } from "@auth0/auth0-react";
const ContactsContext = React.createContext()

export function useContacts() {
    return useContext(ContactsContext)
}

export function ContactsProvider({ children }) {
    const [contacts, setContacts]= useLocalStorage('contacts', [])
    
    const { user } = useAuth0();
    const { name } = user;
      useEffect(() => {
  
          getData("http://localhost:4000/contact/" + name, setContacts);
      
        }, []);

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
