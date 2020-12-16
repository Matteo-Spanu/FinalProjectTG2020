import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

export default function Home(){
    const { user } = useAuth0();
    const { name} = user;

return(<><h1>HOMMMME</h1>
<p>Welcome {name}</p></>)
}