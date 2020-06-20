import React from 'react';
import { Helmet } from 'react-helmet';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux';
import { updateUser } from '../../store/actions/userActions';
import Spreadsheet from './Spreadsheet';


class Members extends React.Component {

  render() {
    const { profile, users, updateUser } = this.props;

    const hasAccess = profile.role !== "Member" || profile.developer;

    if(!hasAccess)
      return <Redirect to="/dashboard" />

    const headers = [
      { name: 'id', title: 'ID' },
      { name: 'firstName', title: 'First Name' },
      { name: 'lastName', title: 'Last Name' },
      { name: 'email', title: 'Email' },
      { name: 'role', title: 'Role' },
      // { name: 'developer', title: 'Developer' },
      // { name: 'active', title: 'Active' },
      // { name: 'address', title: 'Address' },
      // { name: 'city', title: 'City' },
      // { name: 'zipCode', title: 'Zip Code' },
      // { name: 'dateOfBirth', title: 'Date Of Birth' },
      // { name: 'phoneNumber', title: 'Phone Number' },
      // { name: 'joinDate', title: 'Join Date' },
    ]

    const disableColumns = [
      {columnName: 'email', editingEnabled: false},
      {columnName: 'role', editingEnabled: profile.role === "President" || profile.role === "Vice President"},
    ]

    const styles=[
      {
        style: {
          color: 'blue'
        },
        for: ['role']
      },
    ]

    const defaultHiddenColumnNames = []

    this.commitChanges = ({ added, changed, deleted }) => {
      /*
       * Updates the user that was changed
       * Since the state is managed by Redux, it will update immediately
       */
      if(changed)
        users.map(user => changed[user.id] ? updateUser({...user, ...changed[user.id]}) : user)
    }

    return(
      <div>
        <Helmet>
          <title>Members</title>
        </Helmet>
        <Spreadsheet
          rows={users}
          headers={headers}
          commitChanges={this.commitChanges}
          disableColumns={disableColumns}
          styles={styles}
          defaultHiddenColumnNames={defaultHiddenColumnNames}
        />
      </div>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    users: state.firestore.ordered.users
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateUser: (updatedUser) => dispatch(updateUser(updatedUser))
  }
}

export default compose(
  connect(mapStateToProps,mapDispatchToProps),
  firestoreConnect(['users'])
)(Members);
