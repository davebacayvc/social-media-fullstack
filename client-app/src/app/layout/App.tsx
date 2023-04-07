import { useEffect, useState } from "react";
import { Container } from "semantic-ui-react";
import { Activity } from "../models/activity";
import Navbar from "./Navbar";
import React from "react";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import { v4 as uuid } from "uuid";
import agent from "../api/agent";
import LoadingComponent from "./LoadingComponent";

const App = () => {
  const [acitivities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<
    Activity | undefined
  >();
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    agent.Activities.list().then((response) => {
      let activities: Activity[] = [];

      response.forEach((activity) => {
        activity.date = activity.date.split("T")[0];
        activities.push(activity);
      });

      setActivities(activities);
      setLoading(false);
    });
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
    setIsSubmitting(true);
    if (activity.id) {
      agent.Activities.update(activity).then(() => {
        setActivities([
          ...acitivities.filter((x) => x.id !== activity.id),
          activity,
        ]);
        setEditMode(false);
        setSelectedActivity(activity);
        setIsSubmitting(false);
      });
    } else {
      activity.id = uuid();
      agent.Activities.create(activity).then(() => {
        setActivities([...acitivities, activity]);
        setEditMode(false);
        setSelectedActivity(activity);
        setIsSubmitting(false);
      });
    }
  };

  const handleDeleteActivity = (id: string) => {
    setIsSubmitting(true);
    agent.Activities.delete(id).then(() => {
      setActivities([...acitivities.filter((x) => x.id !== id)]);
      setIsSubmitting(false);
    });
  };

  if (loading) {
    return <LoadingComponent inverted content="Loading..." />;
  }

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
          isSubmitting={isSubmitting}
        />
      </Container>
    </React.Fragment>
  );
};

export default App;
