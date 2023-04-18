import React from "react";
import { Message } from "semantic-ui-react";

interface ValidationErrorProps {
  errors: string[];
}
const ValidationError: React.FC<ValidationErrorProps> = (props) => {
  return (
    <Message error>
      {props.errors ? (
        <Message.List>
          {props.errors.map((err: string, i) => {
            return <Message.Item key={i}>{err}</Message.Item>;
          })}
        </Message.List>
      ) : null}
    </Message>
  );
};

export default ValidationError;
