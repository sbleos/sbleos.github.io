import React from 'react';
import { Redirect } from 'react-router-dom'

class Overview extends React.Component {

  render() {
    const { profile } = this.props;

    const hasAccess = profile.position !== "Member" || JSON.parse(profile.developer);

    if(!hasAccess)
      return <Redirect to="/dashboard" />

    return (<div>Overview</div>)
  }
}

export default Overview;
