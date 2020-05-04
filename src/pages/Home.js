import React from 'react';
import Events from '../components/Events';
import SignUp from '../components/SignUp';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet'

class Home extends React.Component {
  componentDidMount(){
    window.scrollTo(0, 0);
  }

  render(){
    return (
      <div>
        <Helmet>
          <meta name="description" content="Website for the South Brunwick Leo Club" />
          <meta name="keywords" content="" />
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
                  <SignUp/>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          <h1>Upcoming Events</h1>
          <Events type="upcoming" max={80}/>

          {/*}
          <h1>Previous Events</h1>
          <Events type="previous" max={4}/>*/}
        </div>
      </div>
    )}
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth
  }
}

export default connect(mapStateToProps)(Home);
