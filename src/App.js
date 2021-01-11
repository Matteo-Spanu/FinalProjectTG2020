import React from "react";
import { Route, Switch } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

import   Loading  from "./components/index";
import Home from "./Pages/Home";
import LogIn from "./Pages/LogIn";
import NavBar from "./Pages/NavBar";
import Footer from "./Pages/Footer";
import PersonalProfile from "./Pages/PersonalProfile";
import ProtectedRoute from "./auth/protected-route";
import Chat from "./client/components/App";
import "./App.css";

const App = () => {
  const { isLoading, isAuthenticated } = useAuth0();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div id="app" className="d-flex flex-column h-100">
    { isAuthenticated? <NavBar />:<div/>}
      <div className="container flex-grow-1" style={{paddingTop:'100px'}}>
        <Switch>
          <ProtectedRoute path="/" exact component={Home} />
          <ProtectedRoute path="/profile"  component={PersonalProfile} />
          <ProtectedRoute path="/msg"  component={Chat} />
          <Route path="/login" component={LogIn} />
          <Route path="/loading" component={Loading} />
        </Switch>
      </div>
      <Footer />
    </div>
  );
};

export default App;