import React, { useEffect, useState } from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Activity } from "../../../app/models/activity";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { v4 as uuid } from "uuid";

const ActivityForm: React.FC = () => {
  const { activityStore } = useStore();
  const {
    createActivity,
    updateActivity,
    loading,
    loadActivity,
    loadingInitial,
  } = activityStore;

  const { id } = useParams();
  const navigate = useNavigate();

  const [activity, setActivity] = useState<Activity>({
    id: "",
    title: "",
    category: "",
    city: "",
    date: "",
    description: "",
    venue: "",
  });

  useEffect(() => {
    if (id) {
      loadActivity(id).then((activity) => setActivity(activity!));
    }
  }, [id, loadActivity]);

  const handleSubmit = () => {
    if (!activity.id) {
      activity.id = uuid();
      createActivity(activity).then(() =>
        navigate(`/activities/${activity.id}`)
      );
    } else {
      updateActivity(activity).then(() =>
        navigate(`/activities/${activity.id}`)
      );
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e?.target;
    setActivity({
      ...activity,
      [name]: value,
    });
  };

  if (loadingInitial) {
    return <LoadingComponent content="Loading activity ..." />;
  }

  return (
    <Segment clearing>
      <Form onSubmit={handleSubmit} autoComplete="off">
        <Form.Input
          placeholder="Title"
          value={activity.title}
          name="title"
          onChange={handleInputChange}
        />
        <Form.Input
          placeholder="Description"
          value={activity.description}
          onChange={handleInputChange}
          name="description"
        />
        <Form.Input
          placeholder="Category"
          value={activity.category}
          onChange={handleInputChange}
          name="category"
        />
        <Form.Input
          placeholder="Date"
          type="date"
          value={activity.date}
          onChange={handleInputChange}
          name="date"
        />
        <Form.Input
          placeholder="City"
          value={activity.city}
          onChange={handleInputChange}
          name="city"
        />
        <Form.Input
          placeholder="Venu"
          value={activity.venue}
          onChange={handleInputChange}
          name="venue"
        />
        <Button
          floated="right"
          positive
          type="submit"
          content="Submit"
          loading={loading}
        />
        <Button
          floated="right"
          type="button"
          content="Cancel"
          as={Link}
          to="/activities"
        />
      </Form>
    </Segment>
  );
};

export default observer(ActivityForm);
