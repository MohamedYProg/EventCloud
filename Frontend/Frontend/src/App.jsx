// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import EventsList from "./components/EventsList";
import MyEvents from "./components/MyEvents";
import AddEventForm from "./components/AddEventForm";
import "./styles/App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/login" component={LoginPage} />
          <Route exact path="/" component={EventsList} />
          <Route path="/my-events" component={MyEvents} />
          <Route path="/add-event" component={AddEventForm} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
