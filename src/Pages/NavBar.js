import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Link , useLocation} from "react-router-dom";
import LogoutButton from '../components/logout-button';
import '../App.css';


export default function NavBar() {
  const { user } = useAuth0();
  const { name } = user;
  const [cookie, setCookie] = useState(true);
 let location= useLocation();
  return (
    <nav>
      {/* <p>player1: {name}</p> */}
      <section className='box-navbar'>

        <div className='grid-navbar'>
        <h1><Link className='logo'to='/'>CoinOp</Link></h1>
          </div>

          <div className='grid-navbar-m'>
          
              <button className='button-label'><Link className='label' to='/'>Home</Link></button>
              <button className='button-label'><Link className='label'  to='/profile'>Profile</Link></button>
              <button className='button-label'><Link className='label'  to='/appointment'>Appointment</Link></button>
              <LogoutButton className='button-logout' text='Game Over'/>
            
          </div>
        </section>
        {cookie && <CookieBanner switch={()=> setCookie(false) } />}
        
      <div className='box-chat'>
        {(location.pathname !== "/msg" )&&<Link className='button-chat'  to='/msg'>Chat...</Link>}
      </div>
    </nav>
    
 );

 

 
 }


 



 function CookieBanner(props){
return(
<div className='banner-cookie'>
<p className='text-cookie'>By continuing to browse this site, you agree to the use of 
cookies to identify your session and to remember your login after you close the browser (authentication cookies).</p>

  <button  className='buttuon-cookie-r'onClick={()=>{props.switch()}}> Refuse </button>
  <button  className='buttuon-cookie-a'onClick={()=>{props.switch()}}> Accept all </button>
  {/* <div><img src={prova} alt className='img-cookie'/></div> */}
</div>

)
}
