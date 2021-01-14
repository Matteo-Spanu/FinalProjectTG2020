import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

export default function CreatePost(props){
    const [mod, setMod] = useState(true);
return(
<section className='box-create-content'>
    <button className='button-post' onClick={()=>{setMod(true)}}>Post</button>
    <button className='button-review' onClick={()=>{setMod(false)}}>Review</button>
    {mod? <Post/>:<Recensione/>}
</section>

)


}

function Post(){
    const { user } = useAuth0();
  const { name } = user;
    return(<div className='create-contenet'>
        <form>
        <p className='title'>Ehi {name}! </p>
            <input className='button-type'
            type='text'
            placeholder='Some news to share?' />
        </form>
    </div>)
}

function Recensione(){
    return(
    <div className='create-contenet'> 
        <form className='content-review'>
            <p className='title'>What are you playing?</p>
            <div className='box'>
            <label className='button-create-review-game'>Game:</label>
            <input className='button-create-review' type='text' placeholder='Game'/>

            <label className='button-create-review-game'>Review:</label>
                <input className='button-create-review' type='text' placeholder='Review' />
            </div>
        </form>
    </div>)
}