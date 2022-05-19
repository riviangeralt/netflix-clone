import React from "react";
import "./App.css";
import Login from "./components/Login";
import Profiles from "./components/Profiles";
import NewProfile from "./components/Profiles/NewProfile";
import Account from "./components/Account";
import Movie from "./components/Account/Movie";
import Season from "./components/Account/Season";
import Episode from "./components/Account/Episode";
import Collection from "./components/Account/Collection";
import { Switch, Route, withRouter } from "react-router-dom";
import PrivateRoute from "./components/Routes/PrivateRoute";

function App(props) {
  return (
    <div className="App">
      <Switch>
        <PrivateRoute
          exact
          path="/collection/:collectionId"
          component={Collection}
        />
        <PrivateRoute
          exact
          path="/tv/:tvId/season/:season/episode/:episode"
          component={Episode}
        />
        <PrivateRoute
          exact
          path="/tv-show/:tvId/season/:season"
          component={Season}
        />
        <PrivateRoute exact path="/tv/:tvShowId" component={Movie} />
        <PrivateRoute exact path="/movie/:movieId" component={Movie} />
        <PrivateRoute exact path="/account/:id" component={Account} />
        <PrivateRoute
          exact
          path="/manage/:id"
          component={NewProfile}
          isEdit={true}
        />
        <PrivateRoute exact path="/new-profile" component={NewProfile} />
        <PrivateRoute path="/profiles" component={Profiles} />
        <Route exact path="/" component={Login} />
        {/* for not found routes */}
        <Route exact path="*" render={() => <h1>404</h1>} />
      </Switch>
    </div>
  );
}

export default withRouter(App);
