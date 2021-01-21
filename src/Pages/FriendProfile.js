import React, { useEffect, useState, useRef } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import {
  getData,
  postData,
  patchData,
  deleteData,
  getGame,
} from "../function/getdata";
import { useParams } from "react-router-dom";

export default function PersonalProfile() {
  const [section, setSection] = useState("review");
  const [review, setReview] = useState([]);
  const [list, setList] = useState([]);
  const [calendar, setCalendar] = useState([]);
  const [favourite, setFavourite] = useState([]);
  const [picture, setProfile] = useState("");
  const { user } = useAuth0();
  const { name} = user;
  let { namefr } = useParams();
  useEffect(() => {
    getData("http://localhost:4000/myrev/" + namefr, setReview);
  }, []);

  useEffect(() => {
    getData("http://localhost:4000/mylist/" + namefr, setList);
  }, []);

  useEffect(() => {
    getData("http://localhost:4000/myevent/" + namefr, setCalendar);
  }, []);

  useEffect(() => {
    getData("http://localhost:4000/favourite/" + namefr, setFavourite);
  }, []);
  useEffect(() => {
    getData("http://localhost:4000/profile/" + namefr, setProfile);
  }, []);

  const Switch = () => {
    switch (section) {
      case "review":
        return <Review review={review} setReview={setReview} />;

      case "list":
        return <List list={list} setList={setList} />;

      case "calendar":
        return <Calendar calendar={calendar} setCalendar={setCalendar} />;

      case "favourite":
        return <Favourite favourite={favourite} setFavourite={setFavourite} />;

      default:
        return <Review />;
    }
  };

  return (
    <div className="center">
      <div className="borderbox-profile">
        <img src={picture} alt="profile" className="miniimg m-10"></img>
        <div className="box-title-profile">
          <h3 className="title-title">{namefr}</h3>
        </div>
      </div>

      <div className="box-profile-content">
        <div className="grid-profile-content">
          <button
            className="button-profile-r"
            onClick={() => {
              setSection("review");
            }}
          >
            <p className="info-button">Recensioni</p>
          </button>
        </div>

        <div className="grid-profile-content">
          <button
            className="button-profile-d"
            onClick={() => {
              setSection("list");
            }}
          >
            <p className="info-button">Lista desideri</p>
          </button>
        </div>

        <div className="grid-profile-content">
          <button
            className="button-profile-c"
            onClick={() => {
              setSection("calendar");
            }}
          >
            <p className="info-button">Calendario</p>
          </button>
        </div>

        <div className="grid-profile-content">
          <button
            className="button-profile-p"
            onClick={() => {
              setSection("favourite");
            }}
          >
            <p className="info-button">Giochi preferiti</p>
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

  

  
  return (
    <div>

      <div>
        {props.review.map((rec, i) => {
          return (
            <div className="borderbox m-10" key={i}>
              <div className="p-10">
                <h3 className="title">{rec.game}</h3>
                <p className="text-p">{rec.text}</p>
              </div>
              <Comments
                comment={rec.comments}
                id={i}
                allPost={props.review}
                setAllPost={props.setReview}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function List(props) {
 

  return (
      <div className='lista-desideri-grid'>
        {props.list.map((rec, i) => {
          return (<div className="border-grid" key={i}>
              <h3 className="title-game">{rec.game}</h3>
              <a href={rec.critic } target="_blank" rel="noreferrer"><img className='img-desideri' src={rec.url} alt="coverGame" /></a>
            </div>
          );
        })}
      </div>
  );
}

export function Comments(props) {
  const { user } = useAuth0();
  const { name } = user;
  const [comment, setComment] = useState("");
  const [visible, setVisible] = useState(false);
  let { namefr } = useParams();
  const postComment = (rev, comment) => {
    patchData("http://localhost:4000/myrev/" + namefr, {
      id: rev.id,
      fields: {
        User: namefr,
        Game: rev.game,
        Review: rev.text,
        Comments: comment,
      },
    });
  };

  const addComment = (e) => {
    e.preventDefault();
    const post = props.allPost.slice();
    post[props.id].comments.push({ from: name, text: comment });
    props.setAllPost(post);
    postComment(
      props.allPost[props.id],
      JSON.stringify(props.allPost[props.id].comments)
    );
  };

  return (
    <div className="p-10">
      <button
        className="button-comment"
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
                <h3 className="utente-comment">{comm.from}</h3>
                <p className="text-comment">{comm.text}</p>
              </div>
            );
          })}
          <form onSubmit={addComment}>
            <input
              className="box-comment"
              type="text"
              placeholder="Comment"
              onChange={(e) => {
                setComment(e.target.value);
              }}
            />
            <button className="button-send" onClick={addComment}>
              Send
            </button>
          </form>
        </div>
      ) : (
        <div />
      )}
    </div>
  );
}

export function Calendar(props) {
    const { user } = useAuth0();
    const { name } = user;
    const inputGame = useRef("");
    const inputDate = useRef("");
  
    const addList =(rev)=>{
      const copyList= props.calendar.slice();
      copyList.splice(0, 0, rev);
      props.setCalendar(copyList);
    };
  
  
  
    
      const handleSubmit = (e) => {
        e.preventDefault();
        postData("http://localhost:4000/myevent/" + name, {
          User: name,
          Dates: inputDate.current.value,
          Partecipants: JSON.stringify([]),
          Game: inputGame.current.value
         
         
        });
        addList({
          user: name,
          game: inputGame.current.value,
          date: inputDate.current.value,
          partecipants: []
        })
      };
  

      const addPartecipant = (ev, i) => {
        const appointment = props.calendar.slice();
        appointment[i].partecipants.push(name);
        props.setCalendar(appointment);
        patchPar(ev)
      };

      const patchPar = (ev) => {
        patchData("http://localhost:4000/allevent", {
            id:ev.id,
        fields:{User: ev.user,
          Dates: ev.date,
          Partecipants: JSON.stringify(ev.partecipants),
          Game: ev.game}
         
      });}
  
      
    return (
      <div className='box-create-content'>
        <div>{props.calendar.map((ev,i)=>{
          return <div className="borderbox-appointment" key={i}>
           <h3 className="title-appointment">{ev.user} wants to play {ev.game}</h3>
           <div className='grid-date'>
            <p className='info-text-appointment-date'>{ev.date}</p>
            {ev.partecipants.length>0? <p className='info-text-appointment' >Joined: {ev.partecipants.join(', ')}</p>:<p>Join first</p>}
              <button className='button-join-appointment' onClick={()=>addPartecipant(ev, i)}>Join</button>
            </div>
          </div>})}</div>
        </div>
    );
}

export function Favourite(props) {
  

  return (
    <div>
     
      <div className='lista-desideri-grid'>
        {props.favourite.map((rec, i) => {
          return (
            <div className="border-grid" key={i}>

              <h3 className="title-game-desideri-friend">{rec.game}</h3>
              <div className='provaaa'>
                <a href={rec.critic } target="_blank" rel="noreferrer"><img className='img-desideri' src={rec.url} alt="coverGame" /></a> 
              </div>
              
            </div>
          );
        })}
      </div>
    </div>
  );
}
