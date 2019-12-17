import React from "react";
import Login from "./components/Login";

import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import UserInfo from "./components/UserInfo";

function App() {
  return (
    <Router>
      <div className="App">
        <Route exact path="/" component={Login} />
        <Route path="/oauth2/callback" exact component={UserInfo} />
      </div>
    </Router>
  );
}

export default App;
