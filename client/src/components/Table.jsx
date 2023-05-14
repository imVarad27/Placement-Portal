const Table = (props) => {
  return (
    <>
      <div className="statistics">
        <h3>UG Placement Statistics {props.year}</h3>
        <table>
          <tbody>
            <tr>
              <th>Sr.No</th>
              <th>Branch</th>
              <th>Students</th>
              <th>Placed Students</th>
              <th>Placement %</th>
              <th>Highest</th>
              <th>Average</th>
            </tr>
          </tbody>
          {props.ugData.map((item, index) => {
            return (
              <tbody key={index}>
                <tr>
                  <td>{item["Sr.No"]}</td>
                  <td>{item["Branch"]}</td>
                  <td>{item["Students"]}</td>
                  <td>{item["Placed Students"]}</td>
                  <td>{item["Placement %"]}</td>
                  <td>{item["Highest"]}</td>
                  <td>{item["Average"]}</td>
                </tr>
              </tbody>
            );
          })}
        </table>
      </div>
      <div className="statistics statistics-pg">
        <h3 className="pg">PG Placement Statistics {props.year}</h3>
        <table>
          <tbody>
            <tr>
              <th>Sr.No</th>
              <th>Branch</th>
              <th>Students</th>
              <th>Placed Students</th>
              <th>Placement %</th>
              <th>Highest</th>
              <th>Average</th>
            </tr>
          </tbody>
          {props.pgData.map((item, index) => {
            return (
              <tbody key={index}>
                <tr>
                  <td>{item["Sr.No"]}</td>
                  <td>{item["Branch"]}</td>
                  <td>{item["Students"]}</td>
                  <td>{item["Placed Students"]}</td>
                  <td>{item["Placement %"]}</td>
                  <td>{item["Highest"]}</td>
                  <td>{item["Average"]}</td>
                </tr>
              </tbody>
            );
          })}
        </table>
      </div>
    </>
  );
};
export default Table;
