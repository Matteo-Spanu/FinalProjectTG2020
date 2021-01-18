import React, { useRef, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { postData } from "../function/getdata";

export default function CreatePost(props){
    const [mod, setMod] = useState(true);
   
return(
<section className='box-create-content'>

    <div className='grid-create-content'>
        <div className='item-create-content'>
            <button className='button-post' onClick={()=>{setMod(true)}}>Post</button>
        </div>
        <div className='item-create-content'>
            <button className='button-review' onClick={()=>{setMod(false)}}>Review</button>
        </div>
    </div>
    {mod? <Post posts={props.posts} setAll={props.setAll}/>:<Recensione posts={props.posts} setAll={props.setAll}/>}

</section>
)}

function Post(props){
    const { user } = useAuth0();
const inPost= useRef("")

const { name } = user;

const addPost =(post)=>{
    const copyPost= props.posts.slice();
    copyPost.splice(0, 0, post);
    props.setAll(copyPost);
  };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      let comm= []
      postData("http://localhost:4000/post", {
        User:name,
        Img: "",
        Post: inPost.current.value,
        Comments: JSON.stringify(comm),
      });
      addPost({from: name, text:inPost.current.value, comments:[], type:"post", img:""})
    };


 
    return(<div className='create-contenet'>
        <form>
        <p className='title'>Ehi {name}! </p>
            <input className='button-type'
            type='text'
            placeholder='Some news to share?' 
            ref={inPost}
             />
            <button onClick={handleSubmit}>Post</button>
        </form>
    </div>)
}

function Recensione(props){

    const { user } = useAuth0();
    const { name } = user;
    const inRev= useRef("")
    const inGame= useRef("")
    
    
    
    const addPost =(post)=>{
        const copyPost= props.posts.slice();
        copyPost.splice(0, 0, post);
        props.setAll(copyPost);
      };
      
        const handleSubmit = (e) => {
          e.preventDefault();
  let comm=[]
          postData("http://localhost:4000/myrev/" + name, {
            User:name,
            Game: inGame.current.value,
            Review: inRev.current.value,
            Comments: JSON.stringify(comm),
          });
          addPost({from: name, game:inGame.current.value, text:inRev.current.value, comments:[], type:"review"})
        };
    return(
    <div className='create-contenet'> 
        <form className='content-review'>
            <p className='title'>What are you playing?</p>
            
            <div className='box'>
            <label className='button-create-review-game'>Game:</label>
            <input className='button-create-review' type='text' placeholder='Game' ref={inGame}/>

            <label className='button-create-review-game'>Review:</label>
                <input className='button-create-review' type='text' placeholder='Review' ref={inRev} />
                <button onClick={handleSubmit}>Post</button>
            </div>
        </form>
    </div>)
}