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
        <div className='box-title-profile'>
          <h3 className="title-title">{name}</h3>
          
          </div>
      </div>

      <div className='box-profile-content'>
        <div className='grid-profile-content'>
        <button className='button-profile-r' onClick={() => { setSection("review");}}>
          <p className='info-button'>Recensioni</p> 
        </button>
        </div>

        <div className='grid-profile-content'>
        <button className='button-profile-d' onClick={() => {setSection("list");}}>
        <p className='info-button'>Lista desideri</p> 
        </button>
        </div>
        
        <div className='grid-profile-content'>
        <button className='button-profile-c' onClick={() => { setSection("calendar");}}>
        <p className='info-button'>Calendario</p> 
        </button>
        </div>

      </div>

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

      <div className='create-contenet'>
        <form className='content-review' onSubmit={handleSubmit} >
          <p className="title">What are you playing?</p>
            <div className='box'>
              <label className='button-create-review-game' >Game:</label>
              <input className='button-create-review' type="text" placeholder="Game" ref={inputGame} />
              
              <label className='button-create-review-game' >Review:</label>
              <input className='button-create-review' type="text" placeholder="Review" ref={inputRev} />
              
              <button className='button-share-post' onClick={handleSubmit}>Post</button>
            </div>
        </form>
      </div>


      <div>
        {props.review.map((rec, i) => {
          return (
            <div className="borderbox m-10" key={i}>
              <div className='p-10'>
              <h3 className='title'>{rec.game}</h3>
              <p className='text-p'>{rec.text}</p>
              </div>
              <Comments comment={rec.comments} id={i} allPost={props.review} setAllPost={props.setReview}/>
            </div>
          );
        })}
      </div>
    </div>
  );
}


export function List(props) {
  const { user } = useAuth0();
  const { name } = user;
  const inputGame = useRef("");

  const addReview =(rev)=>{
    const copyRev= props.list.slice();
    copyRev.splice(0, 0, rev);
    props.setList(copyRev);
  };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      postData("http://localhost:4000/mylist/" + name, {
        User:name,
        Game: inputGame.current.value,
      });
      addReview({game: inputGame.current.value})
    };

  return (
    <div>
      <div className='create-contenet'>
        <form className='content-review' onSubmit={handleSubmit}>
            <p className="title">What are you wishing for?</p>
        <div className='box'>
            <label className='button-create-review-game'>Game:</label>
            <input  className='button-create-review' type="text" placeholder="Game" ref={inputGame}/>
            <button className='button-share-post' onClick={handleSubmit}>Add</button>
            </div>
        </form>
      </div>
      <div>{props.list.map((rec,i)=>{
        return <div className="borderbox m-10" key={i}>
          <h3 className="title-game">{rec.game}</h3>
        </div>})}</div>
    </div>
  );
}

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
