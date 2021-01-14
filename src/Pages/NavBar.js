import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import LogoutButton from '../components/logout-button';
import '../App.css';

export default function NavBar() {
  const { user } = useAuth0();
  const { name } = user;
  return (
    <nav>
      {/* <p>player1: {name}</p> */}
        <div className='menu'>
        <h1 className='logo'>CoinOp</h1>
        <div className='button-label'><Link className='label' to='/'>Home</Link></div>
        <div className='button-label'><Link className='label'  to='/profile'>Profile</Link></div>
        <LogoutButton text='Game Over'/>
      </div>

      <div className='box-chat'>
        <div className='button-chat'><Link className='label-chat'  to='/msg'>Chat...</Link></div>
      </div>
    </nav>
    
  );
}
