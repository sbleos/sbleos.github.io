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
    const hasExecutiveAccess = profile.role === "President" || profile.role === "Vice President"

    if(!hasAccess)
      return <Redirect to="/dashboard" />

    const headers = [
      { name: 'memberID', title: 'ID' },
      { name: 'firstName', title: 'First Name' },
      { name: 'lastName', title: 'Last Name' },
      { name: 'email', title: 'Email' },
      { name: 'role', title: 'Role' },
      { name: 'developer', title: 'Developer' },
      { name: 'active', title: 'Active' },
      { name: 'address', title: 'Address' },
      { name: 'city', title: 'City' },
      { name: 'zipCode', title: 'Zip Code' },
      { name: 'dateOfBirth', title: 'Date Of Birth' },
      { name: 'phoneNumber', title: 'Phone Number' },
      { name: 'joinDate', title: 'Join Date' },
    ]

    const disableColumns = [
      { columnName: 'email', editingEnabled: false },
      { columnName: 'role', editingEnabled: hasExecutiveAccess },
      { columnName: 'developer', editingEnabled: hasExecutiveAccess },
      { columnName: 'address', editingEnabled: false },
      { columnName: 'city', editingEnabled: false },
      { columnName: 'zipCode', editingEnabled: false },
      { columnName: 'dateOfBirth', editingEnabled: false },
      { columnName: 'phoneNumber', editingEnabled: false },
    ]

    const defaultHiddenColumnNames = ['role','developer', 'active', 'address', 'city', 'zipCode', 'dateOfBirth', 'phoneNumber', 'joinDate',]

    const styles=[
      {
        style: {
          fontWeight: 'bold'
        },
        for: ['memberID']
      },
    ]

    const DateFormatter = ({ value }) => new Date(value).toLocaleDateString();
    const BooleanFormatter = ({ value }) => value ? "Yes" : "No";

    const defaultSorting = [{ columnName: 'firstName', direction: 'asc' }]


    /* added and delete are also parameters,
     * but we only want to users to sign up themselves, we do not want to add them,
     * and we are not allowed to delete other users through the Firebase API because it is a security risk.
     * If someone makes a spam account, either keep them marked is inactive or delete them directly from the firebase developer console
     * DO NOT DELETE USERS WHO HAVE GRADUATED or left the club because we can store their records and everything is linked
     *
     * This funciton updates the user that was changed.
     * Since the state is managed by Redux, it will update immediately.
     */
    const commitChanges = ({ changed }) => {
      if(changed)
        users.forEach(user => changed[user.id] ? updateUser({...user, ...changed[user.id]}) : user)
    }

    return(
      <div>
        <Helmet>
          <title>Members</title>
        </Helmet>
        <Spreadsheet
          rows={users}
          headers={headers}
          commitChanges={commitChanges}
          defaultSorting={defaultSorting}
          disableColumns={disableColumns}
          defaultHiddenColumnNames={defaultHiddenColumnNames}
          styles={styles}
          customFormats={
            [
              { formatterComponent: DateFormatter, for: ['joinDate', 'dateOfBirth'] },
              { formatterComponent: BooleanFormatter, for: ['developer', 'active'] },
            ]
          }
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
