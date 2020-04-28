import React from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux';

// Keep the Event Descriptions less than 20 words to look nice because all cards in row follow same dimensions as max width/height
// Any events that do not have a date will be placed at the end when asked for all or upcoming events
// WHICH MEANS YOU SHOULD ALWAYS SPECIFY A DATE SO IT IS PROPERLY SORTED
/*
var events = [
  {
    title: "Diabetes",
    date: "8/3/20 7:30 am",
    description: "Event Description",
    type: "diabetes",
    imgsrc: require("../assets/home/home_1.jpg"),
    imgDescription: "diabetes image",
    formLink: "https://runsignup.com",
    formDescription: "Sign up"
  },
  {
    title: "Other",
    date: "4/3/20 3:30 pm",
    description: "Event Description",
    formLink: "https://runsignup.com",
    formDescription:"Sign up"
  },
  {
    title: "Vision",
    date: "3/21/20 7:30 am",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    type: "vision",
    imgsrc: require("../assets/home/home_1.jpg"),
    imgDescription: "vision image",
    formLink: "https://runsignup.com",
    formDescription:"Sign up"
  },
  {
    title: "Hunger",
    date: "5/9/20 9:30 am",
    description: "Event Description",
    type: "hunger",
    imgsrc: require("../assets/home/home_1.jpg"),
    imgDescription: "hunger image",
    formLink: "https://runsignup.com",
    formDescription:"Sign up"
  },
  {
    title: "Environment",
    date: "1/1/20 1:30 pm",
    description: "Event Description",
    type: "environment",
    imgsrc: require("../assets/home/home_1.jpg"),
    imgDescription: "environment image",
    formLink: "https://runsignup.com",
    formDescription:"Sign up"
  },
  {
    title: "Childhood Cancer",
    date: "7/25/20 5:30 pm",
    description: "Event Description",
    type: "childhood cancer",
    imgsrc: require("../assets/home/home_1.jpg"),
    imgDescription: "childhood cancer image",
    formLink: "https://runsignup.com",
    formDescription:"Sign up"
  }
];
*/
/*
var events = [
  {
    title: "Covid-19 Appreciation",
    date: "4/28/20 11:00 am",
    description: "Our Leos are writing a message to South Brunswick First responders and hanging it up on the Municipal Building!",
    type: "community",
    imgsrc: require("../assets/logos/humanitarian.png"),
    imgDescription: "Humanitarian"
  },
  {
    title: "Covid-19 Relief",
    date: "4/30/20 12:00 pm",
    description: "We are raising money on a GoFundMe for those in need during this situation. We are hoping for everyone to show their thanks to their local hospitals, food banks, etc for getting us through these difficult times.",
    type: "community",
    imgsrc: require("../assets/logos/humanitarian.png"),
    imgDescription: "Humanitarian",
    formLink: "https://charity.gofundme.com/",
    formDescription:"GoFundMe (Not Set up Yet)"
  }
];
*/
//Can get all events, upcoming events, or previous events (if not specified as either upcoming or previous, it defaults to all events)
class Events extends React.Component{
  render(){
    const { events } = this.props;
    if(!events)
      return(<p className="lead">There are no events at this time</p>)

    let e = events.slice().sort((a, b) => new Date(a.date) - new Date(b.date)); // all events

    const today = new Date();
    if(this.props.type.toLowerCase() === "upcoming")
      e = e.filter(a => new Date(a.date) >= today || !a.date); //this will show events without a date as upcoming, BUT SPECIFY A DATE SO IT IS SORTED PROPERLY
    else if(this.props.type.toLowerCase() === "previous")
      e = e.filter(a => new Date(a.date) < today).reverse();

    if(this.props.max && Number.isInteger(this.props.max)) //if you want to only show a few at a time, REMEMBER TO PASS A NUMBER IN BRACKETS
      e = e.slice(0,this.props.max);

    e = e.map((events,index) => {
      let border = "2px solid rgba(0,0,0,0.125)";
      if(events.type){
        let type = events.type.toLowerCase();
        if(type === "diabetes" || type === "d")
          border = "2px solid rgb(102,177,224)";
        else if(type === "vision" || type === "v")
          border = "2px solid rgb(92,38,104)";
        else if(type === "hunger" || type === "h")
          border = "2px solid rgb(246,130,61)";
        else if(type === "environment" || type === "e")
          border = "2px solid rgb(115,189,77)";
        else if(type === "childhood cancer" || type === "cc" || type === "c")
          border = "2px solid rgb(241,196,48)";
      }
      const options = {year: "numeric", month: "numeric", day: "numeric", hour: "2-digit", minute: "2-digit"}; //to format event dates
      return(<Event
                            key = {index}
                            title = {events.title}
                            date = {new Date(events.date).toLocaleTimeString("en-us", options)}
                            description = {events.description}
                            imgsrc = {events.imgsrc}
                            imgDescription = {events.imgDescription}
                            formLink = {events.formLink}
                            formDescription = {events.formDescription}
                            border = {border} />
      )});

    return(<div className="row">{e}</div>)
  }
}


export const Event = props => (
  <div className="col-sm-6 col-md-4 col-lg-3 d-flex">
    <div className="card mb-4 flex-fill" style={{"border": props.border}}>
      {props.imgsrc && <img className="card-img-top text-center align-self-center p-1" src={props.imgsrc} alt={props.imgDescription} style={{maxHeight:"300px",maxWidth:"300px"}}></img>}
      <div className="card-body">
        {props.title && <h5 className="card-title">{props.title}</h5>}
        {props.date !== "Invalid Date" && <h6 className="card-subtitle mb-2 text-muted">{props.date}</h6>}
        {props.description && <p className="card-text">{props.description}</p>}
      </div>
      <div className="card-body d-flex flex-column">
        {props.formLink && <a href={props.formLink} className="card-link mt-auto">{props.formDescription}</a>}
      </div>
    </div>
  </div>
)

const mapStateToProps = (state) => {
  // console.log(state)
  //state.firestore.data.events
  return {
    events: state.firestore.ordered.events
  }
}

export default compose(
  connect(mapStateToProps),
  firestoreConnect(['events'])
)(Events);