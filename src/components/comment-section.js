import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import '../App.css';
import { patchData } from "../function/getdata";

export default function CommentSection(props) {
  const { user } = useAuth0();
  const { name } = user;
  const [comment, setComment] = useState("");
  const [visible, setVisible] = useState(false);



  const postComment = (p, comment) => {
    
    patchData("http://localhost:4000/post", {
      
          id: p.id,
          fields: {
            User: p.from,
            Post: p.text,
            Img: p.img,
            Comments: comment
          }
        })
  };


  

  const addComment = (e) => {
    e.preventDefault();
    const i = props.allPost.findIndex((post) => {
      return post.id === props.id;
    });
    const post = props.allPost.slice();
    post[i].comments.push({ from: name, text: comment });
    props.setAllPost(post);
    postComment(props.allPost[i],JSON.stringify(props.allPost[i].comments))
    
  };

  return (
    <div className="p-10">
      <button className='button-comment'
        onClick={() => {
          setVisible(!visible);
        }}
      >
        Comment
      </button>
      {visible ? (
        <div>
          {props.comment.map((comm, id) => {
            return (
              <div key={id}>
                <h3 className='utente-comment'>{comm.from}</h3>
                <p className='text-comment'>{comm.text}</p>
              </div>
            );
          })}
          <form onSubmit={addComment}>
            <input className='box-comment'
              type="text"
              placeholder="Comment"
              onChange={(e) => {
                setComment(e.target.value);
              }}
            />
            <button className='button-send' onClick={addComment}>Send</button>
          </form>
        </div>
      ) : (
        <div />
      )}
    </div>
  );
}
