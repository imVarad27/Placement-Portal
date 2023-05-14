import React, { useEffect, useState } from "react";
import Styles from "./AppliedStudents.module.css";
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
    const getStudentsData = async () => {
      try {
        const response = await fetch(
          `http://localhost:5500/api/admin/appliedstudents/${cid.id}`
        );
        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.message);
        } else {
          const data = await response.json();
          const newArray = [].concat.apply([], data.appliedstudents);
          setStudentsData(newArray);
        }
      } catch (err) {
        console.log(err);
      }
    };
    getStudentsData();
  }, []);
  // const rows = [
  //   {
  //     id: 0,
  //     prn: "20UCS001",
  //     name: "SHIRISH MANOHAR HADPAD",
  //     branch: "COMPUTER SCIENCE AND ENGINEERING",
  //     cgpa: 9,
  //     resume: "VIEW",
  //     batch: 2024,
  //   },
  //   {
  //     id: 1,
  //     prn: "20UCS002",
  //     name: "AHIRISH MANOHAR HADPAD",
  //     branch: "COMPUTER SCIENCE AND ENGINEERING",
  //     cgpa: 7,
  //     resume: "VIEW",
  //     batch: 2024,
  //   },
  // ];
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

  const newRows = studentsData.map((student, index) => {
    return {
      id: student._id || index,
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
            Applied Students for{" "}
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
          />
        </div>
      )}
    </React.Fragment>
    // <DataGrid rows={5} columns={5} pageSize={5} />
    // <div className={`marginleft` + ` ${Styles["applied-students"]}`}>
    //   <h3>
    //     Applied Students for <span>ABC</span>
    //   </h3>
    //   <div className={`${Styles["table-students"]}`}>
    //     <table>
    //       <tbody>
    //         <tr>
    //           <th>PRN</th>
    //           <th>Name</th>
    //           <th>Branch</th>
    //           <th>CGPA</th>
    //           <th>Resume</th>
    //           <th>Passout Batch</th>
    //           <th>Select</th>
    //         </tr>
    //       </tbody>
    //       <tbody>
    //         <tr onClick={setSelectedRowsHandler}>
    //           <td>20UCS001</td>
    //           <td>SHIRISH MANOHAR HADPAD</td>
    //           <td>COMPUTER SCIENCE AND ENGINEERING</td>
    //           <td>8.00</td>
    //           <td>VIEW</td>
    //           <td>2024</td>
    //           <td>
    //             <input type="checkbox" checked={selectedCheckbox.includes(0)} />
    //           </td>
    //         </tr>
    //       </tbody>
    //       <tbody>
    //         <tr onClick={setSelectedRowsHandler}>
    //           <td>20UCS001</td>
    //           <td>SHIRISH MANOHAR HADPAD</td>
    //           <td>COMPUTER SCIENCE AND ENGINEERING</td>
    //           <td>8.00</td>
    //           <td>VIEW</td>
    //           <td>2024</td>
    //           <td>
    //             <input type="checkbox" checked={selectedCheckbox.includes(1)} />
    //           </td>
    //         </tr>
    //       </tbody>
    //     </table>
    //   </div>
    // </div>
  );
};

export default AppliedStudents;
