import React from 'react';
import NavDash from '../components/dashboard/NavDash';
import Overview from '../components/dashboard/Overview';
import Members from '../components/dashboard/Members';
import Hours from '../components/dashboard/Hours';
import Attendance from '../components/dashboard/Attendance';
import Events from '../components/dashboard/Events';
// import Points from '../components/dashboard/Points';
import Profile from '../components/dashboard/Profile';
import { connect } from 'react-redux';
// import Notifications from '../components/Notifications.js';
import { Helmet } from 'react-helmet';
import { Route, withRouter, Redirect, Switch } from 'react-router-dom'

class Dashboard extends React.Component{

  componentDidMount(){
    window.scrollTo(0, 0);

    //component: hasAccess ? <Overview profile={profile} /> : (profile.id !== 0 ? <Hours profile={profile} /> : <Profile profile={profile} />)
  }

  render(){
    const { profile, match } = this.props;
    const { path } = match;

    if(!profile.isLoaded)
      return null
    if(profile.isEmpty)
      return <Redirect to="/login" />

    const hasAccess = profile.role !== "Member" || profile.developer; //true

    return (
      <div>
        <Helmet>
          <title>Dashboard</title>
          <meta name="description" content="This is the console where the board manages the backend of the club. The rest of the club can also log in to see their hours." />
          <meta name="keywords" content="" />
        </Helmet>

        <div className="row m-0" style={{minHeight:"91vh"}}> {/* Render Dashboard if user is signed in */}
          <div className="col-2 p-0">
            <NavDash profile={profile}/>
          </div>
          <div className="col-10 p-0">
            <Switch>
              <Route exact path={path} render={props => hasAccess ? <Overview {...props} profile={profile} /> : (profile.id !== 0 ? <Hours {...props} profile={profile} /> : <Profile {...props} profile={profile} />)} />
              <Route
                path={`${path}/:id`}
                render={ ({match}) => {
                  switch(match.params.id){ //none of these components need to connect with Redux state for profile because it is passed as a prop
                    case "profile": return <Profile profile={profile} />;
                    case "members": return <Members profile={profile} />;
                    case "hours": return <Hours profile={profile} />;
                    case "attendance": return <Attendance profile={profile} />;
                    case "events": return <Events profile={profile} />;
                    default : return null;
                  }
                }}
              />
            </Switch>
          </div>
        </div>

      </div>
    )}
}

const mapStateToProps = (state) => {
  return {
    profile: state.firebase.profile
  }
}

export default withRouter(connect(mapStateToProps)(Dashboard));

