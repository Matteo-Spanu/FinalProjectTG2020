import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

export default function CommentSection(props) {
  const { user } = useAuth0();
  const { name } = user;
  const [comment, setComment] = useState("");
  const [visible, setVisible] = useState(false);

  const addComment = (e) => {
    e.preventDefault();
    const i = props.allPost.findIndex((post) => {
      return post.id === props.id;
    });
    const post = props.allPost.slice();
    post[i].comment.push({ from: name, text: comment });
    props.setAllPost(post);
  };

  return (
    <div className="p-10">
      <button
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
                <h3>{comm.from}</h3>
                <p>{comm.text}</p>
              </div>
            );
          })}
          <form onSubmit={addComment}>
            <input
              type="text"
              placeholder="comment"
              onChange={(e) => {
                setComment(e.target.value);
              }}
            />
            <button onClick={addComment}>send</button>
          </form>
        </div>
      ) : (
        <div />
      )}
    </div>
  );
}
