import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";
import makeExercise from "Redux/reducers/Exercises";
import "assets/css/material-dashboard-react.css?v=1.5.0";
import "./Style.css" 

import indexRoutes from "routes/index.jsx";

const hist = createBrowserHistory();
const store = createStore(makeExercise);

ReactDOM.render(
  <Provider store={store} key={1}>
    <Router history={hist} key={2}>
      <Switch>
        {indexRoutes.map((prop, key) => {
          return (
            <Route path={prop.path} component={prop.component} key={key} />
          );
        })}
      </Switch>
    </Router>
    ,
  </Provider>,
  document.getElementById("root")
);
