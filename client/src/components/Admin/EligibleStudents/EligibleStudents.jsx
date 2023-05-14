import React, { useEffect, useState } from "react";
import Styles from "./EligibleStudents.module.css";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useParams } from "react-router-dom";
const AppliedStudents = () => {
  const [companyData, setCompanyData] = useState();
  const [studentsData, setStudentsData] = useState([]);
  const cid = useParams();
  useEffect(() => {
    const getCompanyDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:5500/api/admin/company/${cid.id}`
        );
        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.message);
        } else {
          const data = await response.json();

          setCompanyData(data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    getCompanyDetails();
    const getEligibleStudents = async () => {
      try {
        const response = await fetch(
          `http://localhost:5500/api/admin/eligiblestudents/${cid.id}`
        );
        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.message);
        } else {
          const data = await response.json();
          const newArray = [].concat.apply([], data.eligiblestudents);
          setStudentsData(newArray);
        }
      } catch (err) {
        console.log(err);
      }
    };
    getEligibleStudents();
  }, []);

  const columns = [
    { field: "prn", headerName: "PRN", width: 150 },
    { field: "name", headerName: "Name", width: 250 },
    { field: "branch", headerName: "Branch", width: 300 },
    { field: "cgpa", headerName: "CGPA", width: 120 },
    { field: "resume", headerName: "Resume", width: 150 },
    { field: "batch", headerName: "Passout Batch", width: 160 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "contact", headerName: "Contact", width: 150 },
    { field: "address", headerName: "Address", width: 300 },
    { field: "city", headerName: "City", width: 150 },
    { field: "state", headerName: "State", width: 150 },
    { field: "ssc", headerName: "SSC", width: 100 },
    { field: "hsc", headerName: "HSC", width: 100 },
    { field: "backlogs", headerName: "Backlogs", width: 120 },
    { field: "livebacklogs", headerName: "Live Backlogs", width: 150 },
  ];

  const newRows = studentsData.map((student) => {
    return {
      id: student._id,
      prn: student.prn,
      name: student.name,
      branch: student.stream,
      cgpa: student.cgpa,
      resume: "VIEW",
      batch: student.batch,
      email: student.email,
      contact: student.contact,
      address: student.address,
      city: student.city,
      state: student.state,
      ssc: student.ssc,
      hsc: student.hsc,
      backlogs: student.backlogs,
      livebacklogs: student.livebacklogs,
    };
  });

  const [columnVisibilityModel, setColumnVisibilityModel] = useState({
    email: false,
    contact: false,
    address: false,
    city: false,
    state: false,
    ssc: false,
    hsc: false,
    backlogs: false,
    livebacklogs: false,
  });
  return (
    <React.Fragment>
      {companyData && (
        <div className={`marginleft` + ` ${Styles["applied-students"]}`}>
          <h3>
            Eligible Students for{" "}
            <span>{companyData.companydetails.companydetails.companyname}</span>
          </h3>
          <DataGrid
            rows={newRows}
            columns={columns}
            pageSize={5}
            checkboxSelection
            className={`${Styles["table-students"]}`}
            columnVisibilityModel={columnVisibilityModel}
            onColumnVisibilityModelChange={(newModel) => {
              setColumnVisibilityModel(newModel);
            }}
            slots={{
              toolbar: GridToolbar,
            }}
            // pageSizeOptions={[200, 300]}
            getRowId={(row) => row.id}
          />
        </div>
      )}
    </React.Fragment>
  );
};

export default AppliedStudents;
