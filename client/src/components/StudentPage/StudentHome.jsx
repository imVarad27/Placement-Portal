import React, { useEffect, useState } from "react";
import HomeStyles from "./StudentHome.module.css";
import "./../common.css";
import Card from "../../shared/Card";
const StudentHome = () => {
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
          // console.log(data);
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
      {data && data.drives && data.drives.length > 0 && (
        <div className={`${HomeStyles["active-drive"]} marginleft`}>
          <h3>Active Drives</h3>
          {data.drives.map((drive) => {
            return (
              <Card
                img={drive.companydetails.companylogo}
                companyName={drive.companydetails.companyname}
                salary={drive.packagedetails.packageoffered + " Lakhs"}
                date={drive.registrationdetails.registrationstartdate}
                id={drive._id}
                key={drive._id}
                jobtitle={drive.jobprofiledetails.jobtitle}
              />
            );
          })}
          {/* <Card
            img={
              "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Tata_Consultancy_Services_Logo.svg/2560px-Tata_Consultancy_Services_Logo.svg.png"
            }
            companyName={"Tata Consultancy Services"}
            salary={"20 Lakhs"}
            date={"7 Dec 2023"}
          />
          <Card
            img={
              "https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Infosys_logo.svg/1280px-Infosys_logo.svg.png"
            }
            companyName={"Infosys India"}
            salary={"10 Lakhs"}
            date={"12 Dec 2023"}
          />
          <h3 className={HomeStyles["applied-drives"]}>Applied Drives</h3>
          <Card
            img={
              "https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Infosys_logo.svg/1280px-Infosys_logo.svg.png"
            }
            companyName={"Infosys India"}
            salary={"10 Lakhs"}
            date={"2 Dec 2023"} */}
          {/* /> */}
        </div>
      )}
    </React.Fragment>
  );
};

export default StudentHome;
