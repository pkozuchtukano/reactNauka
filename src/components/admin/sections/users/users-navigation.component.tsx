import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faAngleDoubleRight } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

export default function Navigation() {
  return (
    <div className="navigation-section">
      <Link to="/admin">
        <FontAwesomeIcon className="navigation-section__icon" icon={faHome} />
        <span>Strona główna</span>
      </Link>
      <FontAwesomeIcon
        className="navigation-section__icon-divider"
        icon={faAngleDoubleRight}
      />
      <span>Użytkownicy</span>
    </div>
  );
}
