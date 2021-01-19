import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

import SeePost from "../HomeComponent/SeePost";

export default function Home() {
  const { user } = useAuth0();
  const { name } = user;

  return (

      <div className='center'>
        <SeePost />
      </div>
    
  );
}
