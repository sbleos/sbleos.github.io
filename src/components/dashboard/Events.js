import React from 'react';
import CreateEvent from './events/CreateEvent';

class Events extends React.Component{
  render(){
    return(
      <div>
        <button type="button" className="btn btn-outline-secondary" data-toggle="modal" data-target="#createEvent">Create Event</button>
        <CreateEvent />
      </div>
    )
  }

}

export default Events;
