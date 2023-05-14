import React from "react";
import "./Statistics.css";
import Table from "./Table";
const Statistics = (props) => {
  const ugData = [
    {
      "Sr.No": 1,
      Branch: "Computer Science",
      Students: 100,
      "Placed Students": 90,
      "Placement %": 90,
      Highest: 10,
      Average: 8,
    },
    {
      "Sr.No": 2,
      Branch: "Electronics",
      Students: 100,
      "Placed Students": 90,
      "Placement %": 90,
      Highest: 10,
      Average: 8,
    },
    {
      "Sr.No": 3,
      Branch: "Mechanical",
      Students: 100,
      "Placed Students": 90,
      "Placement %": 90,
      Highest: 10,
      Average: 8,
    },
    {
      "Sr.No": 4,
      Branch: "Civil",
      Students: 100,
      "Placed Students": 90,
      "Placement %": 90,
      Highest: 10,
      Average: 8,
    },
    {
      "Sr.No": 5,
      Branch: "Electrical",
      Students: 100,
      "Placed Students": 90,
      "Placement %": 90,
      Highest: 10,
      Average: 8,
    },
    {
      "Sr.No": 6,
      Branch: "Electronics",
      Students: 100,
      "Placed Students": 90,
      "Placement %": 90,
      Highest: 10,
      Average: 8,
    },
    {
      "Sr.No": 7,
      Branch: "Artificial Intelligence",
      Students: 100,
      "Placed Students": 90,
      "Placement %": 90,
      Highest: 10,
      Average: 8,
    },
  ];
  const ugData2022 = [
    {
      "Sr.No": 1,
      Branch: "Computer Science",
      Students: 90,
      "Placed Students": 73,
      "Placement %": 88.89,
      Highest: 10,
      Average: 8,
    },
    {
      "Sr.No": 2,
      Branch: "Electronics",
      Students: 90,
      "Placed Students": 80,
      "Placement %": 88.89,
      Highest: 10,
      Average: 8,
    },
    {
      "Sr.No": 3,
      Branch: "Mechanical",
      Students: 90,
      "Placed Students": 80,
      "Placement %": 88.89,
      Highest: 10,
      Average: 8,
    },
    {
      "Sr.No": 4,
      Branch: "Civil",
      Students: 90,
      "Placed Students": 80,
      "Placement %": 88.89,
      Highest: 10,
      Average: 8,
    },
    {
      "Sr.No": 5,
      Branch: "Electrical",
      Students: 90,
      "Placed Students": 80,
      "Placement %": 88.89,
      Highest: 10,
      Average: 8,
    },
    {
      "Sr.No": 6,
      Branch: "Electronics",
      Students: 90,
      "Placed Students": 80,
      "Placement %": 88.89,
      Highest: 10,
      Average: 8,
    },
    {
      "Sr.No": 7,
      Branch: "Artificial Intelligence",
      Students: 90,
      "Placed Students": 80,
      "Placement %": 88.89,
      Highest: 10,
      Average: 8,
    },
  ];
  const pgData = [
    {
      "Sr.No": 1,
      Branch: "MBA",
      Students: 60,
      "Placed Students": 50,
      "Placement %": 83,
      Highest: 8,
      Average: 6,
    },
    {
      "Sr.No": 2,
      Branch: "M-Tech",
      Students: 60,
      "Placed Students": 50,
      "Placement %": 83,
      Highest: 8,
      Average: 6,
    },
  ];
  const pgData2022 = [
    {
      "Sr.No": 1,
      Branch: "MBA",
      Students: 50,
      "Placed Students": 40,
      "Placement %": 80,
      Highest: 8,
      Average: 6,
    },
    {
      "Sr.No": 2,
      Branch: "M-Tech",
      Students: 50,
      "Placed Students": 40,
      "Placement %": 80,
      Highest: 8,
      Average: 6,
    },
  ];
  return (
    <Table
      ugData={props.value === "2022" ? ugData2022 : ugData}
      pgData={props.value === "2022" ? pgData2022 : pgData}
      year={props.value === "2022" ? "2021-22" : "2022-23"}
    />
    // <Table ugData={ugData} pgData={pgData} />
    // <>
    //   <div className="statistics">
    //     <h3>UG Placement Statistics 2022-23</h3>
    //     <table>
    //       <tbody>
    //         <tr>
    //           <th>Sr.No</th>
    //           <th>Branch</th>
    //           <th>Students</th>
    //           <th>Placed Students</th>
    //           <th>Placement %</th>
    //           <th>Highest</th>
    //           <th>Average</th>
    //         </tr>
    //       </tbody>
    //       {ugData.map((item, index) => {
    //         return (
    //           <tbody key={index}>
    //             <tr>
    //               <td>{item["Sr.No"]}</td>
    //               <td>{item["Branch"]}</td>
    //               <td>{item["Students"]}</td>
    //               <td>{item["Placed Students"]}</td>
    //               <td>{item["Placement %"]}</td>
    //               <td>{item["Highest"]}</td>
    //               <td>{item["Average"]}</td>
    //             </tr>
    //           </tbody>
    //         );
    //       })}
    //     </table>
    //   </div>
    //   <div className="statistics statistics-pg">
    //     <h3 className="pg">PG Placement Statistics 2022-23</h3>
    //     <table>
    //       <tbody>
    //         <tr>
    //           <th>Sr.No</th>
    //           <th>Branch</th>
    //           <th>Students</th>
    //           <th>Placed Students</th>
    //           <th>Placement %</th>
    //           <th>Highest</th>
    //           <th>Average</th>
    //         </tr>
    //       </tbody>
    //       {pgData.map((item, index) => {
    //         return (
    //           <tbody key={index}>
    //             <tr>
    //               <td>{item["Sr.No"]}</td>
    //               <td>{item["Branch"]}</td>
    //               <td>{item["Students"]}</td>
    //               <td>{item["Placed Students"]}</td>
    //               <td>{item["Placement %"]}</td>
    //               <td>{item["Highest"]}</td>
    //               <td>{item["Average"]}</td>
    //             </tr>
    //           </tbody>
    //         );
    //       })}
    //     </table>
    //   </div>
    // </>
  );
};
export default Statistics;
