import React from "react";
import { Link } from "react-router-dom";
import { Button, Header, Icon, Segment } from "semantic-ui-react";

const NotFound = () => {
  return (
    <Segment placeholder>
      <Header icon>
        <Icon name="search" />
        <span>
          Oops! We've looked everywhere but could not find what you are looking
          for!
        </span>
      </Header>
      <Segment.Inline>
        <Button as={Link} to="/">
          GO BACK TO HOME
        </Button>
      </Segment.Inline>
    </Segment>
  );
};

export default NotFound;
