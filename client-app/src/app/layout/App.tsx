import { Container } from "semantic-ui-react";
import Navbar from "./Navbar";
import React from "react";
import { observer } from "mobx-react-lite";
import { Outlet, useLocation } from "react-router-dom";
import Home from "../../features/home/Home";
import { ToastContainer } from "react-toastify";

const App = () => {
  const location = useLocation();

  return (
    <React.Fragment>
      <ToastContainer position="top-right" hideProgressBar theme="colored" />
      {location.pathname === "/" ? (
        <Home />
      ) : (
        <React.Fragment>
          <Navbar />
          <Container style={{ marginTop: "7em" }}>
            <Outlet />
          </Container>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default observer(App);
