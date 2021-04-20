import { Redirect, Route } from "react-router-dom";
import useUserIdentity from "../hooks/use-user-identity";
import useUserRoleChecker from "../hooks/use-user-role-checker";

export function extractErrorMessage(error: any) {
  if (!error.response) {
    return "";
  }

  if (error.response.status === 500) {
    return "Ups..., mamy problem, sprubój ponownie...";
  }
  if (error.response.status === 401 || error.response.status === 403) {
    return "Brak dostępu...";
  }
  if (error.response.status === 404) {
    return "Wygląda na to że nie ma tego czego szukasz...";
  }

  const message =
    (error.response && error.response.data) ||
    error.message ||
    error.toString();
  return message;
}

export function PrivateRoute({ children, ...rest }) {
  let auth = useUserIdentity();
  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth.userName ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}

export function RoleRoute({ children, role, ...rest }) {
  let hasRole = useUserRoleChecker(role);
  
  return (
    <Route
      {...rest}
      render={({ location }) =>
        hasRole ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}
