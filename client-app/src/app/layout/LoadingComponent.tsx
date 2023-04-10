import React from "react";
import { Dimmer, Loader } from "semantic-ui-react";

interface LoadingProps {
  inverted?: boolean;
  content?: string;
}
const LoadingComponent: React.FC<LoadingProps> = (props) => {
  return (
    <Dimmer active={true} inverted={props.inverted}>
      <Loader content={props.content} />
    </Dimmer>
  );
};

LoadingComponent.defaultProps = {
  content: "Loading...",
};

export default LoadingComponent;
