"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { GetEmployeeDetailsById } from "../../../api";
import "bootstrap/dist/css/bootstrap.min.css";
import Image from 'next/image'
const EmployeeDetailPage = () => {
  const { id } = useParams(); 
  const router = useRouter(); 
  const [employee, setEmployee] = useState({}); 

  useEffect(() => {
    const fetchEmployeeDetails = async () => {
      try {
        const data = await GetEmployeeDetailsById(id);
        setEmployee(data); 
      } catch (err) {
        alert("Error fetching employee details");
        console.error(err);
      }
    };

    if (id) fetchEmployeeDetails();
  }, [id]);

  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-header">
          <h2>Employee Details</h2>
        </div>
        <div className="card-body">
          <div className="row mb-3">
            <div className="col-md-3">
              <Image
                src={employee.data.image}
                alt={employee.data.name}
                className="img-fluid rounded"
              />
            </div>
            <div className="col-md-9">
              <h4>{employee.data.name}</h4>
              <p>
                <strong>Email:</strong> {employee.data.email}
              </p>
              <p>
                <strong>Phone:</strong> {employee.data.phone}
              </p>
              <p>
                <strong>Department:</strong> {employee.data.department}
              </p>
              <p>
                <strong>Salary:</strong> {employee.data.salary}
              </p>
            </div>
          </div>
          <button
            className="btn btn-primary"
            onClick={() => router.push("/components/EmpolyeeManagement")}
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetailPage;
