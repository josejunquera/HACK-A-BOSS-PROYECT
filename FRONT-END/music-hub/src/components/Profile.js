import React from "react";

import { Link, Switch, Route, useRouteMatch } from "react-router-dom";
import UpdateUser from "./UpdateUser";
import UpdateMusician from "./UpdateMusician";
import UpdateBand from "./UpdateBand";
import UpdateVenueEvent from "./UpdateVenueEvent";
import UpdatePassword from "./UpdatePassword";
import Messages from "./Messages";

function Profile() {
  let { path, url } = useRouteMatch();

  return (
    <div>
      <div>
        <button type="submit">
          <Link to={`${url}/user-profile`}>Perfil de usuario</Link>
        </button>
        <button type="submit">
          <Link to={`${url}/musician-profile`}>Perfil de músico</Link>
        </button>
        <button type="submit">
          <Link to={`${url}/band-profile`}>Perfil de banda</Link>
        </button>
        <button type="submit">
          <Link to={`${url}/venue-event-profile`}>Perfil de local/evento</Link>
        </button>
        <button type="submit">
          <Link to={`${url}/messages`}>Mensajes</Link>
        </button>
        <button type="submit">
          <Link to={`${url}/change-password`}>Cambiar contraseña</Link>
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
