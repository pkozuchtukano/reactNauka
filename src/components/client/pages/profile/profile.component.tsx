import React from "react";
import ClientTemplate, { emptyClientTemplateProps } from "../../client-template";
import { Switch, Route, Link, useRouteMatch } from "react-router-dom";
import useUserIdentity from "../../../../hooks/use-user-identity";
import useUserRoleChecker from "../../../../hooks/use-user-role-checker";
import { ROLE_USER, ROLE_ADMIN } from "../../../../types/auth";
import ChangePassword from "./change-password.component";
import "./profile.component.scss";

export default function Profile() {
  const { userName } = useUserIdentity();
  const isUser = useUserRoleChecker(ROLE_USER);
  const isAdmin = useUserRoleChecker(ROLE_ADMIN);
  let { path, url } = useRouteMatch();

  return (
    <ClientTemplate {...emptyClientTemplateProps}>
      <h3 className="profile-page__title">Profil: {userName}</h3>
      <div className="profile-page__roles-container">
        Uprawnienia:
        {isUser && <div>użytkownik</div>}
        {isAdmin && <div>administrator</div>}
      </div>

      <Switch>
        <Route exact path={path}>
          <div className="profile-page__change-password-button-container">
            <Link
              className="client-button client-button--dark"
              to={`${url}/change-password`}
            >
              Zmień hasło
            </Link>
          </div>
        </Route>
        <Route path={`${path}/change-password`}>
          <ChangePassword />
        </Route>
      </Switch>
    </ClientTemplate>
  );
}
