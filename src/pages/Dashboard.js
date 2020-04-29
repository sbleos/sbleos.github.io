import React from 'react';
import NavDash from '../components/dashboard/NavDash';
import Overview from '../components/dashboard/Overview';
import Profile from '../components/dashboard/Profile';
import Hours from '../components/dashboard/Hours';
import SignIn from '../components/SignIn.js';
import { connect } from 'react-redux';
import Notifications from '../components/Notifications.js';
import { Helmet } from 'react-helmet';

class Dashboard extends React.Component{
  constructor(props){
    super(props);


    this.state = {
      component: <Profile />
    }
  }

  changeView = (c) => this.setState({component:c})


  componentDidMount(){
    window.scrollTo(0, 0);
  }

  componentDidUpdate(prevProps) {
    const { profile } = this.props;

    if(profile.isEmpty !== prevProps.profile.isEmpty){
      const hasAccess = true;//profile.role !== "Member" || profile.developer;

      this.setState({
        component: hasAccess ? <Overview profile={profile} /> : (profile.id !== 0 ? <Hours profile={profile} /> : <Profile profile={profile} />)
      })
    }
  }

  render(){
    const { profile } = this.props;

    return (
      <div>
        <Helmet>
          <title>Dashboard</title>
          <meta name="description" content="This is the console where the board manages the backend of the club. The rest of the club can also log in to see their hours." />
          <meta name="keywords" content="" />
        </Helmet>

        {!profile.isEmpty ?
        <div className="row m-0" >
          <div className="col-2 p-0" style={{minHeight:"91vh"}}>
            <NavDash changeView={this.changeView.bind(this)} profile={profile}/>
          </div>
          <div className="col-10 p-0">
            {this.state.component}
          </div>
        </div>






        :
        <div>
          <Notifications location="topRight"/>
          <div style={{height:"91vh",background:"radial-gradient(circle, gainsboro, lightsteelblue)"}}>

            <div className=" mx-auto pt-5" style={{maxWidth:"330px"}}>
              <SignIn />
            </div>
          </div>
        </div>
      }
      </div>
    )}
}

const mapStateToProps = (state) => {
  console.log(state)
  return {
    profile: state.firebase.profile
  }
}

export default connect(mapStateToProps)(Dashboard);

