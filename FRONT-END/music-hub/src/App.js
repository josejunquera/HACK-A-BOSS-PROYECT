import React, { useRef, useState, useEffect } from "react";
// import "./App.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Musicians from "./components/Musicians";
import Create from "./components/Create";
import { useLocalStorage } from "./components/useLocalStorage";
import Bands from "./components/Bands";

export const AuthContext = React.createContext();

const AuthProvider = (props) => {
  const { children } = props;
  const [token, setToken] = useLocalStorage("token");
  return (
    <AuthContext.Provider value={[token, setToken]}>
      {children}
    </AuthContext.Provider>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div>
          <Switch>
            <Route path="/register">
              <Register />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/musicians">
              <Musicians />
            </Route>
            <Route path="/bands">
              <Bands />
            </Route>
            <Route path="/create">
              <Create />
            </Route>
            <Route path="/">
              <LandingPage />
            </Route>
          </Switch>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
