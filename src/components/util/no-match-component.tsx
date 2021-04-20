import "./no-match-component.scss";
import tukanIcon from "../../images/tukan.png";

export default function NoMatch() {
  return (
    <div className="no-match-page">
        <img src={tukanIcon} alt="icon"></img>
        <h1 className="no-match-page__title">tu jestem tylko ja ... </h1>
        <h2 className="no-match-page__subtitle">nie ma tego czego szukasz ... </h2>
    </div>
  );
}
