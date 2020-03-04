import React from 'react';
import {NavDashItem} from './NavItem';



const linkStyle = {
  color: "white",
  textDecoration: "none",
  fontSize: "1.25rem"
}
const NavDash = props => (
  <nav style={{position:"fixed",backgroundColor:"#2F4050", width: "13%", height:"100%"}}>
    <div style={{textAlign:"center", marginTop: "5rem"}}>
      <div style={{display:"inline-block",textAlign: "left",margin:"auto"}}>
        {props.options.map((option) => (
            <NavDashItem to={`/dashboard/${option.toLowerCase()}`} value={option} linkStyle= {linkStyle}/>
        ))}
      </div>
    </div>
  </nav>
)


export default NavDash;
/*
<NavDashItem to="/dashboard/membership" value="Membership" linkStyle= {linkStyle}/>
        <NavDashItem to="/dashboard/hours" value="Hours" linkStyle= {linkStyle}/>
        <NavDashItem to="/dashboard/attendance" value="Attendance" linkStyle= {linkStyle}/>
        <NavDashItem to="/dashboard/events" value="Events" linkStyle= {linkStyle}/>
        <NavDashItem to="/dashboard/points" value="Points" linkStyle= {linkStyle}/>
        <NavDashItem to="/dashboard/profile" value="Profile" linkStyle= {linkStyle}/>
        */
