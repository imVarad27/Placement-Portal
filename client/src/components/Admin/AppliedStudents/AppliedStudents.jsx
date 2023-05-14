import React, { useEffect, useRef, useState } from "react";
import Styles from "./AppliedStudents.module.css";
import { useParams } from "react-router-dom";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";
import Slider from "@mui/material/Slider";
import { Alert, AlertTitle, CircularProgress } from "@mui/material";

const AppliedStudents = () => {
  const [error, setError] = useState();
  const [success, setSuccess] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setError(null);
      setSuccess(null);
    }, 3000);
    return () => clearTimeout(timer);
  }, [success, error]);

  const searchInputRef = useRef();
  const [showFilter, setShowFilter] = useState(false);

  const setShowFilterHandler = () => {
    setShowFilter(!showFilter);
  };

  const handlePrint = () => {
    const doc = new jsPDF();
    doc.autoTable({ html: "#student" });
    doc.save("table.pdf");
  };

  const handleExport = () => {
    const sheetName = "Students";
    const workbook = XLSX.utils.book_new();
    const table = document.getElementById("student");
    const sheet = XLSX.utils.table_to_sheet(table);
    XLSX.utils.book_append_sheet(workbook, sheet, sheetName);
    XLSX.writeFile(workbook, "students.xlsx");
  };

  const [companyData, setCompanyData] = useState();
  const [studentsData, setStudentsData] = useState([]);

  const [selectedCheckbox, setSelectedCheckbox] = useState([]);
  const setSelectedRowsHandler = (e) => {
    const index = e.target.parentNode.rowIndex - 1;
    if (selectedCheckbox.includes(index)) {
      setSelectedCheckbox(selectedCheckbox.filter((item) => item !== index));
    } else {
      setSelectedCheckbox([...selectedCheckbox, index]);
    }
  };

  const [cgpa, setCgpa] = useState([0, 10]);

  const cgpaChangeHandler = (event, newValue) => {
    setCgpa(newValue);
  };

  const [checked, setChecked] = useState([]);

  const branchCheckboxHandler = (e) => {
    if (e.target.checked) {
      setChecked([...checked, e.target.value]);
    } else {
      setChecked(checked.filter((item) => item !== e.target.value));
    }
  };
  const [searchTerm, setSearchTerm] = useState("");
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

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

  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: null,
  });

  const filteredStudents = studentsData
    .filter(
      (student) =>
        (checked.length === 0 || checked.includes(student?.stream)) &&
        (student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          student.stream.toLowerCase().includes(searchTerm.toLowerCase()) ||
          student.batch.toLowerCase().includes(searchTerm.toLowerCase()) ||
          student.prn.toLowerCase().includes(searchTerm.toLowerCase())) &&
        student.cgpa >= cgpa[0] &&
        student.cgpa <= cgpa[1]
    )
    .sort((a, b) => {
      if (!sortConfig.key) {
        return 0;
      }

      const directionModifier = sortConfig.direction === "ascending" ? 1 : -1;
      const aKey = a[sortConfig.key];
      const bKey = b[sortConfig.key];

      if (aKey < bKey) {
        return -1 * directionModifier;
      }

      if (aKey > bKey) {
        return 1 * directionModifier;
      }

      return 0;
    });

  const onSort = (key) => {
    let direction = "ascending";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "ascending"
    ) {
      direction = "descending";
    }

    setSortConfig({ key, direction });
  };

  const updateButtonHandler = async (e) => {
    e.preventDefault();
    try {
      const selectedStudents = selectedCheckbox.map(
        (index) => filteredStudents[index]
      );
      const newArray = selectedStudents.filter((stu) => {
        return stu !== undefined;
      });
      const response = await fetch(
        `http://localhost:5500/api/admin//movetoplace/${cid.id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            selectedstudents: newArray,
          }),
        }
      );
      if (!response.ok) {
        const error = await response.json();
        setError(error.message);
      } else {
        setSuccess("Updated Successfully");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <React.Fragment>
      {error && (
        <Alert
          variant="filled"
          severity="error"
          style={{
            position: "fixed",
            top: 77,
            right: 18,
            zIndex: 999,
            width: 300,
          }}
        >
          <AlertTitle>Error</AlertTitle>
          {error}
        </Alert>
      )}
      {success && (
        <Alert
          variant="filled"
          everity="success"
          style={{
            position: "fixed",
            top: 77,
            right: 18,
            zIndex: 999,
            width: 300,
          }}
        >
          <AlertTitle>Success</AlertTitle>
          {success}
        </Alert>
      )}
      {studentsData.length > 0 && companyData && (
        <div className={`marginleft` + ` ${Styles["applied-students"]}`}>
          <h3>
            {" "}
            Applied Students for{" "}
            <span
              style={{
                fontWeight: 800,
              }}
            >
              {companyData.companydetails.companydetails.companyname}
            </span>
          </h3>
          <div className={`${Styles["table-students"]}`}>
            <div className={`${Styles["table-buttons"]}`}>
              <button onClick={setShowFilterHandler}>
                <i
                  className={`${Styles["pdf-icon"]}` + ` fa-solid fa-filter`}
                ></i>
                Filter
              </button>
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
            {showFilter && (
              <div className={`${Styles["filter-box"]}`}>
                <div className={`${Styles["search-box"]}`}>
                  <i className="fa-solid fa-magnifying-glass"></i>
                  <input
                    ref={searchInputRef}
                    type="text"
                    placeholder="Search"
                    onChange={handleSearchChange}
                  ></input>
                </div>
                <div className={`${Styles["checkbox-style"]}`}>
                  <div className={`${Styles["checkbox-style__content"]}`}>
                    <input
                      id="cse"
                      value="Computer Science and Engineering"
                      type="checkbox"
                      onChange={branchCheckboxHandler}
                    />
                    <label htmlFor="cse">Computer Science</label>
                  </div>
                  <div className={`${Styles["checkbox-style__content"]}`}>
                    <input
                      id="AI"
                      value="Artificial Intelligence"
                      type="checkbox"
                      onChange={branchCheckboxHandler}
                    />
                    <label htmlFor="AI">Artificial Intelligence</label>
                  </div>
                  <div className={`${Styles["checkbox-style__content"]}`}>
                    <input
                      id="Electronics and Telecommunication Engineering"
                      type="checkbox"
                      value="Electronics and Telecommunication Engineering"
                      onChange={branchCheckboxHandler}
                    />
                    <label htmlFor="Electronics and Telecommunication">
                      Electronics and Telecommunication
                    </label>
                  </div>
                  <div className={`${Styles["checkbox-style__content"]}`}>
                    <input
                      id="Electrical"
                      type="checkbox"
                      value="Electrical Engineering"
                      onChange={branchCheckboxHandler}
                    />
                    <label htmlFor="Electrical">Electrical</label>
                  </div>
                  <div className={`${Styles["checkbox-style__content"]}`}>
                    <input
                      id="Mechanical"
                      type="checkbox"
                      value="Mechanical Engineering"
                      onChange={branchCheckboxHandler}
                    />
                    <label htmlFor="Mechanical">Mechanical</label>
                  </div>
                  <div className={`${Styles["checkbox-style__content"]}`}>
                    <input
                      id="Civil"
                      value="Civil Engineering"
                      type="checkbox"
                      onChange={branchCheckboxHandler}
                    />
                    <label htmlFor="Civil">Civil</label>
                  </div>
                </div>
                <div className={`${Styles["slider"]}}`}>
                  <Slider
                    value={cgpa}
                    onChange={cgpaChangeHandler}
                    valueLabelDisplay="auto"
                    min={0}
                    max={10}
                    step={0.1}
                    style={{ color: "#364fc7", width: "100px" }}
                  />
                  <div>{`CGPA range: ${cgpa[0]} - ${cgpa[1]}`}</div>
                </div>
              </div>
            )}
            <table id="student">
              <tbody>
                <tr>
                  <th
                    className={`${Styles["sort"]}`}
                    onClick={() => onSort("prn")}
                  >
                    PRN
                  </th>
                  <th
                    className={`${Styles["sort"]}`}
                    onClick={() => onSort("name")}
                  >
                    Name
                  </th>
                  <th
                    className={`${Styles["sort"]}`}
                    onClick={() => onSort("stream")}
                  >
                    Branch
                  </th>
                  <th
                    className={`${Styles["sort"]}`}
                    onClick={() => onSort("cgpa")}
                  >
                    CGPA
                  </th>
                  <th>View</th>
                  <th
                    className={`${Styles["sort"]}`}
                    onClick={() => onSort("batch")}
                  >
                    Batch
                  </th>
                  <th>
                    Select&nbsp;&nbsp;
                    <input
                      type="checkbox"
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedCheckbox(
                            studentsData.map((_, index) => index)
                          );
                        } else {
                          setSelectedCheckbox([]);
                        }
                      }}
                    />
                  </th>
                </tr>
              </tbody>

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
                      <td>
                        <input
                          type="checkbox"
                          checked={selectedCheckbox.includes(index)}
                          onChange={(e) => {
                            setSelectedCheckbox((prev) => {
                              if (prev.includes(index)) {
                                return prev.filter((i) => i !== index);
                              } else {
                                return [...prev, index];
                              }
                            });
                          }}
                        />
                      </td>
                    </tr>
                  </tbody>
                );
              })}
            </table>
          </div>
        </div>
      )}
      <div className={`${Styles["move-to-apply"]}`}>
        <button onClick={updateButtonHandler}>Update</button>
      </div>
    </React.Fragment>
  );
};

export default AppliedStudents;
