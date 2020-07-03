import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "bulma/css/bulma.css";
import AuthService from "./services/auth-services";

//components
import Home from "./components/Home";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import Profile from "./components/workers/Profile";
import Jobs from "./components/employers/JobList";
import ProtectedRoute from "./services/protected-routes";
import NavBar from "./components/NavBar";

function App() {
  const [loggedInUser, setLoggedInUser] = useState(null);

  const service = new AuthService();

  const fetchUser = () => {
    if (loggedInUser === null) {
      service
        .loggedin()
        .then((res) => {
          setLoggedInUser(res);
        })
        .catch((err) => {
          setLoggedInUser(false);
        });
    }
  };

  const getTheUser = (userObj) => {
    setLoggedInUser(userObj);
  };

  fetchUser();

  if (loggedInUser) {
    return (
      <Router>
        <NavBar getUser={getTheUser} userInSession={loggedInUser} />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/jobs" exact component={Jobs} />
          <ProtectedRoute
            user={loggedInUser}
            path="/profile"
            exact
            component={Profile}
          />
        </Switch>
      </Router>
    );
  } else {
    return (
      <Router>
        <NavBar userInSession={loggedInUser} />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/jobs" exact component={Jobs} />
          <Route
            path="/workers/login"
            exact
            render={() => <Login getUser={getTheUser} />}
          />
          <Route
            path="/workers/signup"
            exact
            render={() => <Signup getUser={getTheUser} />}
          />
          <ProtectedRoute
            user={loggedInUser}
            path="/profile"
            exact
            component={Profile}
          />
        </Switch>
      </Router>
    );
  }
}

export default App;
