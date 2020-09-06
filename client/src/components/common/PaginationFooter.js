import React from "react";
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";

const PaginationFooter = ({ itemsPerPage, totalItems, paginate, index }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav aria-label="..." className="table-responsive mb-2">
      <Pagination
        className="d-flex pagination justify-content-md-end justify-content-center mb-0"
        listClassName="justify-content-md-end justify-content-center mb-0"
      >
        <PaginationItem disabled={index === 1}>
          <PaginationLink href="#" onClick={e => paginate(e, 1)} tabIndex="-1">
            <i className="fas fa-angle-left" />
            <i className="fas fa-angle-left" />
            <span className="sr-only">Previo</span>
          </PaginationLink>
        </PaginationItem>

        <PaginationItem disabled={index === 1}>
          <PaginationLink
            href="#"
            onClick={e => paginate(e, index - 1)}
            tabIndex="-1"
          >
            <i className="fas fa-angle-left" />
          </PaginationLink>
        </PaginationItem>

        {pageNumbers.map(number => (
          <PaginationItem
            key={number}
            className={index === number ? "active" : null}
          >
            <PaginationLink
              href="#"
              className="active"
              onClick={e => paginate(e, number)}
            >
              {number}
            </PaginationLink>
          </PaginationItem>
        ))}

        <PaginationItem disabled={index === pageNumbers.length}>
          <PaginationLink
            href="#"
            onClick={e => paginate(e, index + 1)}
            tabIndex="-1"
          >
            <i className="fas fa-angle-right" />
          </PaginationLink>
        </PaginationItem>
        <PaginationItem disabled={index === pageNumbers.length}>
          <PaginationLink
            href="#"
            onClick={e => paginate(e, pageNumbers.length)}
          >
            <i className="fas fa-angle-right" />
            <i className="fas fa-angle-right" />
            <span className="sr-only">Siguiente</span>
          </PaginationLink>
        </PaginationItem>
      </Pagination>
    </nav>
  );
};

export default PaginationFooter;
