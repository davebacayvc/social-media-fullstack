import React, { SyntheticEvent, useState } from "react";
import { Activity } from "../../../app/models/activity";
import { Button, Item, Label, Segment } from "semantic-ui-react";

interface ActivityListProps {
  activities: Activity[];
  selectActivity: (id: string) => void;
  closeForm: () => void;
  deleteActivity: (id: string) => void;
  isSubmitting: boolean;
}
const ActivityList: React.FC<ActivityListProps> = (props) => {
  const [target, setTarget] = useState("");

  const handleActivityDelete = (
    e: SyntheticEvent<HTMLButtonElement>,
    id: string
  ) => {
    setTarget(e.currentTarget.name);
    props.deleteActivity(id);
  };
  return (
    <Segment>
      <Item.Group divided>
        {props.activities.map((activity) => (
          <Item key={activity.id}>
            <Item.Content>
              <Item.Header as="a">{activity.title}</Item.Header>
              <Item.Meta>{activity.date}</Item.Meta>
              <Item.Description>
                <div>{activity.description}</div>
                <div>
                  {activity.city}, {activity.venue}
                </div>
              </Item.Description>
              <Item.Extra>
                <Button
                  floated="right"
                  content="View"
                  color="blue"
                  onClick={() => {
                    props.selectActivity(activity.id);
                    props.closeForm();
                  }}
                />
                <Button
                  name={activity.id}
                  floated="right"
                  content="Delete"
                  loading={props.isSubmitting && target === activity.id}
                  color="red"
                  onClick={(e) => {
                    handleActivityDelete(e, activity.id);
                  }}
                />
                <Label basic content={activity.category} />
              </Item.Extra>
            </Item.Content>
          </Item>
        ))}
      </Item.Group>
    </Segment>
  );
};

export default ActivityList;
