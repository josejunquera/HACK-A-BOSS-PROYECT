import React from "react";

import { Link, Switch, Route, useRouteMatch } from "react-router-dom";
import CreateMusician from "./CreateMusicians";

function Create(props) {
  // const { path } = props
  let { path, url } = useRouteMatch();

  return (
    <div>
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
          <CreateMusician />
        </Route>
        <Route path={`${path}/create-venue-event`}>
          <CreateMusician />
        </Route>
      </Switch>
    </div>
  );
}

export default Create;
