import { useField } from "formik";
import React from "react";
import { Form, Label } from "semantic-ui-react";

interface FormikInputProps {
  placeholder: string;
  name: string;
  label?: string;
}
const FormikInput: React.FC<FormikInputProps> = (props) => {
  const [field, meta] = useField(props.name);
  return (
    <Form.Field error={meta.touched && !!meta.error}>
      <label>{props.label}</label>
      <input {...field} {...props} />
      {meta.touched && meta.error ? (
        <Label basic color="red">
          {meta.error}
        </Label>
      ) : null}
    </Form.Field>
  );
};

export default FormikInput;
