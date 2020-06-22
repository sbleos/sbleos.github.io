import React from 'react';
import { Redirect } from 'react-router-dom'

class Attendance extends React.Component {

  render() {
    const { profile } = this.props;

    const hasAccess = profile.position !== "Member" || profile.developer;

    if(!hasAccess)
      return <Redirect to="/dashboard" />

    return (<div>Attendance</div>)
  }
}

export default Attendance;
