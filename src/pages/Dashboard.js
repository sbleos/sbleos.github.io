import React from 'react';
import NavDash from '../components/dashboard/NavDash';
import Overview from '../components/dashboard/Overview';
import Members from '../components/dashboard/Members';
import Meetings from '../components/dashboard/Meetings';
import Events from '../components/dashboard/Events';
import Profile from '../components/dashboard/Profile';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { Route, withRouter, Redirect, Switch } from 'react-router-dom'
import '@devexpress/dx-react-grid-bootstrap4/dist/dx-react-grid-bootstrap4.css'; // try moving this to Dashboard.js instead

class Dashboard extends React.Component{

  componentDidMount(){
    window.scrollTo(0, 0);
  }

  render(){
    const { profile, match } = this.props;
    const { path } = match;

    if(!profile.isLoaded)
      return null
    if(profile.isEmpty)
      return <Redirect to="/login" />

    var hasAccess = profile.position !== "Member" || profile.developer === true || profile.developer == "true";

    return (
      <React.Fragment>
        <Helmet>
          <title>Dashboard</title>
          <meta name="description" content="This is the console where the board manages the backend of the club. The rest of the club can also log in to see their hours." />
          <meta name="keywords" content="dashboard, console, hours, events, meetings, members, profile" />
        </Helmet>

        <div className="row m-0" style={{minHeight:"91vh"}}> {/* Render Dashboard if user is signed in */}
          <div className="col-2 p-0">
            <NavDash profile={profile} hasAccess={hasAccess}/>
          </div>
          <div className="col-10 p-0">
            <Switch>
              <Route exact path={path} render={props => hasAccess ? <Overview {...props} /> : (profile.memberID !== "" ? <Events profile={profile} hasAccess={hasAccess} {...props} /> : <Profile profile={profile} {...props} />)} />
              <Route
                path={`${path}/:id`}
                render={ ({match}) => {
                  switch(match.params.id){ //none of these components need to connect with Redux state for PROFILE because it is passed as a prop
                    case "profile": return <Profile profile={profile} />;
                    case "members": return <Members hasAccess={hasAccess} />;
                    case "meetings": return <Meetings profile={profile} hasAccess={hasAccess} />;
                    case "events": return <Events profile={profile} hasAccess={hasAccess} />;
                    default : return null;
                  }
                }}
              />
            </Switch>
          </div>
        </div>

      </React.Fragment>
    )}
}

const mapStateToProps = (state) => {
  return {
    profile: state.firebase.profile
  }
}

export default withRouter(connect(mapStateToProps)(Dashboard));

