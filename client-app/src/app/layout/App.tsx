import { useEffect, useState } from "react";
import axios from "axios";
import { Container } from "semantic-ui-react";
import { Activity } from "../models/activity";
import Navbar from "./Navbar";
import React from "react";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import { v4 as uuid } from "uuid";

const App = () => {
  const [acitivities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<
    Activity | undefined
  >();
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    axios
      .get<Activity[]>("http://localhost:5000/api/activities/")
      .then((res) => setActivities(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleSelectAcitivity = (id: string) => {
    setSelectedActivity(acitivities.find((x) => x.id === id));
  };

  const handleCancelSelectActivity = () => {
    setSelectedActivity(undefined);
  };

  const handleFormOpen = (id?: string) => {
    id ? handleSelectAcitivity(id) : handleCancelSelectActivity();
    setEditMode(true);
  };

  const handleFormClose = () => {
    setEditMode(false);
  };

  const handleCreateOrEditActivity = (activity: Activity) => {
    activity.id
      ? setActivities([
          ...acitivities.filter((x) => x.id !== activity.id),
          activity,
        ])
      : setActivities([...acitivities, { ...activity, id: uuid() }]);
    setEditMode(false);
    setSelectedActivity(activity);
  };

  const handleDeleteActivity = (id: string) => {
    setActivities([...acitivities.filter((x) => x.id !== id)]);
  };

  return (
    <React.Fragment>
      <Navbar openForm={handleFormOpen} />
      <Container style={{ marginTop: "7em" }}>
        <ActivityDashboard
          activities={acitivities}
          selectedActivity={selectedActivity}
          selectActivity={handleSelectAcitivity}
          cancelSelectActivity={handleCancelSelectActivity}
          closeForm={handleFormClose}
          openForm={handleFormOpen}
          editMode={editMode}
          createOrEdit={handleCreateOrEditActivity}
          deleteActivity={handleDeleteActivity}
        />
      </Container>
    </React.Fragment>
  );
};

export default App;
