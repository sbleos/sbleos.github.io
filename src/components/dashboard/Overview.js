import React from 'react';
import AttendanceChart from './charts/AttendanceChart';
/**
 * 1. Double Line graph of Events + Attendance
 * 2. Line graph of active membership
 *
 * 3. Pie chart of # of people who have paid or not??
 * 4.
 */
class Overview extends React.Component {

  render() {
    return (
      <React.Fragment>
        <div className="row m-0">
          <div className="col-md-6">
            <AttendanceChart />
          </div>
          <div className="col-md-6">
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default Overview;
