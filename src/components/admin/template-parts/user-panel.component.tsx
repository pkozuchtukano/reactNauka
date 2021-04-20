import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../../actions/auth";
import { getUserLoginLetters } from "../../../util/util";
import useUserIdentity from "../../../hooks/use-user-identity";
import "./user-panel.component.scss";

export default function UserPanel() {
  const dispatch = useDispatch();
  const identity = useUserIdentity();
  const userLetters = getUserLoginLetters(identity.userName);

  function logOut() {
    dispatch(logout());
  }

  return (
    <>
      {identity.userName && (
        <div className="admin-user-container">
          <a href="/profile" className="admin-user-container__avatar">
            <span className="admin-user-container__avatar-first-letter">
              {userLetters.first}
            </span>
            <span className="admin-user-container__avatar-second-letter">
              {userLetters.second}
            </span>
          </a>
          <Link to={"/profile"} className="admin-user-container__account-link">
            {identity.userName}
          </Link>
          <br />
          <a
            href="/login"
            onClick={logOut}
            className="admin-user-container__logout-link"
          >
            wyloguj się
          </a>
        </div>
      )}
    </>
  );
}
