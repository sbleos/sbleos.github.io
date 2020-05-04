import React from 'react';
import { Redirect } from 'react-router-dom'

class Members extends React.Component {

  render() {
    const { profile } = this.props;

    const hasAccess = true; //profile.role !== "Member" || profile.developer;

    if(!hasAccess)
      return <Redirect to="/dashboard" />

    return (<div>Members</div>)
  }
}

export default Members;
