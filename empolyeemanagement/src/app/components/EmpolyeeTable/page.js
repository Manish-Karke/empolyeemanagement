import React from "react";
import Link from "next/link";
import { PenTool } from "@deemlol/next-icons";
import { BsFillTrash3Fill } from "react-icons/bs";

const EmployeeTable = ({
  employees,
  handleUpdateEmployee,
  pagination,
  fetchEmployees,
  handleDeleteEmployee,
}) => {
  const Headers = ["Name ", "Email", "Phone", "Department", "Actions"];
  const { totalPages, currentPage } = pagination;

  const handlePagination = (pageNumber) => {
    console.log("handlePagination called for page:", pageNumber);
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      fetchEmployees("", pageNumber, 5); //
    }
  };

  const handlePreviousPage = () => {
    console.log("Previous button clicked. Current page:", currentPage);
    if (currentPage > 1) {
      handlePagination(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      handlePagination(currentPage + 1);
    }
  };
  const TableRow = ({ employee }) => {
    return (
      <tr>
        <td>
          <Link
            href={`Empolyeedetails/${employee._id}`} // 
            className="text-decoration-none"
          >
            {employee.name}
          </Link>
        </td>

        <td>{employee.email}</td>
        <td>{employee.phone}</td>
        <td>{employee.department}</td>
        <td>
          <div style={{ display: "flex", alignItems: "center", gap: "2" }}>
            <PenTool
              size={24}
              color="blue"
              role="button"
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              title="Edit"
              onClick={() => handleUpdateEmployee(employee)}
              style={{ marginRight: "1rem" }}
            />
            <BsFillTrash3Fill
              size={24}
              color="red"
              role="button"
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              title="Delete"
              onClick={() => handleDeleteEmployee(employee._id)} // Assuming you'll implement delete
            />
          </div>
        </td>
      </tr>
    );
  };
  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );

  return (
    <>
      <table className="table table-striped">
        <thead>
          <tr>
            {Headers.map((header, i) => (
              <th key={i}>{header}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {employees?.length ? (
            employees.map((emp) => <TableRow key={emp._id} employee={emp} />)
          ) : (
            <tr>
              <td colSpan={5} className="text-center text-muted py-4">
                No employees found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="d-flex justify-content-between align-items-center justify-evenly my-3">
        <span className="badge bg-primary">
          Pages: {totalPages} | Current: {currentPage}
        </span>
        <div>
          <button
            className="btn btn-outline-primary me-2"
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
          >
            previous
          </button>
          {pageNumbers.map((page) => (
            <button
              key={page}
              className={`btn btn-outline-primary me-1"
              ${currentPage === page ? "active" : ""}`}
              onClick={() => handlePagination(page)}
            >
              {page}
            </button>
          ))}
          <button
            className="btn btn-outline-primary"
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default EmployeeTable;
