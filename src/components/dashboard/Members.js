import React from 'react';
import { Helmet } from 'react-helmet';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux';
import { updateUser, getYears } from '../../store/actions/userActions';
import { getUsers } from '../../store/actions/eventActions';
import { ToolbarDropdown } from './plugins/plugins';


import Spreadsheet from './Spreadsheet';


class Members extends React.Component {
  constructor(props){
    super(props)
    this.state = {filter: null}
    this.props.getUsers(null)

  }

  filterFiscalYear = (fiscalYear) => {
    const { getUsers } = this.props
    this.setState({filter:fiscalYear})
    if(fiscalYear !== this.state.filter)
      getUsers(fiscalYear)
  }

  componentDidUpdate(prevProps) {
    if (JSON.stringify(this.props.users) !== JSON.stringify(prevProps.users))
      this.props.getYears()
  }

  render() {
    const { profile, users, years, updateUser, getUsers } = this.props;

    const hasAccess = profile.position !== "Member" || profile.developer == "true";

    if(!hasAccess)
      return <Redirect to="/dashboard" />

    const headers = [
      { name: 'memberID', title: 'ID' },
      { name: 'firstName', title: 'First Name' },
      { name: 'lastName', title: 'Last Name' },
      { name: 'email', title: 'Email' },
      { name: 'position', title: 'Position' },
      { name: 'developer', title: 'Developer' },
      { name: 'address', title: 'Address' },
      { name: 'city', title: 'City' },
      { name: 'zipCode', title: 'Zip Code' },
      { name: 'dateOfBirth', title: 'Date Of Birth' },
      { name: 'phoneNumber', title: 'Phone Number' },
      { name: 'joinDate', title: 'Join Date' },
      { name: 'start', title: 'Start' },
      { name: 'end', title: 'End' },
    ]

    const disableColumns = [
      { columnName: 'email', editingEnabled: false },
      { columnName: 'address', editingEnabled: false },
      { columnName: 'city', editingEnabled: false },
      { columnName: 'zipCode', editingEnabled: false },
      { columnName: 'dateOfBirth', editingEnabled: false },
      { columnName: 'phoneNumber', editingEnabled: false },
    ]

    const defaultHiddenColumnNames = ['position','developer', 'start', 'end', 'address', 'city', 'zipCode', 'dateOfBirth', 'phoneNumber', 'joinDate',]

    const styles=[
      {
        style: {
          fontWeight: 'bold'
        },
        for: ['memberID']
      },
    ]

    const DateFormatter = ({ value }) => new Date(value).toLocaleDateString();
    const BooleanFormatter = ({ value }) => {
      if(value == "true")
        return "Yes";
      else if(value == "false")
        return "No"
      else
        return <span style={{color:"red"}}>Enter <strong>true</strong> or <strong>false</strong></span>
    };
    const ActiveFormatter = ({ value }) => value === "" ? "Present" : value;

    const customProviders = [
      { formatter: DateFormatter, for: ['joinDate', 'dateOfBirth'] },
      { formatter: BooleanFormatter, for: ['developer'] },
      { formatter: ActiveFormatter, for: ['end'] },
    ]

    const defaultSorting = [{ columnName: 'firstName', direction: 'asc' }]

    const summaryColumnNames = [{ columnName: 'memberID', type: 'count' }]

    const leftColumns = ['firstName','lastName']


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
      if(changed){
        users.forEach(user => changed[user.id] ? updateUser({...user, ...changed[user.id]}) : user)
        getUsers(this.state.fiscalYear)
      }
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
          summaryColumnNames={summaryColumnNames}
          customProviders={customProviders}
          leftColumns={leftColumns}
          plugins={
            [
              <ToolbarDropdown
                dropdown={
                  <div className="dropdown">
                    <button className="btn btn-outline-dark dropdown-toggle m-1" type="button" id="years" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      Years
                    </button>
                    <div className="dropdown-menu" aria-labelledby="years">
                    <button className="dropdown-item" type="button" onClick={() => this.filterFiscalYear(null)}>All</button>
                    {years && years.map((year, idx) => (
                      <button
                        className="dropdown-item"
                        type="button"
                        onClick={() => this.filterFiscalYear(year)}
                        key={idx}
                      >
                        {year}
                      </button>
                    )).reverse()}
                    </div>
                </div>
                }
              />,
            ]
          }
        />
      </div>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    users: !state.event.users ? state.firestore.ordered.users : state.event.users,
    years: state.user.years
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateUser: (updatedUser) => dispatch(updateUser(updatedUser)),
    getYears: () => dispatch(getYears()),
    getUsers: (fiscalYear) => dispatch(getUsers(fiscalYear))
  }
}

export default compose(
  connect(mapStateToProps,mapDispatchToProps),
  firestoreConnect(['users'])
)(Members);
