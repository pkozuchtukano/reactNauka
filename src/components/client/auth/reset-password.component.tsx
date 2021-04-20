import React, { useCallback } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import authService from "../../../services/auth.service";
import ClientTemplate, { emptyClientTemplateProps } from "../client-template";
import ClientTextInput from "../template-parts/forms/client-text-input";
import MessageViewer from "../../util/message-viever.component";
import "./reset-password.component.scss";

export default function ResetPassword() {
  const onSubmit = useCallback((values, { setSubmitting }) => {
    setSubmitting(true);
    authService
      .resetPassword(values.email)
      .then(() => {})
      .catch(() => {})
      .finally(() => setSubmitting(false));
  }, []);

  return (
    <ClientTemplate {...emptyClientTemplateProps}>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={Yup.object({
          email: Yup.string().email().required(),
        })}
        onSubmit={onSubmit}
      >
        {(formik) => (
          <div className="reset-password-form__container">
            <Form className="reset-password-form">
              <h3 className="reset-password-form__title">Resetowanie hasła</h3>
              <ClientTextInput label="Email" name="email" type="text" />

              <MessageViewer viewerKey="reset-password" />

              <button
                type="submit"
                disabled={formik.isSubmitting}
                className="client-button client-button--dark-submit client-button--block m--tlg"
              >
                Resetuj hasło
              </button>
            </Form>
          </div>
        )}
      </Formik>
    </ClientTemplate>
  );
}
