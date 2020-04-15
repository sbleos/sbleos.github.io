import React from 'react';

// Keep the Event Descriptions less than 20 words to look nice because all cards in row follow same dimensions as max width/height
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
    description: "Event Description",
    type: "hunger",
    imgsrc: require("../assets/home/home_1.jpg"),
    imgDescription: "hunger image",
    formLink: "https://runsignup.com",
    formDescription:"Sign up"
  },
  {
    title: "Environment",
    description: "Event Description",
    type: "environment",
    imgsrc: require("../assets/home/home_1.jpg"),
    imgDescription: "environment image",
    formLink: "https://runsignup.com",
    formDescription:"Sign up"
  },
  {
    title: "Childhood Cancer",
    description: "Event Description",
    type: "childhood cancer",
    imgsrc: require("../assets/home/home_1.jpg"),
    imgDescription: "childhood cancer image",
    formLink: "https://runsignup.com",
    formDescription:"Sign up"
  }
];

function UpcomingEvents(){
  const upcomingEvents = events.sort((a, b) => new Date(a.date) - new Date(b.date)).map((events,index) => {
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
    return(<UpcomingEvent 
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

  return(<div className="row">{upcomingEvents}</div>)
}


export const UpcomingEvent = props => (
  <div className="col-sm-6 col-md-4 col-lg-3 d-flex">
    <div className="card mb-4 flex-fill" style={{"border": props.border}}>
      {props.imgsrc && <img className="card-img-top" src={props.imgsrc} alt={props.imgDescription}></img>}
      <div className="card-body">
        <h5 className="card-title">{props.title}</h5>
        {props.date !== "Invalid Date" && <h6 className="card-subtitle mb-2 text-muted">{props.date}</h6>}
        <p className="card-text">{props.description}</p>
      </div>
      <div className="card-body d-flex flex-column">
        <a href={props.formLink} className="card-link mt-auto">{props.formDescription}</a>
      </div>
    </div>
  </div>
)

export default UpcomingEvents;
