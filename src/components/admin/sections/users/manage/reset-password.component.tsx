import { useState, useCallback, useEffect } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useParams } from "react-router-dom";
import { history } from "../../../../../util/history";
import { PASSWORD_RGX, PASSWORD_MSG } from "../../../../../util/formats";
import AdminTextInput from "../../../template-parts/forms/admin-text-input.component";
import { emptyUserChangePasswordForm } from "../../../../../types/user";
import userService from "../../../../../services/user.service";
import userCommonService from "../../../../../services/user-common.service";
import MessageViewer from "../../../../util/message-viever.component";
import Navigation from "../users-navigation-descent.component";
import {
  PageHeader,
  BackButton,
  SubmitButton,
} from "../../../admin-ui-controls";

interface IUserResetPasswordParams {
  id: string;
}

export default function ResetPasswordForm() {
  const { id } = useParams<IUserResetPasswordParams>();
  const [title, setTitle] = useState("");

  useEffect(() => {
    userService.getEditModel(id).then((data) => {
      if (data === null) {
        return;
      }

      setTitle("Zmiana hasła użytkownika " + data.email);
    });
  }, [id]);

  const onSubmit = useCallback(
    (values, { setSubmitting }) => {
      setSubmitting(true);
      userCommonService.resetPassword(id, values.password).then(
        () => history.push("/admin/users"),
        () => setSubmitting(false)
      );
    },
    [id]
  );

  return (
    <>
      <Navigation title={title} />
      <Formik
        enableReinitialize={true}
        initialValues={emptyUserChangePasswordForm}
        validationSchema={Yup.object({
          password: Yup.string().required().matches(PASSWORD_RGX, PASSWORD_MSG),
          confirmPassword: Yup.string()
            .required()
            .matches(PASSWORD_RGX, PASSWORD_MSG)
            .oneOf([Yup.ref("password"), null], "Hasło się nie zgadza..."),
        })}
        onSubmit={onSubmit}
      >
        {(formik) => (
          <div className="admin-card">
            <Form>
              <div className="container-fluid">
                <div className="row">
                  <div className="col-xl-6 col-lg-8">
                    <PageHeader title={title} />
                    <AdminTextInput
                      label="Hasło"
                      name="password"
                      type="password"
                    />
                    <AdminTextInput
                      label="Powtórz hasło"
                      name="confirmPassword"
                      type="password"
                    />

                    <MessageViewer viewerKey="admin-user-reset-password" />

                    <div className="row mt-lg">
                      <div className="col">
                        <BackButton url="/admin/users" />
                      </div>
                      <div className="col">
                        <SubmitButton disabled={formik.isSubmitting} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Form>
          </div>
        )}
      </Formik>
    </>
  );
}
