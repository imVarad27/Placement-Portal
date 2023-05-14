import React from "react";
import "./CompanyRegister.css";
import Card from "../../../shared/Card";
const CompanyRegister = () => {
  return (
    <div className="company-registration marginleft">
      <h3>Company Registration</h3>
      <Card
        img={
          "data:image/png;base64,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"
        }
        companyName={"Google India"}
        date={"12 Dec 2023"}
        jobTitle={"Software Developer"}
        salary={"10 Lakhs"}
      />
      <Card
        img={
          "https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Infosys_logo.svg/1280px-Infosys_logo.svg.png"
        }
        companyName={"Infosys India"}
        date={"2 Dec 2023"}
        jobTitle={"Software Developer"}
        salary={"12 Lakhs"}
      />
    </div>
  );
};
export default CompanyRegister;
