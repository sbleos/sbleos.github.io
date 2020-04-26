import React from 'react';
import Events from '../components/Events';
import SignupForm from '../components/SignupForm';

export default class Home extends React.Component {
  componentDidMount(){
    document.title = "SB Leo Club";
    window.scrollTo(0, 0);
  }

  render(){
    return (
      <div>
        <div className="jumbotron jumbotron-fluid " style={{background:`linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${require("../assets/home/home_2.jpg")})`,backgroundPosition:"center",backgroundSize:"cover"}}>
          <div className="container">
            <div className="row">
              <div className="col-md-7 text-lg-left text-sm-center" style={{color:"#F9C910","textShadow": "2px 2px 0px #000000"}}>
                <h1 className="display-1" style={{"fontSize":"12vh"}} >South Brunswick Leo Club</h1>
                <p className="display-3 lead" style={{"fontSize":"8vh"}}>Together We Serve</p>
              </div>
              <div className="col-md-4 col-sm-12">
                <div style={{"zIndex":20,"borderRadius":"4px","boxShadow":"0 16px 40px rgba(0,0,0,0.12)"}} className="bg-white p-4">
                  <SignupForm />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          <h1>Upcoming Events</h1>
          <Events type="upcoming"/>

          {/*}
          <h1>Previous Events</h1>
          <Events type="previous" max={4}/>*/}
        </div>
      </div>
    )}
}
