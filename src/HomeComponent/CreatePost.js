import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

export default function CreatePost(props){
    const [mod, setMod] = useState(true);
return(<section>
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
        <p>Ehi {name}!Some news to share?</p>
            <input 
            type='text' />
        </form>
    </div>)
}

function Recensione(){
    return(<div> <form>
    <p>What are you playing?</p>
    <label>Game:</label>
    <input type='text' placeholder='Game'/>
    <label>Review:</label>
        <input 
        type='text' />
    </form></div>)
}