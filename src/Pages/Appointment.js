import React, { useEffect,useRef,useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { getData, postData, patchData, deleteData } from "../function/getdata";



export default function Home() {
  const { user } = useAuth0();
  const { name } = user;
  const [calendar, setCalendar] = useState([]);

  useEffect(() => {
    getData("http://localhost:4000/allevent", setCalendar)
    
    
  }, []);
  return (
    <div className='center'>
 
 <Calendar calendar={calendar} setCalendar={setCalendar}/>
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
        <div className='create-contenet'>
          <form className='content-review' onSubmit={handleSubmit}>
              <p className="title">Create new appointment</p>
          <div className='box'>
              <label className='button-create-review-game'>Game:</label>
              <input  className='button-create-review' type="text" placeholder="Game" ref={inputGame}/>
              <label className='button-create-review-game'>Date:</label>
              <input  className='button-create-review' type="datetime-local" placeholder="date" ref={inputDate}/>
              <button className='button-share-post' onClick={handleSubmit}>Add</button>
              </div>
          </form>
        </div>
        <div>{props.calendar.map((ev,i)=>{
          return <div className="borderbox m-10" key={i}>
           <h3 className="title-game">{ev.user} wants to play {ev.game}</h3>
           <p>on: {ev.date}</p>
           <p>Joined: {ev.partecipants.join(', ')}</p>
            <button onClick={()=>addPartecipant(ev, i)}>Join</button>
          </div>})}</div>
        </div>
    );
  }