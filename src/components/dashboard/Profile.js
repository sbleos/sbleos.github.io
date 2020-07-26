import React from 'react';
import Notifications from '../Notifications';
import UpdateProfile from './update/UpdateProfile';
import UpdatePassword from './update/UpdatePassword';

class Profile extends React.Component {
  render() {
    const { profile } = this.props; // profile is passed down as a prop, so there is no need to connect to redux

    return (
      <React.Fragment>
        <Notifications location="topRight"/>
        <div className="container p-3">
          <UpdateProfile profile={profile}/>
        </div>
        <div className="container p-3">
          <UpdatePassword />
        </div>
      </React.Fragment>
    );
  }
}

export default Profile;