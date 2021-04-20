import React from "react";
import { useField, useFormikContext } from "formik";
import DatePicker from "react-datepicker";

const DateInput = ({ label, ...props }) => {
  const [field, meta] = useField(props.name);
  const { setFieldValue } = useFormikContext();
  const hasError = meta.touched && meta.error;

  return (
    <div
      className={
        hasError
          ? "admin-filter-form__group admin-filter-form__group--error"
          : "admin-filter-form__group"
      }
    >
      <label
        className={
          hasError
            ? "admin-filter-form__label admin-filter-form__label--error"
            : "admin-filter-form__label"
        }
        htmlFor={props.id || props.name}
      >
        {label}
      </label>
      <DatePicker
        {...field}
        {...props}
        locale="pl"
        dateFormat="dd-MM-yyyy"
        placeholderText="Wybierz"
        selected={(field.value && new Date(field.value)) || null}
        onChange={(val) => {
          setFieldValue(field.name, val);
          if (props.onChange) {
            props.onChange(val);
          }
        }}
      />{" "}
      {hasError ? (
        <div className="admin-filter-form__error">{meta.error}</div>
      ) : null}
    </div>
  );
};

export default DateInput;
