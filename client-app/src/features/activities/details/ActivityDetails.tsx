import React from "react";
import { Button, Card, Image } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";

interface ActivityDetailsProps {
  activity: Activity;
  cancelSelectActivity: () => void;
  editMode: boolean;
  openForm: (id: string) => void;
  closeForm: () => void;
}
const ActivityDetails: React.FC<ActivityDetailsProps> = (props) => {
  return (
    <Card fluid>
      <Image src={`/assets/categoryImages/${props.activity.category}.jpg`} />
      <Card.Content>
        <Card.Header>{props.activity.title}</Card.Header>
        <Card.Meta>
          <span className="date">{props.activity.date}</span>
        </Card.Meta>
        <Card.Description>{props.activity.description}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button.Group widths={2}>
          <Button
            basic
            color="blue"
            content="Edit"
            onClick={() => props.openForm(props.activity.id)}
          />
          <Button
            basic
            color="blue"
            content="Cancel"
            onClick={() => props.cancelSelectActivity()}
          />
        </Button.Group>
      </Card.Content>
    </Card>
  );
};

export default ActivityDetails;
