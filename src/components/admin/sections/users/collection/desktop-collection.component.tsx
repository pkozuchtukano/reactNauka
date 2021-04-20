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

interface IUsersDekstopProps {
  paginationData: IPagination<IUserTableRow> | null;
  toggleActivityConfirm: Function;
  removeConfirm: Function;
}

const emptyTable = (
  <table className="table">
    <thead>
      <tr>
        <th></th>
        <th>Email</th>
        <th>Imię</th>
        <th>Nazwisko</th>
        <th>Data utworzenia</th>
        <th>Ostatnie logowanie</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td className="empty-table-record" colSpan={6}>
          Brak rekordów
        </td>
      </tr>
    </tbody>
  </table>
);

function UsersTable(props: IUsersDekstopProps) {
  const { paginationData, toggleActivityConfirm, removeConfirm } = props;

  if (paginationData === null) {
    return <></>;
  }

  const items = paginationData.data.map((x) => (
    <tr key={x.metadata.id}>
      {!x.metadata.isRemoved && (
        <td>
          <Link
            className="link-btn mr-md"
            to={"/admin/users/edit/" + x.metadata.id}
          >
            <FontAwesomeIcon icon={faPen} />
          </Link>
          <Link
            className="link-btn mr-md"
            to={"/admin/users/reset-password/" + x.metadata.id}
          >
            <FontAwesomeIcon icon={faKey} />
          </Link>
          <Link
            className="link-btn mr-md"
            to={"/admin/users/details/" + x.metadata.id}
          >
            <FontAwesomeIcon icon={faInfoCircle} />
          </Link>
          <button
            className="link-btn mr-md"
            onClick={() => toggleActivityConfirm(x)}
          >
            {x.metadata.isEnabled && <FontAwesomeIcon icon={faLock} />}
            {!x.metadata.isEnabled && <FontAwesomeIcon icon={faUnlock} />}
          </button>
          <button
            className="link-btn link-btn--danger"
            onClick={() => removeConfirm(x)}
          >
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </td>
      )}
      {x.metadata.isRemoved && <td className="text-danger">użytkownik usunięty</td>}
      <td>{x.email}</td>
      <td>{x.firstName}</td>
      <td>{x.lastName}</td>
      <td>{formatAppDateTime(x.created)}</td>
      <td>{formatAppDateTime(x.lastLogin)}</td>
    </tr>
  ));

  return (
    <table className="table">
      <thead>
        <tr>
          <th></th>
          <th>Email</th>
          <th>Imię</th>
          <th>Nazwisko</th>
          <th>Data utworzenia</th>
          <th>Ostatnie logowanie</th>
        </tr>
      </thead>
      <tbody>{items}</tbody>
      <tfoot>
        <tr>
          <th colSpan={6}>Ilość rekordów: {paginationData.totalItems}</th>
        </tr>
      </tfoot>
    </table>
  );
}

const UsersDekstopCollectionOrigin: FunctionComponent<IUsersDekstopProps> = (
  props
) => {
  const { paginationData } = props;

  if (paginationData === null || paginationData.totalItems === 0) {
    return <>{emptyTable}</>;
  }

  return <UsersTable {...props} />;
};

export const UsersDekstopCollection = React.memo(UsersDekstopCollectionOrigin);
