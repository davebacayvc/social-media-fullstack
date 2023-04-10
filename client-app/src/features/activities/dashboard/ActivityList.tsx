import React from "react";
import { Header } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import ActivityListItem from "../ActivityListItem";

const ActivityList: React.FC = () => {
  const { activityStore } = useStore();
  const { groupedActivities } = activityStore;

  return (
    <React.Fragment>
      {groupedActivities.map(([group, activities]) => (
        <React.Fragment key={group}>
          <Header sub color="teal">
            {group}
          </Header>
          {activities.map((activity) => (
            <ActivityListItem activity={activity} key={activity.id} />
          ))}
        </React.Fragment>
      ))}
    </React.Fragment>
  );
};

export default observer(ActivityList);
