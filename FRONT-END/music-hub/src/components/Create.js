import React from "react";

import { Link, Switch, Route, useRouteMatch } from "react-router-dom";
import CreateBand from "./CreateBand";
import CreateMusician from "./CreateMusicians";
import CreateVenueEvent from "./CreateVenueEvent";
import NavBar from "./NavBar";

function Create(props) {
  // const { path } = props
  let { path, url } = useRouteMatch();

  return (
    <div>
      <NavBar />
      <div>
        <button type="submit">
          <Link to={`${url}/create-musician`}>Crear Músico</Link>
        </button>
        <button type="submit">
          <Link to={`${url}/create-band`}>Crear Banda</Link>
        </button>
        <button type="submit">
          <Link to={`${url}/create-venue-event`}>Crear Local/Evento</Link>
        </button>
      </div>

      <Switch>
        <Route path={`${path}/create-musician`}>
          <CreateMusician />
        </Route>
        <Route path={`${path}/create-band`}>
          <CreateBand />
        </Route>
        <Route path={`${path}/create-venue-event`}>
          <CreateVenueEvent />
        </Route>
      </Switch>
    </div>
  );
}

export default Create;
