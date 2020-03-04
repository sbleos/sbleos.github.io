import React from 'react';
import Header from './Header';
import Footer from './Footer';

const Layout = props => (
  <div style={{position: "relative", minHeight: "100vh"}}>
    <Header />
      {props.children}
    <Footer /> 
  </div>
);

export default Layout;
//background-color: #EBB700;
//style={{backgroundColor:"#EBB700"}}
