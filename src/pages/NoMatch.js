import React from 'react';


export default class NoMatch extends React.Component {
  componentDidMount(){
    document.title = "Page Not Found | SB Leo Club";
    window.scrollTo(0, 0);
  }
  render(){
    return (
      <div>404</div>
    )}
}

