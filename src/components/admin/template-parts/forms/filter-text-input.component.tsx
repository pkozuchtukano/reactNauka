import React from "react";
import { useField } from "formik";

const FilterTextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props.name);
  const hasError = meta.touched && meta.error;
  return (
    <div className={hasError ? "admin-filter-form__group admin-filter-form__group--error" : "admin-filter-form__group"}>
      <label className={hasError ? "admin-filter-form__label admin-filter-form__label--error" : "admin-filter-form__label"} htmlFor={props.id || props.name}>
        {label}
      </label>
      <input className="admin-filter-form__input" {...field} {...props} />
      {hasError ? <div className="admin-filter-form__error">{meta.error}</div> : null}
    </div>
  );
};

export default FilterTextInput;
