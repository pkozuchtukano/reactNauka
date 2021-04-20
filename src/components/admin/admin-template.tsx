import React, { Suspense, lazy } from "react";
import "../../../node_modules/alertifyjs/build/css/alertify.css";
import "../../../node_modules/alertifyjs/build/css/themes/default.css";
import "react-datepicker/dist/react-datepicker.css";
import "./admin-template.scss";

import { Route, useRouteMatch } from "react-router-dom";
import { registerLocale } from "react-datepicker";
import pl from "date-fns/locale/pl";
import { AnimatedSwitch } from "react-router-transition";
import Navigation from "./template-parts/navigation.component";
import ApplicationLoader from "../../components/util/loader.component";
import NoMatchAdminPage from "./template-parts/no-match.component";

const Dashboard = lazy(
  () => import("./sections/dashboard/dashboard.component")
);
const UserIndex = lazy(() => import("./sections/users/users-index.component"));
const UserEditForm = lazy(
  () => import("./sections/users/manage/edit-user.component")
);
const UserAddForm = lazy(
  () => import("./sections/users/manage/add-user.component")
);
const UserResetPasswordForm = lazy(
  () => import("./sections/users/manage/reset-password.component")
);
const UserDetails = lazy(
  () => import("./sections/users/details/details-user.component")
);

export default function AdminTemplate() {
  registerLocale("pl", pl);
  let { path } = useRouteMatch();

  return (
    <>
      <Navigation />
      <main className="admin-panel__body">
        <Suspense fallback={<ApplicationLoader />}>
          <AnimatedSwitch
            atEnter={{ opacity: 0 }}
            atLeave={{ opacity: 0 }}
            atActive={{ opacity: 1 }}
            className="switch-wrapper"
          >
            <Route exact path={path}>
              <Dashboard />
            </Route>
            <Route exact path={`${path}/users/new`}>
              <UserAddForm />
            </Route>
            <Route exact path={`${path}/users/edit/:id`}>
              <UserEditForm />
            </Route>
            <Route exact path={`${path}/users/reset-password/:id`}>
              <UserResetPasswordForm />
            </Route>
            <Route exact path={`${path}/users/details/:id`}>
              <UserDetails />
            </Route>
            <Route exact path={`${path}/users`}>
              <UserIndex />
            </Route>
            <Route path="*">
              <NoMatchAdminPage />
            </Route>
          </AnimatedSwitch>
        </Suspense>
      </main>
    </>
  );
}
