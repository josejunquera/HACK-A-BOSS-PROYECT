import React from "react";

import { Link, Switch, Route, useRouteMatch } from "react-router-dom";
import UpdateUser from "./UpdateUser";
import UpdateMusician from "./UpdateMusician";
import UpdateBand from "./UpdateBand";
import UpdateVenueEvent from "./UpdateVenueEvent";
import UpdatePassword from "./UpdatePassword";
import Messages from "./Messages";
import "./Profile.css";

function Profile() {
  let { path, url } = useRouteMatch();

  return (
    <div className="profile-buttons">
      <div className="buttons-wrapper">
        <button type="submit">
          <Link to={`${url}/user-profile`}>USUARIO</Link>
        </button>
        <button type="submit">
          <Link to={`${url}/musician-profile`}>MÚSICO</Link>
        </button>
        <button type="submit">
          <Link to={`${url}/band-profile`}>BANDA</Link>
        </button>
        <button type="submit">
          <Link to={`${url}/venue-event-profile`}>LOCAL-EVENTO</Link>
        </button>
        <button type="submit">
          <Link to={`${url}/messages`}>MENSAJES</Link>
        </button>
        <button type="submit">
          <Link to={`${url}/change-password`}>CAMBIAR CONTRASEÑA</Link>
        </button>
      </div>

      <Switch>
        <Route path={`${path}/user-profile`}>
          <UpdateUser />
        </Route>
        <Route path={`${path}/musician-profile`}>
          <UpdateMusician />
        </Route>
        <Route path={`${path}/band-profile`}>
          <UpdateBand />
        </Route>
        <Route path={`${path}/venue-event-profile`}>
          <UpdateVenueEvent />
        </Route>
        <Route path={`${path}/messages`}>
          <Messages />
        </Route>
        <Route path={`${path}/change-password`}>
          <UpdatePassword />
        </Route>
      </Switch>
    </div>
  );
}

export default Profile;
