import React from "react";
import { useField } from "formik";

const ClientTextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props.name);
  const hasError = meta.touched && meta.error;
  return (
    <div className={hasError ? "client-form__group client-form__group--error" : "client-form__group"}>
      <label className={hasError ? "client-form__label client-form__label--error" : "client-form__label"} htmlFor={props.id || props.name}>
        {label}
      </label>
      <input className="client-form__input" {...field} {...props} />
      {hasError ? <div className="client-form__error">{meta.error}</div> : null}
    </div>
  );
};

export default ClientTextInput;
