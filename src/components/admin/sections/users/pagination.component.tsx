import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDoubleLeft, faAngleLeft, faAngleRight, faAngleDoubleRight } from "@fortawesome/free-solid-svg-icons";

interface IPaginationProp {
  setCurrentPage: Function;
  currentPage: number;
  totalItems: number | undefined;
  pageSize: number;
}

export default function Pagination(prop: IPaginationProp) {
  const {setCurrentPage, currentPage, totalItems, pageSize} = prop;
  const totalPages = Math.ceil((totalItems || 0) / pageSize);
  const disableFirstPageButton = currentPage === 0;
  const disablePreviousPageButton = currentPage === 0;
  const disableNextPageButton = currentPage === totalPages - 1;
  const disableLastPageButton = currentPage === totalPages - 1;

  return (
    <div className="admin-pagination">
      <button className="admin-pagination__btn" type="button" disabled={disableFirstPageButton} onClick={() => setCurrentPage(0)}><FontAwesomeIcon icon={faAngleDoubleLeft} /></button>
      <button className="admin-pagination__btn" type="button" disabled={disablePreviousPageButton} onClick={() => setCurrentPage(currentPage-1)}><FontAwesomeIcon icon={faAngleLeft} /></button>
      <span className="admin-pagination__current-position">strona {currentPage + 1} z {totalPages}</span>
      <button className="admin-pagination__btn" type="button" disabled={disableNextPageButton} onClick={() => setCurrentPage(currentPage+1)}><FontAwesomeIcon icon={faAngleRight} /></button>
      <button className="admin-pagination__btn" type="button" disabled={disableLastPageButton} onClick={() => setCurrentPage(totalPages - 1)}><FontAwesomeIcon icon={faAngleDoubleRight} /></button>
    </div>
  );
}
