import React from "react";
import { useField } from "formik";

const AdminTextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props.name);
  const hasError = meta.touched && meta.error;
  return (
    <div
      className={
        hasError
          ? "admin-form__group admin-form__group--error"
          : "admin-form__group"
      }
    >
      <label
        className={
          hasError
            ? "admin-form__label admin-form__label--error"
            : "admin-form__label"
        }
        htmlFor={props.id || props.name}
      >
        {label}
      </label>
      <input className="admin-form__input" {...field} {...props} />
      {hasError ? <div className="admin-form__error">{meta.error}</div> : null}
    </div>
  );
};

export default AdminTextInput;
