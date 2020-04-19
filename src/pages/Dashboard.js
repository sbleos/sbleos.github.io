import React from 'react';
import NavDash from '../components/NavDash';
import DashFrame from '../components/DashFrame';
import Dash from '../components/dashboard/Dash';
import Membership from '../components/dashboard/Membership';
import Hours from '../components/dashboard/Hours';
import Attendance from '../components/dashboard/Attendance';
import Events from '../components/dashboard/Events';
import Points from '../components/dashboard/Points';
import Profile from '../components/dashboard/Profile';
import { Route, Link, Switch, BrowserRouter as Router } from 'react-router-dom'


const options = ["Overview","Membership","Hours","Attendance","Events","Points","Profile"];

/*
function Dashboard({match}) {
  return (
    <Router>
      <NavDash options={options}/>
      <DashFrame>
        <Route path={`dashboard/:option`} component={Dash}/>
      </DashFrame>
    </Router>
  );
}
*/
export default class Dashboard extends React.Component{

  componentDidMount(){
    document.title = "Dashboard | SB Leo Club";
    window.scrollTo(0, 0);
  }
  render(){
    return (
      <Router>
        <NavDash options={options}/>
        <DashFrame>
          {options.map((option) => (
              <Route path={`dashboard/:option`} component={option}/>
          ))}

        </DashFrame>
      </Router>
    )}
}


/*
<DashFrame>
<Route path="/dashboard" component={Dash} />
        <Route path="/dashboard/membership" component={Membership} />
        <Route path="/dashboard/hours" component={Hours} />
        <Route path="/dashboard/attendance" component={Attendance} />
        <Route path="/dashboard/events" component={Events} />
        <Route path="/dashboard/points" component={Points} />
        <Route path="/dashboard/profile" component={Profile} />

        </DashFrame>
        */