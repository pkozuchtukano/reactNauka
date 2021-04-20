import React, { useCallback } from "react";
import { useParams } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import authService from "../../../services/auth.service";
import { PASSWORD_RGX, PASSWORD_MSG } from "../../../util/formats";
import ClientTemplate, { emptyClientTemplateProps } from "../client-template";
import ClientTextInput from "../template-parts/forms/client-text-input";
import MessageViewer from "../../util/message-viever.component";
import "./confirm-invitation.component.scss";

interface IConfirmInvitationParams {
  userId: string;
  code: string;
}

export default function ConfirmInvitation() {
  const { userId, code } = useParams<IConfirmInvitationParams>();
  const onSubmit = useCallback(
    (values, { setSubmitting }) => {
      setSubmitting(true);
      authService
        .confirmInvitation(values.password, userId, code)
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
          <div className="confirm-invitation-form__container">
            <Form className="confirm-invitation-form">
              <h3 className="confirm-invitation-form__title">
                Potwierdzenie konta
              </h3>
              <ClientTextInput
                label="Nowe hasło"
                name="password"
                type="password"
              />

              <MessageViewer viewerKey="confirm-invitation" />

              <button
                type="submit"
                disabled={formik.isSubmitting}
                className="client-button client-button--dark-submit client-button--block m--tlg"
              >
                Potwierdź konto
              </button>
            </Form>
          </div>
        )}
      </Formik>
    </ClientTemplate>
  );
}
