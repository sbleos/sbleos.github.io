import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { Link, useRouteMatch } from 'react-router-dom'
import "../library"

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


/**
 * Display the page directory path at the top of the page
 * @param {Object} directory Consists of 2 keys: path and name
 *   Path is the path from the root of the website (type string)
 *   Name is the visible name of each section of the path (type array of strings, or string if path is not nested)
 *
 * Output: First is always home, next are directories, and last is the current page
 *
 */
export function Breadcrumb({ directory }){
  let crumbs = [];

  if(directory) {
    const splitDir = directory.path.split(/[/?]/) // split by / or ?
                    .reduce((obj,value) => {
                      if(value && value.length !== 0)
                        obj.push(value)
                      return obj;
                    }, [])


    if(!Array.isArray(directory.name))
      directory.name = directory.name.split();

    if(splitDir.length === directory.name.length) {

      crumbs = splitDir.map((value, idx) => {
        let len = directory.path.indexOf(value) + value.length;
        let path = directory.path.slice(0,len);
        let name = directory.name[idx];

        return idx !== splitDir.length - 1 ?
          <li key={idx} className="breadcrumb-item"><Link to={path}>{name}</Link></li> :
          <li key={idx} className="breadcrumb-item active" aria-current="page">{name}</li>
      })
    }
    else throw `Number of elements of directory.path (${splitDir.length}) and directory.name (${directory.name.length}) in the current Breadcrumb do not match`;
  }
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

