import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Home from "Routes/Home";
import Movie from "Routes/Movie";
import TV from "Routes/TV";
import Search from "Routes/Search";
import Detail from "Routes/Detail";
import Header from "./Header";

export default () => (
  <Router>
    <>
      <Header />
      <Switch>
        <Route path="/" exact component={Home} />
        <PrivateRoute path="/movie" exact component={Movie} />
        <PrivateRoute path="/tv" exact component={TV} />
        <PrivateRoute path="/search" component={Search} />
        <PrivateRoute path="/movie/:id" component={Detail} />
        <PrivateRoute path="/tv/:id" component={Detail} />
        <Redirect from="*" to="/" />
      </Switch>
    </>
  </Router>
);
