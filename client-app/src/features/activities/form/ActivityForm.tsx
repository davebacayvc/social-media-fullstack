import React, { useEffect, useState } from "react";
import { Button, Header, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Activity } from "../../../app/models/activity";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { v4 as uuid } from "uuid";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormikInput from "../../../app/common/form/FormikInput";
import FormikTextArea from "../../../app/common/form/FormikTextArea";
import FormikSelect from "../../../app/common/form/FormikSelect";
import { categoryOptions } from "../../../app/common/options/categoryOptions";
import FormikDate from "../../../app/common/form/FormikDate";

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
    date: null,
    description: "",
    venue: "",
  });

  const validationSchema = Yup.object({
    title: Yup.string().required("Activity title is required."),
    category: Yup.string().required("Activity category is required."),
    city: Yup.string().required("Activity city is required."),
    date: Yup.string().required("Activity date is required."),
    description: Yup.string().required("Activity description is required."),
    venue: Yup.string().required("Activity venue is required."),
  });

  useEffect(() => {
    if (id) {
      loadActivity(id).then((activity) => setActivity(activity!));
    }
  }, [id, loadActivity]);

  const handleFormSubmit = (activity: Activity) => {
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

  // const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = e?.target;
  //   setActivity({
  //     ...activity,
  //     [name]: value,
  //   });
  // };

  if (loadingInitial) {
    return <LoadingComponent content="Loading activity ..." />;
  }

  return (
    <Segment clearing>
      <Header content="Activity Details" sub color="teal" />
      <Formik
        enableReinitialize
        validationSchema={validationSchema}
        initialValues={activity}
        onSubmit={(values) => handleFormSubmit(values)}
      >
        {({ isValid, isSubmitting, handleSubmit, dirty }) => {
          return (
            <Form
              onSubmit={handleSubmit}
              autoComplete="off"
              className="ui form"
            >
              <FormikInput name="title" placeholder="Title" />
              <FormikTextArea
                placeholder="Description"
                name="description"
                rows={3}
              />
              <FormikSelect
                options={categoryOptions}
                placeholder="Category"
                name="category"
              />
              <FormikDate
                placeholderText="Date"
                name="date"
                showTimeSelect
                timeCaption="time"
                dateFormat="MMMM d, yyy h:mm aa"
              />
              <Header content="Location Details" sub color="teal" />
              <FormikInput placeholder="City" name="city" />
              <FormikInput placeholder="Venu" name="venue" />
              <Button
                floated="right"
                positive
                type="submit"
                content="Submit"
                loading={loading}
                disabled={isSubmitting || !dirty || !isValid}
              />
              <Button
                floated="right"
                type="button"
                content="Cancel"
                as={Link}
                to="/activities"
              />
            </Form>
          );
        }}
      </Formik>
    </Segment>
  );
};

export default observer(ActivityForm);
