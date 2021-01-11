import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
const data = {
  name: "Daniele Bellagente",
  img:
    "https://images.unsplash.com/photo-1511529048424-b3adbbb2ef04?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80",
  review: [
    {
      game: "Minecraft",
      rec:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },
    {
      game: "Age of Empires II",
      rec:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },
    {
      game: "Nba 2k19",
      rec:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },
  ],
};
export default function PersonalProfile() {
  const [section, setSection] = useState("review");

  const Switch = () => {
    switch (section) {
      case "review":
        return <Review />;

      case "list":
        return <List />;

      case "calendar":
        return <Calendar />;

      default:
        return <Review />;
    }
  };

  return (
    <div className="center">
      <div className="borderbox flex">
        <img src={data.img} alt="profile" className="miniimg m-10"></img>
        <h3 className="title">{data.name}</h3>
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

export function Review() {
  return (
    <div>
      <div>
        <form>
          <p className="title">What are you playing?</p>
          <label>Game:</label>
          <input type="text" placeholder="Game" />
          <label>Review:</label>
          <input type="text" placeholder="Review" />
        </form>
      </div>
      <div>{}</div>
    </div>
  );
}
export function List() {
  return <div>List</div>;
}
export function Calendar() {
  return <div>Calendar</div>;
}
