import React, { useEffect, useState } from "react";
import CommentSection from '../components/comment-section'
import { getData} from "../function/getdata";
import CreatePost from "../HomeComponent/CreatePost";

const postprova = [
  {
    id:'mklmKkflkm',
    from: "Valero",
    type: "post",
    text: "Ultimo livello finito! ",
    img:
      "https://images.unsplash.com/photo-1585671962215-473bcfa06caa?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=771&q=80",
    comment: [],
  },
  {
    id:'sflkIKML',
    from: "RizzoRules",
    type: "review",
    game: "Cyberpunk2077",
    text: "ridatemi i miei soldi",
    comment: [],
  },
];
export default function SeePost() {
  const [allPost, setAllPost] = useState([]);

  useEffect(() => {
    getData("http://localhost:4000/post",setAllPost)
 
  }, []);

  const Postmapper = (props) => {
    if (props.posts.length > 1) {
      return props.posts.map((post, id) => {
        return post.type === "post" ? (
          <div key={id}>
            <PostLayout post={post} allPost={allPost} setAllPost={setAllPost} />
            <hr className="line"></hr>
          </div>
        ) : (
          <div key={id}>
            <ReviewLayout review={post} allPost={allPost} setAllPost={setAllPost} />
            <hr className="line"></hr>
          </div>
        );
      });
    } else {
      return <div>loading post...</div>;
    }
  };

  return (
    <div>
         <CreatePost posts={allPost} setAll={setAllPost}/>
      <Postmapper posts={allPost} />
    </div>
  );
}

export function PostLayout(props) {
  const { from, text, img, comments, id } = props.post;
  return (
    <div className="borderbox m-10"> 
      <div className="p-10">
        <h3 className="title">{from}</h3>
        <div className='box-text-post'><p className='text-p'>{text}</p>{" "}</div>
      </div>
      {img && <img className='img-post' src={img} alt="post" style={{ width: "100%", }}/>}
      <CommentSection comment={comments} id={id} allPost={props.allPost} setAllPost={props.setAllPost}/>
    </div>
  );
}

export function ReviewLayout(props) {
  const { from, text, game, comment, id } = props.review;
  return (
    <div className="borderbox m-10 ">
     <div className="p-10">
      <h3 className="title">
        {from} reviewed {game}
      </h3>
      <p className='text-p'>{text}</p>
      </div>
      <CommentSection comment={comment} id={id} allPost={props.allPost} setAllPost={props.setAllPost} />
    </div>
  );
}

