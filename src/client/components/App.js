import React,{useEffect} from 'react'
import Login from './Login'
import useLocalStorage from '../hooks/useLocalStorage';
import Dashboard from './Dashboard'
import { ContactsProvider } from '../contexts/ContactsProvider'
import { ConversationsProvider } from '../contexts/ConversationsProvider';
import { SocketProvider } from '../contexts/SocketProvider';
import { useAuth0 } from "@auth0/auth0-react";
function App() {
  const { user } = useAuth0();
  const { name } = user;
  const [id, setId] = useLocalStorage('id')
  useEffect(() => {
    setId(name);
    
  }, []);

  const dashboard = (
    <SocketProvider id={id}>
      <ContactsProvider>
        <ConversationsProvider id={id}>
          <Dashboard id={id} />
        </ConversationsProvider>
      </ContactsProvider>
    </SocketProvider>
  )

  return (
    id ? dashboard : <Login onIdSubmit={setId} />
  )
}

export default App;
