import React from "react";
import Calendar from "react-calendar";
import { Header, Menu } from "semantic-ui-react";

const ActivityFilters = () => {
  return (
    <React.Fragment>
      <Menu vertical size="large" style={{ width: "100%", marginTop: 25 }}>
        <Header attached icon="filter" content="Filters" color="teal" />
        <Menu.Item content="All Activities" />
        <Menu.Item content="I'm going" />
        <Menu.Item content="I'm hosting" />
      </Menu>
      <Header />
      <Calendar />
    </React.Fragment>
  );
};

export default ActivityFilters;
