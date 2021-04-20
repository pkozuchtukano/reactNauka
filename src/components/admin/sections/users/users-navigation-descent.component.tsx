import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faAngleDoubleRight } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

interface INavigationProps {
  title: string;
}

export default function Navigation(props: INavigationProps) {
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
      <Link to="/admin/users">
        <span>Użytkownicy</span>
      </Link>
      <FontAwesomeIcon
        className="navigation-section__icon-divider"
        icon={faAngleDoubleRight}
      />
      <span>{props.title}</span>
    </div>
  );
}
