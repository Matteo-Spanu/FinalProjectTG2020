import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import LogoutButton from '../components/logout-button';

export default function NavBar() {
  const { user } = useAuth0();
  const { name } = user;
  return (
    <nav style={{display:'flex',backgroundColor:'black',color:'white',position: "fixed",
    left: "0",
    top: "0",
    textAlign: "center",width: "100%",}}>
      <h2>CoinOp</h2>
      <p>player1: {name}</p>
      <div>
      <Link to='/'>Home</Link>
      <Link to='/profile'>Profile</Link>
      <LogoutButton text='Game Over'/>
</div>

    </nav>
  );
}
