import React from 'react';
import CreateEvent from './events/CreateEvent';

class Events extends React.Component{
  render(){
    const { profile } = this.props;

    const hasAccess = profile.role !== "Member" || profile.developer;
    if(!hasAccess)
      return <div>Events</div>

    return(
      <div>
        <button type="button" className="btn btn-outline-secondary" data-toggle="modal" data-target="#createEvent">Create Event</button>
        <CreateEvent />
      </div>
    )
  }

}

export default Events;
