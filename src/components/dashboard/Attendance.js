import React from 'react';
import { Redirect } from 'react-router-dom'

class Attendance extends React.Component {

  render() {
    const { profile } = this.props;

    const hasAccess = true; //profile.role !== "Member" || profile.developer;

    return (<div>Attendance</div>)
  }
}

export default Attendance;
