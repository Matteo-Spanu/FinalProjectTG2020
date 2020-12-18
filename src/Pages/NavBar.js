import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import LogoutButton from '../components/logout-button';

export default function NavBar() {
  const { user } = useAuth0();
  const { name } = user;
  return (
    <nav style={{display:'flex',backgroundColor:'black',color:'white'}}>
      <h2>CoinOp</h2>
      <p>{name}</p>
      <Link to='/'>Home</Link>
      <Link to='/profile'>Profile</Link>
      <LogoutButton/>


    </nav>
  );
}
