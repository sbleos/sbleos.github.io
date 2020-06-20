import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux';
import { updateUser } from '../../store/actions/userActions';
import {
  EditingState,
  SortingState,
  IntegratedSorting,
  DataTypeProvider,
  FilteringState,
  IntegratedFiltering
} from '@devexpress/dx-react-grid';
import {
  Grid,
  Table,
  TableHeaderRow,
  TableInlineCellEditing,
  TableColumnResizing
} from '@devexpress/dx-react-grid-bootstrap4';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons'

const FocusableCell = ({ onClick, ...restProps }) => (
  <Table.Cell {...restProps} tabIndex={0} onFocus={onClick} />
);

const StyleTypeProvider = props => (
  <DataTypeProvider
    formatterComponent={({ value }) => (
      <div style={props.style}>{value}</div>
    )}
    {...props}
  />
)

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

    const columnWidths = headers.map(header => ( {columnName: header['name'], width: 200} ));

    this.commitChanges = ({ added, changed, deleted }) => {
      /*
       * Updates the user that was changed
       * Since the state is managed by Redux, it will update immediately
       */
      if(changed)
        users.map(user => changed[user.id] ? updateUser({...user, ...changed[user.id]}) : user)

    }

    return (
    <div>
      {users &&
        <Grid rows={users} columns={headers} getRowId={user=>user.id}>
          <StyleTypeProvider for={["role"]} style={{color:"blue"}}/>

          <SortingState
            sorting={[{ columnName: 'firstName', direction: 'asc' }]}
            onSortingChange= {() => [{ columnName: 'firstName', direction: 'asc' }]}
          />
          <FilteringState />
          <EditingState
            onCommitChanges={this.commitChanges}
            columnExtensions={
              [
                {columnName: 'email', editingEnabled: false}
              ]
            }
          />

          <IntegratedSorting />
          <IntegratedFiltering />

          <Table cellComponent={FocusableCell} />
          <TableColumnResizing columnWidths={columnWidths} />
          <TableHeaderRow
            showSortingControls
            sortLabelComponent={({ onSort, children, direction }) => (
              <button type="button" className="btn btn-light btn-sm" onClick={onSort} >
                {children}
                &nbsp;
                {(direction && <FontAwesomeIcon icon={direction === "asc" ? faArrowUp : faArrowDown} /> )}
              </button>
            )}
          />
          <TableInlineCellEditing startEditAction="doubleClick" />
        </Grid>
      }
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
