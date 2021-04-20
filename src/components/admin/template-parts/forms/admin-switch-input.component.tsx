import React from "react";
import { useField } from "formik";

const AdminSwitchInput = ({ label, ...props }) => {
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
      <div className="form-check form-switch">
        <input
          {...field}
          {...props}
          className="form-check-input"
          type="checkbox"
          checked={field.value}
        />
        <label className="form-check-label" htmlFor={props.id || props.name}>
          {label}
        </label>
      </div>
      {hasError ? <div className="admin-form__error">{meta.error}</div> : null}
    </div>
  );
};

export default AdminSwitchInput;
