import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import axios from 'axios';
import routes from "./routes";
import './App.css';

function App() {
  return (
    <Router basename="/">
      <div style={{backgroundImage: "url(/image.jpg)", backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition:'center'}}>
        {routes.map((route, index) => {
          return (
            <Route
              key={index}
              path={route.path}
              exact={route.exact}
              component={route.component}
            />
          );
        })}
      </div>
    </Router>
  );
}

export default App;
