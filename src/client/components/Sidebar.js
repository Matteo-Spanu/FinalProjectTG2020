import React, { useState } from "react";
import { Tab, Nav, Button, Modal } from "react-bootstrap";
import Conversations from "./Conversations";
import Contacts from "./Contacts";
import NewContactModal from './NewContactModal';
import NewConversationModal from './NewConversationModal';

const CONVERSATIONS_KEY = "conversations";
const CONTACTS_KEY = "contacts";

export default function Sidebar({ id }) {
  const [activeKey, setActiveKey] = useState(CONVERSATIONS_KEY)
  const [modalOpen, setModalOpen] = useState(false)
  const conversationsOpen = activeKey === CONVERSATIONS_KEY

function closeModal() {
   setModalOpen(false)
}


  return (
    <div  className="box-sidebar">
      <Tab.Container activeKey={activeKey} onSelect={setActiveKey}>
        {/* <Nav variant="tabs" className="button-sidebar">
          <Nav.Item>
           <div className='cc'> <Nav.Link className='button-sidebar-consersations' eventKey={CONVERSATIONS_KEY}>Conversations</Nav.Link></div>
          </Nav.Item>
          <Nav.Item>
          <div className='cc'><Nav.Link className='button-sider-contacts' eventKey={CONTACTS_KEY}>Contacts</Nav.Link></div>
          </Nav.Item>
        </Nav> */}
        <Tab.Content className="box-info-cc">
          <Tab.Pane eventKey={CONVERSATIONS_KEY}>
            <Conversations />
          </Tab.Pane>
          <Tab.Pane eventKey={CONTACTS_KEY}>
            <Contacts />
          </Tab.Pane>
        </Tab.Content>
        <div className="chat-info-id">
          {/* <span className="info-id">{id}</span> */}
        </div>
        <div className='box-button-new'>
        <Button onClick={() => setModalOpen(true)}
        className="button-new-consersations">
            New {conversationsOpen ? 'Conversation' : 'Contact'}
        </Button>
        </div>
      </Tab.Container>

      <Modal show={modalOpen} onHide={closeModal}>
          {conversationsOpen ?
          <NewConversationModal closeModal={()=>{setModalOpen(false)}} /> :
          <NewContactModal closeModal={closeModal} />
          
          }

      </Modal>
    </div>
  );
}
