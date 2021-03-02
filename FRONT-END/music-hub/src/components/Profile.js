import React from "react";
import NavBar from "./NavBar";
import Footer from "./Footer";
import { Link, Switch, Route, useRouteMatch } from "react-router-dom";
import UpdateUser from "./UpdateUser";
import UpdateMusician from "./UpdateMusician";
import UpdateBand from "./UpdateBand";
import UpdateVenueEvent from "./UpdateVenueEvent";

function Profile() {
  let { path, url } = useRouteMatch();

  return (
    <div>
      <div>
        <button type="submit">
          <Link to={`${url}/user-profile`}>Información de usuario</Link>
        </button>
        <button type="submit">
          <Link to={`${url}/musician-profile`}>Informacion de músico</Link>
        </button>
        <button type="submit">
          <Link to={`${url}/band-profile`}>Informacion de Banda</Link>
        </button>
        <button type="submit">
          <Link to={`${url}/venue-event-profile`}>Informacion del local</Link>
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
      </Switch>
    </div>
  );
}

export default Profile;
