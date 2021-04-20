import Select from "react-select";
import { useField, useFormikContext } from "formik";

const FilterSelect = ({ ...props }) => {
  const [field] = useField(props.name);
  const { setFieldValue } = useFormikContext();

  const defaultValue = (options, value) => {
    return options ? options.find((option) => option.value === value) : "";
  };

  const customStyles = {
    control: (styles) => ({
      ...styles,
      backgroundColor: "white",
      border: "none",
    }),
  };

  return (
    <div className="admin-filter-form__group">
      {props.label && (
        <label className="admin-filter-form__label">{props.label}</label>
      )}
      <Select
        {...field}
        {...props}
        styles={customStyles}
        value={defaultValue(props.options, field.value)}
        onChange={(value) => {
          setFieldValue(field.name, value);
          if (props.onChange) {
            props.onChange(value);
          }
        }}
        options={props.options}
      />
    </div>
  );
};

export default FilterSelect;
