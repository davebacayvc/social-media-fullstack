import { useField } from "formik";
import React from "react";
import { Form, Label, Select } from "semantic-ui-react";

interface FormikSelectProps {
  placeholder: string;
  name: string;
  label?: string;
  options: any;
}
const FormikSelect: React.FC<FormikSelectProps> = (props) => {
  const [field, meta, helpers] = useField(props.name);
  return (
    <Form.Field error={meta.touched && !!meta.error}>
      <label>{props.label}</label>
      <Select
        clearable
        options={props.options}
        value={field.value || null}
        onChange={(e, data) => helpers.setValue(data.value)}
        onBlur={() => helpers.setTouched(true)}
        placeholder={props.placeholder}
      />
      {meta.touched && meta.error ? (
        <Label basic color="red">
          {meta.error}
        </Label>
      ) : null}
    </Form.Field>
  );
};

export default FormikSelect;
