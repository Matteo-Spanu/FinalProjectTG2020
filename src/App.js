import React from "react";
import { Route, Switch } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

import   Loading  from "./components/index";
import Home from "./Pages/Home";
import LogIn from "./Pages/LogIn";

import ProtectedRoute from "./auth/protected-route";

import "./App.css";

const App = () => {
  const { isLoading } = useAuth0();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div id="app" className="d-flex flex-column h-100">
      {/* <NavBar /> */}
      <div className="container flex-grow-1">
        <Switch>
          <ProtectedRoute path="/" exact component={Home} />
          <Route path="/login" component={LogIn} />
          <Route path="/loading" component={Loading} />
        </Switch>
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default App;