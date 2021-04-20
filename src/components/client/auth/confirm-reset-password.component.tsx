import React, { useCallback } from "react";
import { useParams } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import authService from "../../../services/auth.service";
import { PASSWORD_RGX, PASSWORD_MSG } from "../../../util/formats";
import ClientTemplate, { emptyClientTemplateProps } from "../client-template";
import ClientTextInput from "../template-parts/forms/client-text-input";
import MessageViewer from "../../util/message-viever.component";
import "./confirm-reset-password.component.scss";

interface IConfirmResetPasswordParams {
  userId: string;
  code: string;
}

export default function ConfirmResetPassword() {
  const { userId, code } = useParams<IConfirmResetPasswordParams>();
  const onSubmit = useCallback(
    (values, { setSubmitting }) => {
      setSubmitting(true);
      authService
        .changePassword(values.password, userId, code)
        .then(() => {})
        .catch(() => {})
        .finally(() => setSubmitting(false));
    },
    [userId, code]
  );

  return (
    <ClientTemplate {...emptyClientTemplateProps}>
      <Formik
        initialValues={{ password: "" }}
        validationSchema={Yup.object({
          password: Yup.string().required().matches(PASSWORD_RGX, PASSWORD_MSG),
        })}
        onSubmit={onSubmit}
      >
        {(formik) => (
          <div className="change-password-form__container">
            <Form className="change-password-form">
              <h3 className="change-password-form__title">Zmiana hasła</h3>
              <ClientTextInput
                label="Nowe hasło"
                name="password"
                type="password"
              />

              <MessageViewer viewerKey="confirm-reset-password" />

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
    </ClientTemplate>
  );
}
