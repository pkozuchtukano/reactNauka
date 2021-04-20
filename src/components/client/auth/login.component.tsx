import React, { useCallback } from "react";
import { Redirect, Link } from "react-router-dom";
import { history } from "../../../util/history";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { login } from "../../../actions/auth";
import useUserIdentity from "../../../hooks/use-user-auth";
import ClientTemplate, { emptyClientTemplateProps } from "../client-template";
import ClientTextInput from "../template-parts/forms/client-text-input";
import MessageViewer from "../../util/message-viever.component";
import "./login.component.scss";

export default function Login() {
  const dispatch: any = useDispatch();
  const isAuth = useUserIdentity();

  const onSubmit = useCallback(
    (values, { setSubmitting }) => {
      setSubmitting(true);
      dispatch(login(values.email, values.password))
        .then(() => {
          history.push("/profile");
        })
        .catch(() => {
          setSubmitting(false);
        });
    },
    [dispatch]
  );

  if (isAuth) {
    return <Redirect to="/profile" />;
  }

  return (
    <ClientTemplate {...emptyClientTemplateProps}>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={Yup.object({
          email: Yup.string().email().required(),
          password: Yup.string().required(),
        })}
        onSubmit={onSubmit}
      >
        {(formik) => (
          <div className="login-form__container">
            <Form className="login-form">
              <h3 className="login-form__title">Logowanie</h3>
              <ClientTextInput label="Email" name="email" type="text" />
              <ClientTextInput label="Hasło" name="password" type="password" />

              <Link
                className="login-form__reser-password-link"
                to={"/reset-password"}
              >
                nie pamiętam hasła...
              </Link>

              <MessageViewer viewerKey="login" />

              <button
                type="submit"
                disabled={formik.isSubmitting}
                className="client-button client-button--dark-submit client-button--block m--tlg"
              >
                Zaloguj się
              </button>
            </Form>
          </div>
        )}
      </Formik>
    </ClientTemplate>
  );
}
