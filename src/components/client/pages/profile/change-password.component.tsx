import React, { useCallback } from "react";
import { useHistory } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import authService from "../../../../services/auth.service";
import ClientTextInput from "../../template-parts/forms/client-text-input";
import "./change-password.component.scss";

export default function ChangePassword() {
  const history = useHistory();
  const onSubmit = useCallback(
    (values, { setSubmitting }) => {
      setSubmitting(true);
      authService
        .changeUserPassword(values.currentPassword, values.newPassword)
        .then(() => {
          history.push("/profile");
        })
        .catch(() => {})
        .finally(() => setSubmitting(false));
    },
    [history]
  );

  return (
    <Formik
      initialValues={{ currentPassword: "", newPassword: "" }}
      validationSchema={Yup.object({
        currentPassword: Yup.string().required(),
        newPassword: Yup.string().required(),
      })}
      onSubmit={onSubmit}
    >
      {(formik) => (
        <div className="change-password-form__container">
          <Form className="change-password-form">
            <h3 className="change-password-form__title">Zmiana hasła</h3>
            <ClientTextInput
              label="Stare hasło"
              name="currentPassword"
              type="password"
            />
            <ClientTextInput
              label="Nowe hasło"
              name="newPassword"
              type="password"
            />

            <button
              type="submit"
              disabled={formik.isSubmitting}
              className="client-button client-button--dark-submit client-button--block m--tlg"
            >
              Zmień hasło
            </button>
          </Form>
        </div>
      )}
    </Formik>
  );
}
