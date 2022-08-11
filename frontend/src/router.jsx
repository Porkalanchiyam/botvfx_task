import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { NavBar } from "./components";
import routes from "./config/router";

const RouterApp = () => (
  <BrowserRouter>
    <Routes>
      {Object.keys(routes).map((key) => {
        if (key === "Api") {
          return null;
        }
        const {
          component: { default: Component },
        } = routes[key];
        return (
          <Route
            key={key}
            path={routes[key].path}
            element={(
              <NavBar isPrivate={routes[key].isPrivate}>
                <Component />
              </NavBar>
            )}
          />
        );
      })}
    </Routes>
  </BrowserRouter>
);

export default RouterApp;
