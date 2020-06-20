import React from 'react';
import { Helmet } from 'react-helmet';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux';
import CreateEvent from './events/CreateEvent';
import { updateEvent, deleteEvent } from '../../store/actions/eventActions';
import Spreadsheet from './Spreadsheet';
import { ToolbarButton, ToolbarDropdown } from './plugins/plugins';


class Events extends React.Component{
  render(){
    const { profile, events:e, updateEvent, deleteEvent } = this.props;


    const hasAccess = profile.role !== "Member" || profile.developer;

    if(!hasAccess)
      return <Redirect to="/dashboard" />
    else if(!e)
      return <div></div>

    const events = e.filter(event => event.type !== "Meeting")


    const headers = [
      { name: 'title', title: 'Title' },
      { name: 'date', title: 'Date' },
      { name: 'description', title: 'Description' },
      { name: 'type', title: 'Type' },
      { name: 'imgPath', title: 'Image Path' },
      { name: 'imgDescription', title: 'Image Description' },
      { name: 'formLink', title: 'Form Link' },
      { name: 'formDescription', title: 'Form Description' },
    ]

    const disableColumns = [
      { columnName: 'imgPath', editingEnabled: false },
    ]

    const defaultHiddenColumnNames = ['imgPath','imgDescription','formLink','formDescription']

    const multilineColumnNames = ['description']

    const DateTimeFormatter = ({ value }) => new Date(value).toLocaleString();

    const defaultSorting = [{ columnName: 'date', direction: 'asc' }];

    const commitChanges = ({ changed, deleted }) => {
      if(changed)
        events.forEach(event => changed[event.id] ? updateEvent({...event, ...changed[event.id]}) : event)
      else if(deleted)
         deleted.forEach(id => deleteEvent(id))
    }
    /* Preferable event structure
    const events = {
      "2019-2020": [
        {
          title: "Event",
          date: "6/20/20",
          ...event
        },
        {
          title: "Event2",
          date: "6/20/20",
          ...event
        }
      ]
    }
    */

    const years = {
      "2019-2020": [
        {
          title: "Event",
          date: "6/20/20",
        },
        {
          title: "Event2",
          date: "6/20/20",
        }
      ]
    }
    return(
      <div>
        <Helmet>
          <title>Events</title>
        </Helmet>
        <CreateEvent />
        <Spreadsheet
          rows={events}
          headers={headers}
          commitChanges={commitChanges}
          defaultSorting={defaultSorting}
          disableColumns={disableColumns}
          multilineColumnNames={multilineColumnNames}
          defaultHiddenColumnNames={defaultHiddenColumnNames}
          customFormats={
            [
              { component: DateTimeFormatter, for: ['date'] },
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
                    <button className="dropdown-item" type="button">All</button>
                    {years && Object.keys(years).map((year, idx) => (
                      <button className="dropdown-item" type="button" key={idx}>{year}</button>
                    ))}
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
    events: state.firestore.ordered.events
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateEvent: (updatedEvent) => dispatch(updateEvent(updatedEvent)),
    deleteEvent: (deletedEventID) => dispatch(deleteEvent(deletedEventID))
  }
}

export default compose(
  connect(mapStateToProps,mapDispatchToProps),
  firestoreConnect(['events'])
)(Events);
