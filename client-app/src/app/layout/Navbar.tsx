import React from "react";
import { Button, Container, Menu } from "semantic-ui-react";

interface NavbarProps {
  openForm: () => void;
}
const Navbar: React.FC<NavbarProps> = (props) => {
  return (
    <Menu inverted fixed="top">
      <Container>
        <Menu.Item header>
          <img
            src="/assets/logo.png"
            alt="logo"
            className="navbar-logo"
            style={{ marginRight: 10 }}
          />
          <span>Reactivities</span>
        </Menu.Item>
        <Menu.Item name="Activities" />
        <Menu.Item>
          <Button
            positive
            content="Create Activity"
            onClick={props.openForm}
          ></Button>
        </Menu.Item>
      </Container>
    </Menu>
  );
};

export default Navbar;
