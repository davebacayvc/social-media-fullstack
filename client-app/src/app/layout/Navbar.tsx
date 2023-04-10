import React from "react";
import { Button, Container, Menu } from "semantic-ui-react";
import { NavLink } from "react-router-dom";

const Navbar: React.FC = () => {
  return (
    <Menu inverted fixed="top">
      <Container>
        <Menu.Item header as={NavLink} to="/">
          <img
            src="/assets/logo.png"
            alt="logo"
            className="navbar-logo"
            style={{ marginRight: 10 }}
          />
          <span>Reactivities</span>
        </Menu.Item>
        <Menu.Item name="Activities" as={NavLink} to="/activities" />
        <Menu.Item>
          <Button
            positive
            content="Create Activity"
            as={NavLink}
            to="/createActivity"
          ></Button>
        </Menu.Item>
      </Container>
    </Menu>
  );
};

export default Navbar;
