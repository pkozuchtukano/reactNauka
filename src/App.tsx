import React, { Suspense, lazy } from "react";
import { Router, Route } from "react-router-dom";
import { AnimatedSwitch } from "react-router-transition";
import { useDispatch } from "react-redux";
import config from "react-global-configuration";
import { setLocale } from "yup";
import configuration from "./config";
import { PrivateRoute, RoleRoute } from "./util/http";
import { ROLE_ADMIN } from "./types/auth";
import NoMatch from "./components/util/no-match-component";
import { history } from "./util/history";
import { clearMessage } from "./actions/message";
import "./App.scss";

import MessageDispositor from "./components/client/template-parts/message-dispositor.component";
import ApplicationLoader from "./components/util/loader.component";
import ErrorBoundary from "./components/util/global-error-boundary.component";

setLocale({
  mixed: {
    required: "To pole jest wymagane",
  },
  string: {
    email: "Niepoprawny format email",
    max: 'Pole nie może mieć więcej niż ${max} znaków',
  },
});

config.set(configuration);
const Login = lazy(() => import("./components/client/auth/login.component"));
const Register = lazy(
  () => import("./components/client/auth/register.component")
);
const ResetPassword = lazy(
  () => import("./components/client/auth/reset-password.component")
);
const ConfirmAccount = lazy(
  () => import("./components/client/auth/confirm-account.component")
);
const ConfirmResetPassword = lazy(
  () => import("./components/client/auth/confirm-reset-password.component")
);
const Home = lazy(() => import("./components/client/pages/home.component"));
const Profile = lazy(
  () => import("./components/client/pages/profile/profile.component")
);
const ConfirmInvitation = lazy(
  () => import("./components/client/auth/confirm-invitation.component")
);
const AdminTemplate = lazy(() => import("./components/admin/admin-template"));

export default function App() {
  const dispatch: any = useDispatch();
  history.listen((location) => {
    dispatch(clearMessage());
  });

  return (
    <ErrorBoundary>
      <Router history={history}>
        <Suspense fallback={<ApplicationLoader />}>
          <AnimatedSwitch
            atEnter={{ opacity: 0 }}
            atLeave={{ opacity: 0 }}
            atActive={{ opacity: 1 }}
            className="switch-wrapper"
          >
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/reset-password" component={ResetPassword} />
            <Route
              path="/confirm-account/:userId/:code"
              component={ConfirmAccount}
            />
            <Route
              path="/confirm-reset-password/:userId/:code"
              component={ConfirmResetPassword}
            />
            <Route
              path="/confirm-invitation/:userId/:code"
              component={ConfirmInvitation}
            />
            <PrivateRoute path="/profile">
              <Profile />
            </PrivateRoute>
            <RoleRoute path="/admin" role={ROLE_ADMIN}>
              <AdminTemplate />
            </RoleRoute>
            <Route path="*">
              <NoMatch />
            </Route>
          </AnimatedSwitch>
        </Suspense>
        <MessageDispositor />
      </Router>
    </ErrorBoundary>
  );
}
