import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../../actions/auth";
import useUserIdentity from "../../../hooks/use-user-identity";

export default function UserPanelTemplatePart() {
  const dispatch = useDispatch();
  const identity = useUserIdentity();

  function logOut() {
    dispatch(logout());
  }

  return (
    <Fragment>
      {identity.userName ? (
        <div>
          <Link to={"/profile"} className="client-button client-button--dark">
            Cześć {identity.userName}!
          </Link>
          <a
            href="/login"
            onClick={logOut}
            className="client-button client-button--dark m--lsm"
          >
            Wylogowanie
          </a>
        </div>
      ) : (
        <div>
          <Link to={"/login"} className="client-button client-button--dark">
            Logowanie
          </Link>

          <Link
            to={"/register"}
            className="client-button client-button--dark m--lsm"
          >
            Rejestracja
          </Link>
        </div>
      )}
    </Fragment>
  );
}
