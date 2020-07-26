import React from 'react';
import { Breadcrumb } from '../components/Layout';
import { Helmet } from 'react-helmet';

export default class About extends React.Component {
  componentDidMount(){
    window.scrollTo(0, 0);
  }

  render(){
    return (
      <React.Fragment>
        <Helmet>
          <title>About</title>
          <meta name="description" content="About the South Brunswick Leo Club" />
          <meta name="keywords" content="" />
        </Helmet>

        <Breadcrumb directory={{path:"/about",name:"About"}} />

        <div className="container">
          <h1 className="display-3 text-center pt-5 pb-3">About Us</h1>
          <div className="row mb-5 mt-5">
            <div className="col-md-4 order-md-first order-first text-center align-self-center">
              <img width="200px" height="200px"src={require("../assets/logos/leo_red.svg")} alt="Leo Alpha"></img>
            </div>
            <div className="col-md-8 text-md-left text-center">
              <h2 className="display-4 mb-5 mt-5">What is Leo Club?</h2>
              <p className="lead">The Leo Club stands for Leadership, Experience, and Opportunity. This club is the youth sector of the Lions International Club and is dedicated to encouraging younger people to help their community by performing various social service acts.</p>
            </div>
          </div>
          <div className="row mb-5 mt-5">
            <div className="col-md-8 text-md-left text-center">
              <h2 className="display-4 mb-5 mt-5">Our History</h2>
              <p className="lead">It was first founded in 1957 by Jim Graver, who was a member of the Lions Club. Eventually, in 1964 it became an official sponsored program of the Lions Club, and was able to grow into the program that it is now. Today, there are over 7,200 Leo clubs worldwide, with over 130,000 members. Together, the Leos have been able to accomplish around 20,000 projects worldwide.</p>
            </div>
            <div className="col-md-4 order-md-last order-first text-center align-self-center">
              <img className="img-fluid" src={require("../assets/about/history.jpg")} alt="Our History"></img>
            </div>
          </div>
          <div className="row mb-5 mt-5">
            <div className="col-md-4 order-md-first order-first text-center align-self-center">
              <img className="img-fluid" src={require("../assets/about/club.jpg")} alt="Leo Alpha"></img>
            </div>
            <div className="col-md-8 text-md-left text-center">
              <h2 className="display-4 mb-5 mt-5">Why join our club?</h2>
              <p className="lead">The purpose of the Leo club is to give back to the community. Our chapter does this by having many fundraising events like 5Ks, eyeglass recycling centers, volunteering for health fairs and more. We want to unite the members of the Leo Club in friendship and allow them opportunities to contribute to both the local and international communities.</p>
            </div>
          </div>
        </div>
      </React.Fragment>
  )}
}
