import React, { useEffect, useState } from "react";
const postprova = [
  {
    from: "Valero",
    type: "post",
    text: "Ultimo livello finito! ",
    img:
      "https://images.unsplash.com/photo-1585671962215-473bcfa06caa?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=771&q=80",
  },
  {
    from: "RizzoRules",
    type: "review",
    game: "Cyberpunk2077",
    text: "ridatemi i miei soldi",
  },
];
export default function SeePost() {
  const [allPost, setAllPost] = useState([]);

  useEffect(() => {
    setAllPost(postprova);
  }, []);

  const Postmapper = (props) => {
    if (props.posts.length > 1) {
      return props.posts.map((post, id) => {
        return post.type === "post" ? (
          <div key={id}>
            <PostLayout post={post} />
            <hr className='line'></hr>
          </div>
        ) : (
          <div key={id}>
            <ReviewLayout review={post} />
            <hr className='line'></hr>
          </div>
        );
      });
    } else {
      return <div>loading post...</div>;
    }
  };

  return (
    <div>
      <Postmapper posts={allPost} />
    </div>
  );
}

export function PostLayout(props) {
  const { from, text, img } = props.post;
  return (
    <div className="borderbox m-10">
      <div className="p-10">
        <h3 className="title">{from}</h3>
        <p>{text}</p>{" "}
      </div>
      <img src={img} alt="post" style={{ width: "100%" }} />
    </div>
  );
}

export function ReviewLayout(props) {
  const { from, text, game } = props.review;
  return (
    <div className="borderbox m-10 p-10">
      <h3 className="title">
        {from} reviewed {game}
      </h3>
      <p>{text}</p>
    </div>
  );
}
