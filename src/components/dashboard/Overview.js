import React from 'react';
import AttendanceChart from './charts/AttendanceChart';
import MembershipChart from './charts/MembershipChart';

/**
 * 1. Double Line graph of Events + Attendance
 * 2. Line graph of active membership
 * 3. Stacked bar graph of the # of people who have paid or not per year (or pie chart or area graph, but stacked bar graph makes more sense for multiple years)
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
            <MembershipChart />
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default Overview;
