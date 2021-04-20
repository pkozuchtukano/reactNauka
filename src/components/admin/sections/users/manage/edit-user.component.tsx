import { useState, useCallback, useEffect } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useParams } from "react-router-dom";
import { history } from "../../../../../util/history";
import AdminTextInput from "../../../template-parts/forms/admin-text-input.component";
import AdminSwitchInput from "../../../template-parts/forms/admin-switch-input.component";
import {
  emptyUserManageForm,
  IUserManageForm,
} from "../../../../../types/user";
import userService from "../../../../../services/user.service";
import MessageViewer from "../../../../util/message-viever.component";
import Navigation from "../users-navigation-descent.component";
import {
  PageHeader,
  BackButton,
  SubmitButton,
} from "../../../admin-ui-controls";

interface IUserManageParams {
  id: string;
}

export default function EditUserForm() {
  const { id } = useParams<IUserManageParams>();
  const [title, setTitle] = useState("");
  const [formData, setFormData] = useState<IUserManageForm>(
    emptyUserManageForm
  );

  useEffect(() => {
    userService.getEditModel(id).then((data) => {
      if (data === null) {
        return;
      }

      setFormData(data);
      setTitle("Edycja użytkownika " + data.email);
    });
  }, [id]);

  const onSubmit = useCallback(
    (values, { setSubmitting }) => {
      setSubmitting(true);
      userService.edit(values, id).then(
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
        initialValues={formData}
        validationSchema={Yup.object({
          email: Yup.string().email().required(),
          userName: Yup.string().required(),
          firstName: Yup.string().max(256),
          lastName: Yup.string().max(256),
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
                    <AdminTextInput label="Email" name="email" type="text" />
                    <AdminTextInput
                      label="Nazwa użytkownika"
                      name="userName"
                      type="text"
                    />
                    <AdminTextInput label="Imię" name="firstName" type="text" />
                    <AdminTextInput
                      label="Nazwisko"
                      name="lastName"
                      type="text"
                    />
                    <AdminSwitchInput
                      label="użytkownik administracyjny?"
                      name="isAdministrative"
                    />

                    <MessageViewer viewerKey="admin-user-edit" />

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
