import React, { useEffect, useState } from "react";
import Styles from "./AdminHome.module.css";
import Card from "../../../shared/Card";
const AdminHome = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [success, setSuccess] = useState();
  useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          "http://localhost:5500/api/admin/getdrives"
        );
        if (!response.ok) {
          const error = await response.json();
          setError(error.message);
        } else {
          const data = await response.json();
          data.drives.reverse();
          setData(data);
        }
      } catch (err) {
        setError(err.message);
      }
    };
    getData();
    setIsLoading(false);
  }, []);
  return (
    <React.Fragment>
      <div className={`marginleft ${Styles["admin-home"]}`}>
        <h3>Current Drives</h3>
        {data && data.drives && data.drives.length === 0 && (
          <h4
            style={{
              textAlign: "center",
              marginTop: "2rem",
              marginBottom: "2rem",
            }}
          >
            No Drives Posted...
          </h4>
        )}

        {data &&
          data.drives.length > 0 &&
          data.drives.reverse().map((drive) => {
            return (
              <React.Fragment key={drive._id}>
                <Card
                  img={drive.companydetails.companylogo}
                  companyName={drive.companydetails.companyname}
                  date={drive.registrationdetails.registrationstartdate}
                  salary={drive.packagedetails.packageoffered + " Lakhs"}
                  id={drive._id}
                  aboutcompany={drive.companydetails.aboutcompany}
                />
              </React.Fragment>
            );
          })}
        <h3>Past Drives</h3>
      </div>
    </React.Fragment>
  );
};

export default AdminHome;
