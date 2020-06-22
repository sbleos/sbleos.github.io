import React from 'react';
import { Helmet } from 'react-helmet';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux';
import CreateEvent from './events/CreateEvent';
import { updateEvent, deleteEvent, getUsers } from '../../store/actions/eventActions';
import Spreadsheet from './Spreadsheet';
import { ToolbarButton, ToolbarDropdown } from './plugins/plugins';


class Events extends React.Component{
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
  render(){
    const { profile, events:years, users, updateEvent, deleteEvent } = this.props;


    const hasAccess = profile.position !== "Member" || profile.developer;

    if(!hasAccess)
      return <Redirect to="/dashboard" />
    else if(!years)
      return <div></div>

    // error catching since Firestore is not that great with nested arrays
    let events = []
    if(years.every(year => year.events)){
      const filteredYears = this.state.filter ? years.filter(year => year.id === this.state.filter) : years;
      const combined = filteredYears.map(year => year.events).flat();
      if(combined.some(event => event.type))
        events = combined.filter(event => event.type !== "Meeting").map(event => ({...event}));
    }

    /* Events should look somewhat like this
    events = {
      ...events,
      attendees : [
        reference1,
        reference2
      ]
    }
    */

    const userHeaders = users
                              ? users.map(user => ({name: user.id, title: `${user.firstName} ${user.lastName}`}))
                                      .sort((a, b) => a.title.localeCompare(b.title))
                              : []

    const headers = [
      { name: 'title', title: 'Title' },
      { name: 'date', title: 'Date' },
      { name: 'description', title: 'Description' },
      { name: 'type', title: 'Type' },
      { name: 'imgURL', title: 'Image URL' },
      { name: 'imgDescription', title: 'Image Description' },
      { name: 'formLink', title: 'Form Link' },
      { name: 'formDescription', title: 'Form Description' },
      ...userHeaders
    ]


    // console.dir(users)


    const disableColumns = [
      { columnName: 'imgURL', editingEnabled: false },
    ]

    const defaultHiddenColumnNames = ['imgURL','imgDescription','formLink','formDescription']

    const multilineColumnNames = ['description']

    const DateTimeFormatter = ({ value }) => new Date(value).toLocaleString();

    const LinkFormatter = ({ value }) => <a href={value}>{value}</a>;

    const defaultSorting = [{ columnName: 'date', direction: 'asc' }];

    const disableSorting = users ? users.map(user => ({columnName: user.id, sortingEnabled: false})) : []
    const disableFiltering = users ? users.map(user => ({columnName: user.id, filteringEnabled: false})) : []

    const columnBands = [
      {
        title: "Member Hours",
        children : users ? users.map(user => ({columnName: user.id})) : []
      }
    ]


    const commitChanges = ({ changed, deleted }) => {
      // instead of passing 'events' to the action creator, we get it from Firestore since this copy may be modified
      if(changed)
        events.forEach(event => changed[event.id] ? updateEvent({...event, ...changed[event.id]}) : event)
      else if(deleted){
        new Set(deleted).forEach(id => {
          let idx = events.findIndex(event => {return event.id === id});
          deleteEvent(events[idx])
        })
      }
    }

    return(
      <div>
        <Helmet>
          <title>Events</title>
        </Helmet>
        <CreateEvent formType="Event" />
        <Spreadsheet
          rows={events}
          headers={headers}
          commitChanges={commitChanges}
          defaultSorting={defaultSorting}
          disableSorting={disableSorting}
          disableColumns={disableColumns}
          disableFiltering={disableFiltering}
          multilineColumnNames={multilineColumnNames}
          defaultHiddenColumnNames={defaultHiddenColumnNames}
          columnBands={columnBands}
          customFormats={
            [
              { component: DateTimeFormatter, for: ['date'] },
              { component: LinkFormatter, for: ['imgURL'] },
            ]
          }
          plugins={
            [
              <ToolbarButton button={<button type="button" className="btn btn-outline-dark m-3" data-toggle="modal" data-target="#createEvent">Create Event</button>} />,
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
                        onClick={() => this.filterFiscalYear(year.id)}
                        key={idx}
                      >
                        {year.id}
                      </button>
                    )).reverse()}
                    </div>
                </div>
                }
              />,
            ]
          }
          canDelete={true}
        />
      </div>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    events: state.firestore.ordered.events,
    users: state.event.users
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateEvent: (updatedEvent) => dispatch(updateEvent(updatedEvent)),
    deleteEvent: (deletedEventID) => dispatch(deleteEvent(deletedEventID)),
    getUsers: (fiscalYear) => dispatch(getUsers(fiscalYear))
  }
}

export default compose(
  connect(mapStateToProps,mapDispatchToProps),
  firestoreConnect(['events'])
)(Events);
