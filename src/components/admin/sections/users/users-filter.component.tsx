import { Formik, Form } from "formik";
import FilterTextInput from "../../template-parts/forms/filter-text-input.component";
import DateInput from "../../template-parts/forms/date-input.component";
import FilterSelect from "../../template-parts/forms/filter-select.component";

interface IUsersFilterProp {
  setFilters: Function;
}

export default function UsersFilter(prop: IUsersFilterProp) {
  let timeoutKey: any = null;
  const handleChange = (formik) => (event) => {
    if (timeoutKey) {
      clearTimeout(timeoutKey);
    }

    timeoutKey = setTimeout(() => {
      formik.submitForm();
    }, 1000);
  };

  const handleReset = (formik) => (event) => {
    event.preventDefault();
    formik.resetForm();
    handleChange(formik)(null);
  };

  const options = [
    { value: "Created", label: "Data utworzenia" },
    { value: "LastLogin", label: "Ostatnie logowanie" },
  ];

  const optionsSortDirection = [
    { value: "desc", label: "Malejąco" },
    { value: "asc", label: "Rosnąco" },
  ];

  return (
    <Formik
      initialValues={{
        email: "",
        firstName: "",
        lastName: "",
        created: null,
        lastLogin: null,
        sortByOption: "Created",
        sortDirOption: "desc",
        sortBy: null,
        sortDir: null,
      }}
      onSubmit={(values) => {
        const sortByOption: any = values.sortByOption;
        values.sortBy = sortByOption?.value;
        const sortDirOption: any = values.sortDirOption;
        values.sortDir = sortDirOption?.value;
        prop.setFilters(values);
      }}
    >
      {(formik) => (
        <div>
          <small className="filter-header">filtrowanie i wyszukiwanie</small>
          <button
            type="button"
            className="filter-reset-btn"
            onClick={handleReset(formik)}
          >
            (reset)
          </button>
          <Form onChange={handleChange(formik)}>
            <div className="container-fluid">
              <div className="row">
                <div className="col-xl-2 col-lg-3 col-sm-6">
                  <FilterTextInput label="Email" name="email" type="text" />
                </div>
                <div className="col-xl-2 col-lg-3 col-sm-6">
                  <FilterTextInput label="Imię" name="firstName" type="text" />
                </div>
                <div className="col-xl-2 col-lg-3 col-sm-6">
                  <FilterTextInput
                    label="Nazwisko"
                    name="lastName"
                    type="text"
                  />
                </div>
                <div className="col-xl-2 col-lg-3 col-sm-6">
                  <DateInput
                    label="Data utworzenia"
                    name="created"
                    onChange={handleChange(formik)}
                  />
                </div>
                <div className="col-xl-2 col-lg-3 col-sm-6">
                  <DateInput
                    label="Ostatnie logowanie"
                    name="lastLogin"
                    onChange={handleChange(formik)}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-xl-2 col-lg-3 col-sm-6">
                  <FilterSelect
                    label="Sortuj po"
                    name="sortByOption"
                    options={options}
                    onChange={handleChange(formik)}
                  />
                </div>
                <div className="col-xl-2 col-lg-3 col-sm-6">
                  <FilterSelect
                    label="w kierunku"
                    name="sortDirOption"
                    options={optionsSortDirection}
                    onChange={handleChange(formik)}
                  />
                </div>
              </div>
            </div>
          </Form>
        </div>
      )}
    </Formik>
  );
}
