import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import LogoutButton from '../components/logout-button';

export default function NavBar() {
  const { user } = useAuth0();
  const { name } = user;
  return (
    <nav>
      <h2>CoinOp</h2>
      <p>{name}</p>
      <Link path='/'>Home</Link>
      <Link path='/profile'>Profile</Link>
      <LogoutButton/>


    </nav>
  );
}
