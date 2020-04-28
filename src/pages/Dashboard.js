import React from 'react';
import NavDash from '../components/dashboard/NavDash';
import Overview from '../components/dashboard/Overview';
import Profile from '../components/dashboard/Profile';
import SignIn from '../components/SignIn.js';
import { auth } from '../firebase';
import { connect } from 'react-redux';

class Dashboard extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      component: <Overview />
    }
  }

  changeView = (c) => this.setState({component:c})


  componentDidMount(){
    document.title = "Dashboard | SB Leo Club";
    window.scrollTo(0, 0);

    auth.onAuthStateChanged((user) => {
      if (user)
        this.setState({user:user});
    }).bind(this);
  }

  render(){
    return (
      <div>
        {!this.props.auth.isEmpty ?
        <div className="row m-0" >
          <div className="col-2 p-0" style={{minHeight:"91vh"}}>
            <NavDash changeView={this.changeView.bind(this)} />
          </div>
          <div className="col-10 p-0">
            {this.state.component}
          </div>
        </div>
        : <div style={{height:"91vh",background:"radial-gradient(circle, gainsboro, lightsteelblue)"}}>
            <div className=" mx-auto pt-5" style={{maxWidth:"330px"}}>
              <SignIn />
            </div>
          </div>
      }
      </div>
    )}
}

const mapStateToProps = (state) => {
  console.log(state)
  return {
    auth: state.firebase.auth
  }
}

export default connect(mapStateToProps)(Dashboard);

