import React, { useCallback } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { register } from "../../../actions/auth";
import { PASSWORD_RGX, PASSWORD_MSG } from "../../../util/formats";
import ClientTemplate, { emptyClientTemplateProps } from "../client-template";
import ClientTextInput from "../template-parts/forms/client-text-input";
import MessageViewer from "../../util/message-viever.component";
import "./register.component.scss";

export default function Register() {
  const dispatch: any = useDispatch();
  const onSubmit = useCallback(
    (values, { setSubmitting }) => {
      setSubmitting(true);
      dispatch(register(values.email, values.password))
        .then(() => {})
        .catch(() => {})
        .finally(() => setSubmitting(false));
    },
    [dispatch]
  );

  return (
    <ClientTemplate {...emptyClientTemplateProps}>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={Yup.object({
          email: Yup.string().email().required(),
          password: Yup.string().required().matches(PASSWORD_RGX, PASSWORD_MSG),
        })}
        onSubmit={onSubmit}
      >
        {(formik) => (
          <div className="register-form__container">
            <Form className="register-form">
              <h3 className="register-form__title">Rejestracja</h3>
              <ClientTextInput label="Email" name="email" type="text" />
              <ClientTextInput label="Hasło" name="password" type="password" />

              <MessageViewer viewerKey="register" />

              <button
                type="submit"
                disabled={formik.isSubmitting}
                className="client-button client-button--dark-submit client-button--block m--tlg"
              >
                Zarejestruj się
              </button>
            </Form>
          </div>
        )}
      </Formik>
    </ClientTemplate>
  );
}
