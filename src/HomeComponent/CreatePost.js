import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

export default function CreatePost(props){
    const [mod, setMod] = useState(true);
return(<section className='p-10'>
<button onClick={()=>{setMod(true)}}>post</button>
<button onClick={()=>{setMod(false)}}>review</button>
{mod? <Post/>:<Recensione/>}
</section>)
}

function Post(){
    const { user } = useAuth0();
  const { name } = user;
    return(<div>
        <form>
        <p className='title'>Ehi {name}! </p>
            <input 
            type='text'
            placeholder='Some news to share?' />
        </form>
    </div>)
}

function Recensione(){
    return(<div> <form>
    <p className='title'>What are you playing?</p>
    <label>Game:</label>
    <input type='text' placeholder='Game'/>
    <label>Review:</label>
        <input 
        type='text'
        placeholder='Review' />
    </form></div>)
}