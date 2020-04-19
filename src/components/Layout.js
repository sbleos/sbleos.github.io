import React from 'react';
import Header from './Header';
import Footer from './Footer';
import NavItem from './NavItem';

function Layout(props){
  return(
    <div style={{position: "relative", minHeight: "100vh"}}>
      <Header />
        {props.children}
      <Footer />
    </div>
  );
}

export function Breadcrumb(props){ // displays directory path (first is always home, next are directories, and last is the current page)
  let crumbs = [];
  props.directory.slice(0, -1).map((item,index) => crumbs.push(<li key={index} className="breadcrumb-item"><NavItem to={item.path} value={item.name}/></li>))
  crumbs.push(<li key={crumbs.length+1} className="breadcrumb-item active" aria-current="page">{props.directory.pop().name}</li>)

  return(
    <div className="container">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><NavItem to="/" value="Home"/></li>
          {crumbs}
        </ol>
      </nav>
    </div>
  )
}


export default Layout;
//background-color: #EBB700;
//style={{backgroundColor:"#EBB700"}}

