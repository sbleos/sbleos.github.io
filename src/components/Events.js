import React from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux';

// Keep the Event Descriptions less than 20 words to look nice because all cards in row follow same dimensions as max width/height

//Can get all events, upcoming events, or previous events (if not specified as either upcoming or previous, it defaults to all events)
class Events extends React.Component{
  render(){
    const { events:years } = this.props;
    if(!years)
      return(<p className="lead">There are no events at this time.</p>)

    let events = years.map(year => year.events).flat().sort((a, b) => new Date(a.date) - new Date(b.date));

    // let events = e.slice().sort((a, b) => new Date(a.date) - new Date(b.date)); // all events

    const today = new Date();
    if(this.props.type.toLowerCase() === "upcoming")
      events = events.filter(a => new Date(a.date) >= today || !a.date); //this will show events without a date as upcoming, BUT SPECIFY A DATE SO IT IS SORTED PROPERLY
    else if(this.props.type.toLowerCase() === "previous")
      events = events.filter(a => new Date(a.date) < today).reverse();

    if(this.props.max && Number.isInteger(this.props.max)) //if you want to only show a few at a time, REMEMBER TO PASS A NUMBER IN BRACKETS
      events = events.slice(0,this.props.max);

    events = events.map((event,index) => {
      let border = "2px solid rgba(0,0,0,0.125)";

      let type = event.type.toLowerCase();
      if(type === "diabetes")
        border = "2px solid rgb(102,177,224)";
      else if(type === "vision")
        border = "2px solid rgb(92,38,104)";
      else if(type === "hunger")
        border = "2px solid rgb(246,130,61)";
      else if(type === "environment" )
        border = "2px solid rgb(115,189,77)";
      else if(type === "childhood cancer")
        border = "2px solid rgb(241,196,48)";
      else if(type === "youth")
        border = "2px solid rgb(45,139,159)";
      else if(type === "humanitarian")
        border = "2px solid rgb(241,90,59)";
      else if(type === "disaster relief")
        border = "2px solid rgb(72,69,154)";

      let imgsrc = event.imgURL;
      let imgDescription = event.imgDescription;

      if(event.defaultImage){
        imgDescription = event.type;

        if(type === "diabetes")
          imgsrc = require('../assets/logos/diabetes.png')
        else if(type === "vision")
          imgsrc = require('../assets/logos/vision.png')
        else if(type === "hunger")
          imgsrc = require('../assets/logos/hunger.png')
        else if(type === "environment" )
          imgsrc = require('../assets/logos/environment.png')
        else if(type === "childhood cancer")
          imgsrc = require('../assets/logos/childhood_cancer.png')
        else if(type === "youth")
          imgsrc = require('../assets/logos/youth.png')
        else if(type === "humanitarian")
          imgsrc = require('../assets/logos/humanitarian.png')
        else if(type === "disaster relief")
          imgsrc = require('../assets/logos/disaster_relief.png')

      }

      const options = {year: "numeric", month: "numeric", day: "numeric", hour: "2-digit", minute: "2-digit"}; //to format event dates
      return(<Event
              title = {event.title}
              date = {new Date(event.date).toLocaleTimeString("en-us", options)}
              description = {event.description}
              imgsrc = {imgsrc}
              imgDescription = {imgDescription}
              formLink = {event.formLink}
              formDescription = {event.formDescription}
              border = {border}
              key = {index} />
      )});
    if(events.length === 0)
      return (<p className="lead">There are no events at this time.</p>)

    return(<div className="row">{events}</div>)

  }
}


export const Event = ({ title, date, description, imgsrc, imgDescription, formLink, formDescription, border }) => (
  <div className="col-sm-6 col-md-4 col-lg-3 d-flex">
    <div className="card mb-4 flex-fill" style={{"border": border}}>
      {imgsrc && <img className="card-img-top text-center align-self-center" src={imgsrc} alt={imgDescription} style={{maxHeight:"200px",maxWidth:"200px"}}></img>}
      <div className="card-body">
        {title && <h5 className="card-title">{title}</h5>}
        {date !== "Invalid Date" && <h6 className="card-subtitle mb-2 text-muted">{date}</h6>}
        {description && <p className="card-text">{description}</p>}
      </div>
      <div className="card-body d-flex flex-column">
        {formLink && <a href={formLink} className="card-link mt-auto">{formDescription}</a>}
      </div>
    </div>
  </div>
)

const mapStateToProps = (state) => {
  //state.firestore.data.events
  return {
    events: state.firestore.ordered.events
  }
}

export default compose(
  connect(mapStateToProps),
  firestoreConnect(['events'])
)(Events);