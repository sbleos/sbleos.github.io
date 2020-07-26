import React from 'react';
import AttendanceChart from './charts/AttendanceChart';
import MembershipChart from './charts/MembershipChart';

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
