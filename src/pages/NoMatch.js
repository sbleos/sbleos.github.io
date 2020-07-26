import React from 'react';
import { Helmet } from 'react-helmet';

export default class NoMatch extends React.Component {
  componentDidMount(){
    window.scrollTo(0, 0);
  }
  render(){
    return (
      <React.Fragment>
        <Helmet>
          <title>Page Not Found</title>
          <meta name="description" content="The page you are looking for doesn't exist." />
          <meta name="keywords" content="" />
        </Helmet>
        404
      </React.Fragment>
    )}
}

