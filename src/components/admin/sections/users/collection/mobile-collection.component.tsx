import React, { FunctionComponent } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPen,
  faTrash,
  faLock,
  faUnlock,
  faKey,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { IUserTableRow } from "../../../../../types/user";
import { IPagination } from "../../../../../types/util";
import { formatAppDateTime } from "../../../../../util/formats";

interface IUsersMobileCollectionProps {
  paginationData: IPagination<IUserTableRow> | null;
  toggleActivityConfirm: Function;
  removeConfirm: Function;
}

const emptyCard = (
  <div>
    <h1>Brak rekordów</h1>
  </div>
);

function UsersTiles(props: IUsersMobileCollectionProps) {
  const { paginationData, toggleActivityConfirm, removeConfirm } = props;

  if (paginationData === null) {
    return <></>;
  }

  const items = paginationData.data.map((x) => (
    <div className="data-tile" key={x.metadata.id}>
      <div className="data-tile__record">
        <span className="data-tile__record-label">Email</span>
        <span className="data-tile__record-value">{x.email}</span>
      </div>
      <div className="data-tile__record">
        <span className="data-tile__record-label">Imię</span>
        <span className="data-tile__record-value">{x.firstName}</span>
      </div>
      <div className="data-tile__record">
        <span className="data-tile__record-label">Nazwisko</span>
        <span className="data-tile__record-value">{x.lastName}</span>
      </div>
      <div className="data-tile__record">
        <span className="data-tile__record-label">Data utworzenia</span>
        <span className="data-tile__record-value">
          {formatAppDateTime(x.created)}
        </span>
      </div>
      <div className="data-tile__record">
        <span className="data-tile__record-label">Ostatnie logowanie</span>
        <span className="data-tile__record-value">
          {formatAppDateTime(x.lastLogin)}
        </span>
      </div>
      {!x.metadata.isRemoved && (
        <div className="data-tile__actions">
          <Link
            className="data-tile__actions-btn mr-md"
            to={"/admin/users/edit/" + x.metadata.id}
          >
            <FontAwesomeIcon icon={faPen} />
          </Link>
          <Link
            className="data-tile__actions-btn mr-md"
            to={"/admin/users/reset-password/" + x.metadata.id}
          >
            <FontAwesomeIcon icon={faKey} />
          </Link>
          <Link
            className="data-tile__actions-btn mr-md"
            to={"/admin/users/details/" + x.metadata.id}
          >
            <FontAwesomeIcon icon={faInfoCircle} />
          </Link>
          <button
            className="data-tile__actions-btn mr-md"
            onClick={() => toggleActivityConfirm(x)}
          >
            {x.metadata.isEnabled && <FontAwesomeIcon icon={faLock} />}
            {!x.metadata.isEnabled && <FontAwesomeIcon icon={faUnlock} />}
          </button>
          <button
            className="data-tile__actions-btn data-tile__actions-btn--danger"
            onClick={() => removeConfirm(x)}
          >
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>
      )}
      {x.metadata.isRemoved && (
        <div className="data-tile__actions text-danger">
          użytkownik usunięty
        </div>
      )}
    </div>
  ));

  return (
    <>
      {items}
      <h3>Ilość rekordów: {paginationData.totalItems}</h3>
    </>
  );
}

const UsersMobileCollectionOrigin: FunctionComponent<IUsersMobileCollectionProps> = (
  props
) => {
  const { paginationData } = props;

  if (paginationData === null || paginationData.totalItems === 0) {
    return <>{emptyCard}</>;
  }

  return <UsersTiles {...props} />;
};
export const UsersMobileCollection = React.memo(UsersMobileCollectionOrigin);
