import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useAdminMode from "../../../../hooks/use-admin-mode";
import { USERS } from "../../../../types/visuals";
import userService from "../../../../services/user.service";
import FilterBar from "./users-filter.component";
import Collection from "./collection/users-collection.component";
import Navigation from "./users-navigation.component";
import Pagination from "./pagination.component";
import { IUserTableRow, IUserTableFilters } from "../../../../types/user";
import { IPagination } from "../../../../types/util";

export default function UserIndex() {
  useAdminMode(USERS);
  const [
    paginationData,
    setPaginationData,
  ] = useState<IPagination<IUserTableRow> | null>(null);
  const [tableFilters, setTableFilters] = useState<IUserTableFilters | null>(
    null
  );
  const [currentPage, setCurrentPage] = useState(0);
  const [refreshCounter, setRefreshCounter] = useState(0);
  const pageSize: number = 10;

  useEffect(() => {
    userService.getUsers(currentPage, pageSize, tableFilters).then((data) => {
      setPaginationData(data);
    });
  }, [tableFilters, currentPage, refreshCounter]);

  return (
    <div>
      <Navigation />
      <div className="admin-card">
        <FilterBar setFilters={setTableFilters} />
      </div>
      <div className="admin-card">
        <Link to="/admin/users/new" className="admin-button admin-button--main">
          Nowy użytkownik
        </Link>
        <Collection
          paginationData={paginationData}
          refreshCounter={refreshCounter}
          setRefreshCounter={setRefreshCounter}
        />
        <Pagination
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
          totalItems={paginationData?.totalItems}
          pageSize={pageSize}
        />
      </div>
    </div>
  );
}
