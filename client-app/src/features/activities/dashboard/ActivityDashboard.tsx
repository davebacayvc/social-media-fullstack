import React from "react";
import { Grid } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";
import ActivityList from "./ActivityList";
import ActivityDetails from "../details/ActivityDetails";
import ActivityForm from "../form/ActivityForm";

interface ActivityDashboardProps {
  activities: Activity[];
  selectedActivity: Activity | undefined;
  selectActivity: (id: string) => void;
  cancelSelectActivity: () => void;
  editMode: boolean;
  openForm: (id: string) => void;
  closeForm: () => void;
  createOrEdit: (activity: Activity) => void;
  deleteActivity: (id: string) => void;
}
const ActivityDashboard: React.FC<ActivityDashboardProps> = (props) => {
  return (
    <Grid>
      <Grid.Column width={10}>
        <ActivityList
          activities={props.activities}
          selectActivity={props.selectActivity}
          closeForm={props.closeForm}
          deleteActivity={props.deleteActivity}
        />
      </Grid.Column>
      <Grid.Column width={6}>
        {props.selectedActivity ? (
          <ActivityDetails
            activity={props.selectedActivity}
            cancelSelectActivity={props.cancelSelectActivity}
            closeForm={props.closeForm}
            editMode={props.editMode}
            openForm={props.openForm}
          />
        ) : null}
        {props.editMode ? (
          <ActivityForm
            activity={props.selectedActivity}
            closeForm={props.closeForm}
            createOrEdit={props.createOrEdit}
          />
        ) : null}
      </Grid.Column>
    </Grid>
  );
};

export default ActivityDashboard;
