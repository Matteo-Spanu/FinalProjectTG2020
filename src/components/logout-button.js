import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const LogoutButton = (props) => {
  const { logout } = useAuth0();
  return (
    <button
      className="btn btn-danger btn-block"
      onClick={() =>
        logout({
          returnTo:'http://localhost:3000/login',
        })
      }
    >
     { props.text || 'Log Out'}
    </button>
  );
};

export default LogoutButton;