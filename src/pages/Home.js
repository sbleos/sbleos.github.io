import React from 'react';
import Events from '../components/Events';
import SignUp from '../components/SignUp';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet'
import PDF from "../assets/leo50a_en.pdf";


class Home extends React.Component {
  componentDidMount(){
    window.scrollTo(0, 0);
  }

  render(){
    return (
      <React.Fragment>
        <Helmet>
          <meta name="description" content="The South Brunwick Leo Club is a youth organization that serves its community through various social service acts. Leos develop leadership qualities through their service." />
        </Helmet>
        <div className="jumbotron jumbotron-fluid " style={{background:`linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${require("../assets/home/home_2.jpg")})`,backgroundPosition:"center",backgroundSize:"cover"}}>
          <div className="container">
            <div className="row">
              <div className="col-md-7 text-md-left text-center" style={{color:"#F9C910","textShadow": "2px 2px 0px #000000"}}>
                <h1 className="display-1" style={{"fontSize":"12vh"}} >South Brunswick Leo Club</h1>
                <p className="display-3 lead" style={{"fontSize":"8vh"}}>Together We Serve</p>
              </div>

              <div className={`col-md-4 ${this.props.auth.isEmpty ? "visible" : "invisible"}`}>
                <div style={{"zIndex":20,"borderRadius":"4px","boxShadow":"0 16px 40px rgba(0,0,0,0.12)"}} className="bg-white p-4">
                  <SignUp />
                </div>
              </div>
            </div>
          </div>
        </div>

        <section id="events" className="container">
          <h1>Upcoming Events</h1>
          <Events type="upcoming" max={8}/>

          <h1>Previous Events</h1>
          <Events type="previous" max={4}/>
        </section>
        <section id="links" className="container">
          <h1>Important links</h1>
          <a href={PDF} className="d-block m-1" target='_blank' rel="noopener noreferrer">Registration form</a>
          <a href="https://groups.google.com/forum/#!forum/sbleoclub/join" className="d-block m-1" target='_blank' rel="noopener noreferrer">Mailing List</a>
          <a href="https://www.remind.com/join/sbleo" className="d-block m-1 pb-1" target='_blank' rel="noopener noreferrer">Remind SMS Notifications</a>
        </section>
      </React.Fragment>
    )}
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth
  }
}

export default connect(mapStateToProps)(Home);
