import React, { useEffect, useState, useRef } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { getData, postData, patchData } from "../function/getdata";

export default function PersonalProfile() {
  const [section, setSection] = useState("review");
  const [review, setReview] = useState([]);
  const [list, setList] = useState([]);
  const { user } = useAuth0();
  const { name , picture} = user;
  useEffect(() => {

    getData("http://localhost:4000/myrev/" + name, setReview);

  }, []);


  useEffect(() => {
    getData("http://localhost:4000/mylist/"+name,setList)
    
    
  }, []);


  useEffect(() => {

   console.log(review);

  }, [review]);
 

  const Switch = () => {
    switch (section) {
      case "review":
        return <Review review={review} setReview={setReview} />;

      case "list":
        return <List list={list} setList={setList} />;

      case "calendar":
        return <Calendar />;

      default:
        return <Review />;
    }
  };

  return (
    <div className="center">
      <div className="borderbox flex">
        <img src={picture} alt="profile" className="miniimg m-10"></img>
        <h3 className="title">{name}</h3>
      </div>
      <button
        onClick={() => {
          setSection("review");
        }}
      >
        Recensioni
      </button>
      <button
        onClick={() => {
          setSection("list");
        }}
      >
        Lista desideri
      </button>
      <button
        onClick={() => {
          setSection("calendar");
        }}
      >
        Calendario
      </button>
      <div>
        <Switch />
      </div>
    </div>
  );
}



//sezione delle review personali

export function Review(props) {
  const inputGame = useRef("");
  const inputRev = useRef("");
  
  const { user } = useAuth0();
  const { name } = user;

const addReview =(rev)=>{
  const copyRev= props.review.slice();
  copyRev.splice(0, 0, rev);
  props.setReview(copyRev);
};

  const handleSubmit = (e) => {
    e.preventDefault();
    postData("http://localhost:4000/myrev/" + name, {
      User:name,
      Game: inputGame.current.value,
      Review: inputRev.current.value,
      Comments: "",
    });
    addReview({game: inputGame.current.value, text:inputRev.current.value, comments:[]})
  };
  return (
    <div>
      <div>
        <form onSubmit={handleSubmit} >
          <p className="title">What are you playing?</p>
          <label>Game:</label>
          <input type="text" placeholder="Game" ref={inputGame} />
          <label>Review:</label>
          <input type="text" placeholder="Review" ref={inputRev} />
          <button onClick={handleSubmit}>Post</button>
        </form>
      </div>
      <div>
        {props.review.map((rec, i) => {
          return (
            <div className="borderbox m-10" key={i}>
              <h3>{rec.game}</h3>
              <p>{rec.text}</p>
              <Comments comment={rec.comments} id={i} allPost={props.review} setAllPost={props.setReview}/>
            </div>
          );
        })}
      </div>
    </div>
  );
}


export function List(props) {

  const inputGame = useRef("");

  const handleSubmit = (e) => {
    e.preventDefault()

    console.log({game:inputGame.current.value})
  };

  return (
    <div>
      <div>
        <form onSubmit={handleSubmit}>
          <p className="title">What are you wishing for?</p>
          <label>Game:</label>
          <input type="text" placeholder="Game" ref={inputGame}/>
          <button onClick={handleSubmit}>Add</button>
        </form>
      </div>
      <div>{props.list.map((rec,i)=>{
        return <div className="borderbox m-10" key={i}>
          <h3>{rec.game}</h3>
        </div>})}</div>
    </div>
  );

export  function Comments(props) {
  const { user } = useAuth0();
  const { name } = user;
  const [comment, setComment] = useState("");
  const [visible, setVisible] = useState(false);
  
  
  const postComment = (rev, comment) => {
    
    patchData("http://localhost:4000/myrev/" + name, {
      
          id: rev.id,
          fields: {
            User: name,
            Game: rev.game,
            Review: rev.text,
            Comments: comment
          }
        })
  };


  
  const addComment = (e) => {
    e.preventDefault();
    const post = props.allPost.slice();
    post[props.id].comments.push({ from: name, text: comment });
    props.setAllPost(post);
    postComment(props.allPost[props.id],JSON.stringify(props.allPost[props.id].comments))
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







export function Calendar() {
  return <div>Calendar</div>;
}
