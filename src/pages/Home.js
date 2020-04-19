import React from 'react';
import Events from '../components/Events';
import SignupForm from '../components/SignupForm';

export default class Home extends React.Component {
  componentDidMount(){
    document.title = "SB Leo Club";
    window.scrollTo(0, 0);
  }

  render(){
    const height = "40rem";
    return (
      <div>
        <div className="jumbotron jumbotron-fluid " style={{"position":"relative","height":height,"background":"rgba(0,0,0,0.6)"}}>
          <div className="container">
            <div className="row">
              <h1 className="display-1 col-8" style={{"fontSize":"6vw",color:"#F9C910","textShadow": "2px 2px 0px #000000"}} >South Brunswick Leo Club</h1>
              <div className="col-4" style={{"display":"relative"}}>
                <div style={{"zIndex":20,"position":"absolute","borderRadius":"4px","boxShadow":"0 16px 40px rgba(0,0,0,0.12)"}} className="bg-white p-4">
                  <SignupForm />
                </div>
              </div>
            </div>
            <div className="row">
              <p className="display-3 lead col-lg-8" style={{"fontSize":"4vw",color:"#F9C910","textShadow": "2px 2px 0px #000000"}}>Together We Serve</p>
            </div>
          </div>
          <div id="carousel" className="carousel slide" data-ride="carousel" style={{"backgroundColor":"rgba(0,0,0,0.1)","position":"absolute","zIndex":-50,"width":"100%","height": "100%","top":"0","left":"0"}}>
            <div className="carousel-inner" style={{"height":height}}>
              <div className="carousel-item active">
                <img className="d-block w-100" style={{"height":height}} src={require("../assets/home/home_1.jpg")} alt="First slide"></img>
              </div>
              <div className="carousel-item">
                <img className="d-block w-100" style={{"height":height}} src={require("../assets/home/home_2.jpg")} alt="Second slide"></img>
              </div>
              <div className="carousel-item">
                <img className="d-block w-100" style={{"height":height}} src={require("../assets/home/home_3.jpg")} alt="Third slide"></img>
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          <h1>Upcoming Events</h1>
          <Events type="upcoming"/>

          <h1>Previous Events</h1>
          <Events type="previous" max={4}/>
        </div>
      </div>
    )}
}
