import React, { useEffect, useRef, useState } from "react";
import Styles from "./Dashboard.module.css";
import jsPDF from "jspdf";
import "jspdf-autotable";
import * as XLSX from "xlsx";
const Dashboard = () => {
  const searchInputRef = useRef();

  const handlePrint = () => {
    const doc = new jsPDF();
    doc.autoTable({ html: "#student" });
    doc.save("table.pdf");
  };

  const handleExport = () => {
    // let wb = XLSX.utils.book_new();
    // let ws = XLSX.utils.json_to_sheet(studentsData);
    // XLSX.utils.book_append_sheet(wb, ws, "Students");

    // XLSX.writeFile(wb, "students.xlsx");

    const sheetName = "Students";
    const workbook = XLSX.utils.book_new();
    const table = document.getElementById("student");
    const sheet = XLSX.utils.table_to_sheet(table);
    XLSX.utils.book_append_sheet(workbook, sheet, sheetName);
    XLSX.writeFile(workbook, "students.xlsx");
  };

  // search

  const [studentsData, setStudentsData] = useState([]);
  useEffect(() => {
    const getDashboard = async () => {
      try {
        const response = await fetch(
          `http://localhost:5500/api/admin/dashboard/`
        );
        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.message);
        } else {
          const data = await response.json();
          const newArray = [].concat.apply([], data.students);
          setStudentsData(newArray);
        }
      } catch (err) {
        console.log(err);
      }
    };
    getDashboard();
  }, []);

  const [selectedCheckbox, setSelectedCheckbox] = useState([]);
  const setSelectedRowsHandler = (e) => {
    const index = e.target.parentNode.rowIndex - 1;
    if (selectedCheckbox.includes(index)) {
      setSelectedCheckbox(selectedCheckbox.filter((item) => item !== index));
    } else {
      setSelectedCheckbox([...selectedCheckbox, index]);
    }
  };
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

  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredStudents = studentsData.filter(
    (student) =>
      student.name
        .toString()
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      student.stream
        .toString()
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      student.batch
        .toString()
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      student.prn.toString().toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <React.Fragment>
      {studentsData.length > 0 && (
        <div className={`marginleft` + ` ${Styles["applied-students"]}`}>
          <h3> Dashboard</h3>
          <div className={`${Styles["table-students"]}`}>
            <div className={`${Styles["table-buttons"]}`}>
              <div className={`${Styles["search-box"]}`}>
                <i class="fa-solid fa-magnifying-glass"></i>
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Search"
                  onChange={handleSearchChange}
                ></input>
              </div>
              <div className={`${Styles["export-buttons"]}`}>
                <button onClick={handleExport}>
                  <i
                    className={
                      `${Styles["pdf-icon"]}` + ` fa-regular fa-file-excel`
                    }
                  ></i>
                  Download
                </button>
                <button onClick={handlePrint}>
                  <i
                    className={
                      `${Styles["pdf-icon"]}` + ` fa-regular fa-file-pdf`
                    }
                  ></i>
                  Download
                </button>
              </div>
            </div>
            <table id="student">
              <tbody>
                <tr>
                  <th>PRN</th>
                  <th>Name</th>
                  <th>Branch</th>
                  <th>CGPA</th>
                  <th>Resume</th>
                  <th>Passout Batch</th>
                </tr>
              </tbody>
              {/* <tbody>
              <tr onClick={setSelectedRowsHandler}>
                <td>20UCS001</td>
                <td>SHIRISH MANOHAR HADPAD</td>
                <td>COMPUTER SCIENCE AND ENGINEERING</td>
                <td>8.00</td>
                <td>VIEW</td>
                <td>2024</td>
                <td>
                  <input
                    type="checkbox"
                    onChange={(e) => {
                      setSelectedCheckbox((prev) => {
                        return [...prev, 0];
                      });
                    }}
                  />
                </td>
              </tr>
            </tbody> */}
              {filteredStudents.map((student, index) => {
                return (
                  <tbody key={student._id}>
                    <tr onClick={setSelectedRowsHandler}>
                      <td>{student.prn}</td>
                      <td>{student.name}</td>
                      <td className={`${Styles["less-size"]}`}>
                        {student.stream}
                      </td>
                      <td>{student.cgpa}</td>
                      <td>
                        <a href={student.resume} target="_blank">
                          VIEW
                        </a>
                      </td>
                      <td className={`${Styles["branch-width"]}`}>
                        {student.batch}
                      </td>
                      {/* <td>
                      <input
                        type="checkbox"
                        defaultChecked={selectedCheckbox.includes(index)}
                      />
                    </td> */}
                    </tr>
                  </tbody>
                );
              })}
            </table>
            {/* <Table
            aria-label="Example static striped collection table"
            striped
            sticked
            bordered
            selectionMode="multiple"
          >
            <Table.Header>
              <Table.Column>PRN</Table.Column>
              <Table.Column>Name</Table.Column>
              <Table.Column>Branch</Table.Column>
              <Table.Column>CGPA</Table.Column>
            </Table.Header>
            <Table.Body>
              {studentsData.map((student) => {
                return (
                  <Table.Row key={student._id}>
                    <Table.Cell>{student.prn}</Table.Cell>
                    <Table.Cell>{student.name}</Table.Cell>
                    <Table.Cell>{student.stream}</Table.Cell>
                    <Table.Cell>{student.cgpa}</Table.Cell>
                  </Table.Row>
                );
              })}
            </Table.Body>
          </Table> */}
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default Dashboard;
