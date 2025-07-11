"use client";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EmployeeTable from "../EmpolyeeTable/page";
import AddEmpolyee from "../AddEmpolyee/page";
import { DeleteEmpolyees, GetAllEmpolyees } from "../../api";
import { notify } from "../../../utils";

const EmployeeManagementApp = () => {
  const [showModal, setShowModal] = useState(false);
  const [employeeObj, setEmployeeObj] = useState(null);

  const [employeesData, setEmployeesData] = useState({
    employees: [],
    pagination: {
      currentPage: 1,
      pageSize: 5,
      totalEmployees: 0,
      totalPages: 0,
    },
  });

  const fetchEmployees = async (search = "", page = 1, limit = 5) => {
    console.log("Fetching Employees...");
    try {
      const response = await GetAllEmpolyees(search, page, limit); // Renamed 'data' to 'response' for clarity
      console.log("Fetched data:", response);
      if (response.success && response.data) {
        setEmployeesData({
          employees: response.data.employees,
          pagination: response.data.pagination,
        });
      }
    } catch (error) {
      console.error("Error fetching employees:", error);
      toast.error("Failed to fetch employees.");
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleSearch = (e) => {
    fetchEmployees(e.target.value);
  };

  const handleUpdateEmployee = (empObj) => {
    console.log("update emp", empObj);
    setEmployeeObj(empObj);
    setShowModal(true);
  };

  const handleDeleteEmployee = async (emp) => {
    console.log(emp);
    if (window.confirm("Are you sure you want to delete this employee?")) {
      try {
        const { success, message } = await DeleteEmpolyees(emp); // Call your API to delete the employee
        if (success) {
          notify(message, "success");
          fetchEmployees();
        } else {
          notify(message, "error");
        }
      } catch (error) {
        notify("Error deleting employee:", "error");
      }
    }
  };

  const handleAddEmpolyee = () => {
    setShowModal(true);
  };
  return (
    <div className="d-flex flex-column justify-content-center align-items-center w-100 p-3">
      <h1>Employee Management App</h1>{" "}
      <div className="w-100 d-flex justify-content-center">
        <div className="w-80 border bg-light p-3" style={{ width: "80%" }}>
          <div className="d-flex justify-content-between mb-3">
            <button
              className="btn btn-primary"
              onClick={() => {
                handleAddEmpolyee(console.log("get clicked"));
              }}
            >
              Add Employee
            </button>
          </div>

          <input
            onChange={handleSearch}
            type="text"
            placeholder="Search Employees..."
            className="form-control w-50 mb-3"
          />

          <EmployeeTable
            employees={employeesData.employees}
            pagination={employeesData.pagination}
            fetchEmployees={fetchEmployees}
            handleUpdateEmployee={handleUpdateEmployee}
            handleDeleteEmployee={handleDeleteEmployee}
          />

          <AddEmpolyee
            showModal={showModal}
            setShowModal={setShowModal}
            fetchEmployees={fetchEmployees}
            employeeObj={employeeObj}
          />
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
      />
    </div>
  );
};

export default EmployeeManagementApp;
