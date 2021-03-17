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
        <Link to={`${url}/user-profile`}>
          <button type="submit">USUARIO</button>
        </Link>
        <Link to={`${url}/musician-profile`}>
          <button type="submit">MÚSICO</button>
        </Link>
        <Link to={`${url}/band-profile`}>
          <button type="submit">BANDA</button>
        </Link>
        <Link to={`${url}/venue-event-profile`}>
          <button type="submit">LOCAL-EVENTO</button>
        </Link>
        <Link to={`${url}/messages`}>
          <button type="submit">MENSAJES</button>
        </Link>
        <Link to={`${url}/change-password`}>
          <button type="submit">CAMBIAR CONTRASEÑA</button>
        </Link>
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
