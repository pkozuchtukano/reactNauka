import { useState, useEffect } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faUsers,
  faTimesCircle,
  faCompass,
} from "@fortawesome/free-solid-svg-icons";
import UserPanel from "./user-panel.component";
import { AdminMode, DASHBOARD, USERS } from "../../../types/visuals";
import "./navigation.component.scss";
import Media from "react-media";
import config from "react-global-configuration";
import { history } from "../../../util/history";

export default function Navigation() {
  const hideMenuResolutionBreakPx: number = config.get(
    "hideMenuResolutionBreakPx"
  );
  let [visibility, setVisibility] = useState(false);

  useEffect(() => {
    history.listen((location) => {
      setVisibility(false);
    });
  }, []);

  return (
    <Media queries={{ small: { maxWidth: hideMenuResolutionBreakPx } }}>
      {(matches) =>
        matches.small ? (
          <>
            {visibility && (
              <>
                <NavigationCore />
                <button
                  className="admin-navigation__mobile-button-hide"
                  onClick={() => setVisibility(false)}
                >
                  <FontAwesomeIcon icon={faTimesCircle} />
                </button>
              </>
            )}
            <button
              className="admin-navigation__mobile-button-show"
              onClick={() => setVisibility(true)}
            >
              <FontAwesomeIcon icon={faCompass} />
            </button>
          </>
        ) : (
          <NavigationCore />
        )
      }
    </Media>
  );
}

function NavigationCore() {
  let { url } = useRouteMatch();
  const currentAdminMode: AdminMode = useSelector(
    (state: any) => state.visual.adminMode
  );

  return (
    <nav className="admin-navigation">
      <div className="admin-navigation__title">Panel administracyjny</div>
      <div className="admin-navigation__divider"></div>
      <UserPanel />
      <Link
        className={
          "admin-navigation__link " +
          (currentAdminMode === DASHBOARD
            ? "admin-navigation__link--selected"
            : "")
        }
        to={`${url}`}
      >
        <FontAwesomeIcon icon={faHome} />
        <span className="admin-navigation__link-text">Strona główna</span>
      </Link>
      <Link
        className={
          "admin-navigation__link " +
          (currentAdminMode === USERS ? "admin-navigation__link--selected" : "")
        }
        to={`${url}/users`}
      >
        <FontAwesomeIcon icon={faUsers} />
        <span className="admin-navigation__link-text">Użytkownicy</span>
      </Link>
      <div className="admin-navigation__divider"></div>
      <div className="admin-navigation__footer">© Tukano Software Hause</div>
    </nav>
  );
}
