import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import LogoutButton from '../components/logout-button';
import '../App.css';

export default function NavBar() {
  const { user } = useAuth0();
  const { name } = user;
  const [cookie, setCookie] = useState(true);
 
  return (
    <nav>
      {/* <p>player1: {name}</p> */}
      <section className='box-navbar'>

        <div className='grid-navbar'>
        <h1><Link className='logo'to='/'>CoinOp</Link></h1>
          </div>

          <div className='grid-navbar-m'>
            {/* <div className='menu'> */}
              <div className='button-label'><Link className='label' to='/'>Home</Link></div>
              <div className='button-label'><Link className='label'  to='/profile'>Profile</Link></div>
              <LogoutButton text='Game Over'/>
            {/* </div> */}
          </div>
        </section>
        {cookie && <CookieBanner switch={()=> setCookie(false) } />}
      <div className='box-chat'>
        <Link className='button-chat'  to='/msg'>Chat...</Link>
      </div>
    </nav>
    
  );
}


 function CookieBanner(props){
return(
<div>
<p>vuoi i biscotti?</p>
  <button onClick={()=>{props.switch()}}> Accept all </button>
  <button onClick={()=>{props.switch()}}> Refuse </button>
</div>
)
}