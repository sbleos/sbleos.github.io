import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { Link, useRouteMatch } from 'react-router-dom'
import '@devexpress/dx-react-grid-bootstrap4/dist/dx-react-grid-bootstrap4.css';

function Layout(props){
  let isDashboard = useRouteMatch("/dashboard");
  return(
    <div style={{position: "relative", minHeight: "100vh",margin:0,paddingBottom:!isDashboard ? "10rem": 0}}>

      <Header />
      {props.children}
      {!isDashboard && <Footer />}
    </div>
  );
}

export function Breadcrumb(props){ // displays directory path (first is always home, next are directories, and last is the current page)
  let crumbs = [];
  props.directory.slice(0, -1).map((item,index) => crumbs.push(<li key={index} className="breadcrumb-item"><Link to={item.path}>{item.name}</Link></li>))
  crumbs.push(<li key={crumbs.length+1} className="breadcrumb-item active" aria-current="page">{props.directory.pop().name}</li>)

  return(
    <div className="container">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to="/">Home</Link></li>
          {crumbs}
        </ol>
      </nav>
    </div>
  )
}


export default Layout;

