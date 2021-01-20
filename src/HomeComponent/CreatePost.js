import React, { useRef, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { postData } from "../function/getdata";
export default function CreatePost(props) {
  const [mod, setMod] = useState(true);

  return (
    <section className="box-create-content">
      <div className="grid-create-content">
        <div className="item-create-content">
          <button
            className="button-post"
            onClick={() => {
              setMod(true);
            }}
          >
            Post
          </button>
        </div>
        <div className="item-create-content">
          <button
            className="button-review"
            onClick={() => {
              setMod(false);
            }}
          >
            Review
          </button>
        </div>
      </div>
      {mod ? (
        <Post posts={props.posts} setAll={props.setAll} />
      ) : (
        <Recensione posts={props.posts} setAll={props.setAll} />
      )}
    </section>
  );
}

function Post(props) {
  const { user } = useAuth0();
  const inPost = useRef("");

  const { name } = user;

  const [url, setUrl] = useState("");
  const [alt, setAlt] = useState("");

const  handleImageUpload = () => {
  const { files } = document.querySelector('input[type="file"]')
  const formData = new FormData();
  formData.append('file', files[0]);

  formData.append('upload_preset', 'ybbaz9va');
  const options = {
    method: 'POST',
    body: formData,
  };
  

  return fetch('https://api.Cloudinary.com/v1_1/ilbrad/image/upload', options)
    .then(res => res.json())
    .then(res => {
      setUrl(res.secure_url);
       setAlt(res.original_filename)
       return res.secure_url
      })
      .then((img)=>handleSubmit(img))
    .catch(err => console.log(err));
    }

  const addPost = (post) => {
    const copyPost = props.posts.slice();
    copyPost.splice(0, 0, post);
    props.setAll(copyPost);
  };

  const handleSubmit = (url) => {
    let comm = [];
    postData("http://localhost:4000/post", {
      User: name,
      Img: url,
      Post: inPost.current.value,
      Comments: JSON.stringify(comm),
    });
    addPost({
      from: name,
      text: inPost.current.value,
      comments: [],
      type: "post",
      img: url,
    });
  };

  return (
    <div className="create-contenet">
      <form>
        <p className="title">Ehi {name}! </p>
        <input
          className="button-type"
          type="text"
          placeholder="Some news to share?"
          ref={inPost}
        />
        <div className='grid-button-create-content'>
          <input className='button-select-file'type="file"/>
          <button type="button" className="button-post-file" onClick={handleImageUpload}>Submit</button>
          {/* <button type="button" className="button-create-post" onClick={handleImageUpload}>Submit</button> */}
        </div>

      </form>
    </div>
  );
}

function Recensione(props) {
  const { user } = useAuth0();
  const { name } = user;
  const inRev = useRef("");
  const inGame = useRef("");

  const addPost = (post) => {
    const copyPost = props.posts.slice();
    copyPost.splice(0, 0, post);
    props.setAll(copyPost);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let comm = [];
    postData("http://localhost:4000/myrev/" + name, {
      User: name,
      Game: inGame.current.value,
      Review: inRev.current.value,
      Comments: JSON.stringify(comm),
    });
    addPost({
      from: name,
      game: inGame.current.value,
      text: inRev.current.value,
      comments: [],
      type: "review",
    });
  };
  return (
    <div className="create-contenet">
      <form className="content-review">
        <p className="title">What are you playing?</p>

        <div className="box">
          <label className="button-create-review-game">Game:</label>
          <input
            className="button-create-review"
            type="text"
            placeholder="Game"
            ref={inGame}
          />

          <label className="button-create-review-game">Review:</label>
          <input
            className="button-create-review"
            type="text"
            placeholder="Review"
            ref={inRev}
          />
          <button className="button-share-post" onClick={handleSubmit}>
            Post
          </button>
        </div>
      </form>
    </div>
  );
}
