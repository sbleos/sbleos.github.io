import React from 'react';
import { Helmet } from 'react-helmet';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux';
import CreateEvent from './create/CreateEvent';
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
    const { profile, events:years, users, hasAccess, updateEvent, deleteEvent } = this.props;

    if(profile.memberID === "")
      return <Redirect to="/dashboard/profile" />
    if(!years)
      return <div></div>

    // error catching since Firestore is not that great with nested arrays
    let events = []
    if(years.every(year => year.events)){
      const filteredYears = this.state.filter ? years.filter(year => year.id === this.state.filter) : years;
      const combined = filteredYears.map(year => year.events).flat();
      if(combined.some(event => event.type))
        events = combined.filter(event => event.type !== "Meeting").map(event => ({...event}));
    }

    const userHeaders = hasAccess
    ? (users
          ? users.map(user => ({name: `user-${user.id}`, title: `${user.firstName} ${user.lastName}`}))
                 .sort((a, b) => a.title.localeCompare(b.title))
          : [])
    : [{name: `user-${profile.id}`, title: `${profile.firstName} ${profile.lastName}`}]

    const extraHeaders = hasAccess
    ? [
        { name: 'formLink', title: 'Form Link' },
        { name: 'formDescription', title: 'Form Description' },
        { name: 'imgURL', title: 'Image URL' },
        { name: 'imgDescription', title: 'Image Description' },
    ]
    : []

    const headers = [
      { name: 'title', title: 'Title' },
      { name: 'date', title: 'Date' },
      { name: 'description', title: 'Description' },
      { name: 'type', title: 'Type' },
      ...extraHeaders,
      ...userHeaders
    ]

    const hours = events.map(event => {
      if(event.attendees && event.attendees.length !== 0)
        return Object.keys(event.attendees)
                     .reduce( (obj, id) => {
                        obj[`user-${id}`] = event.attendees[id]
                        return obj;
                     }, {})
      })
    events = events.map((event, idx) => {
      if(event.attendees)
        delete event.attendees;
      if(hours[idx])
        event = {...event,...hours[idx]};
      return event;
    })

    if(!hasAccess)
      events = events.filter(event => event[`user-${profile.id}`] > 0)

    const disableColumns = [{ columnName: 'imgURL', editingEnabled: false }]

    const defaultHiddenColumnNames = ['imgURL','imgDescription','formLink','formDescription']

    const multilineColumnNames = ['description']

    const leftColumns = ['title','date']

    const DateTimeFormatter = ({ value }) => new Date(value).toLocaleDateString([], {hour: '2-digit', minute:'2-digit'});
    const LinkFormatter = ({ value }) => <a href={value}>{value}</a>;

    const customProviders = [
      { formatter: DateTimeFormatter, for: ['date'] },
      { formatter: LinkFormatter, for: ['imgURL','formLink'] },
    ]

    const defaultSorting = [{ columnName: 'date', direction: 'asc' }];

    const columnBands = [
      {
        title: "Member Hours",
        children : users ? users.map(user => ({ columnName: `user-${user.id}` })) : []
      }
    ]

    const summaryColumnNames = [
       { columnName: 'title', type: 'count' },
       ...(users ? users.map(user => ({ columnName: `user-${user.id}`,  type: 'sum' })) : [])
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
          disableColumns={disableColumns}
          summaryColumnNames={summaryColumnNames}
          multilineColumnNames={multilineColumnNames}
          defaultHiddenColumnNames={defaultHiddenColumnNames}
          columnBands={columnBands}
          customProviders={customProviders}
          canDelete={true}
          leftColumns={leftColumns}
          hasAccess={hasAccess}
          plugins={
            [
              (hasAccess && <ToolbarButton button={<button type="button" className="btn btn-outline-dark m-3" data-toggle="modal" data-target="#createEvent">Create Event</button>} />),
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
