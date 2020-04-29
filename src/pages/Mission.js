import React from 'react';
import { Breadcrumb } from '../components/Layout';
import {Helmet } from 'react-helmet';

export default class Mission extends React.Component {
  componentDidMount(){
    document.title = "Our Mission | SB Leo Club";
  }

  render(){
    return (
      <div>
        <Helmet>
          <title>Our Mission</title>
          <meta name="description" content="Leos strive for the goals set by Lions Clubs International." />
          <meta name="keywords" content="" />
        </Helmet>
        <Breadcrumb directory={[{"path":"/mission","name":"Our Mission"}]} />
        <div className="container">
          <h1 className="display-3 text-center pt-5 pb-3">Our Mission</h1>
          <blockquote className="blockquote">
            <p className="mb-0">To empower volunteers to serve their communities, meet humanitarian needs, encourage peace and promote international understanding through Lions clubs.</p>
          </blockquote>
          <h4 className="display-4 pt-5 pb-3">Our Global Causes</h4>

          <div className="row">
            <div className="col-lg-2 col-sm-12 text-center mb-4 mt-4">
              <img width="100px" height="100px"src={require("../assets/logos/diabetes.png")} alt="Diabetes"></img>
              <h3 className="mt-2 mb-2">Diabetes</h3>
            </div>
            <div className="col-lg-10 col-sm-12">
              <img className="img-fluid" src={require("../assets/mission/club_diabetes.jpeg")} alt="Diabetes"></img>
              <div className="mt-4 mb-4">
                <p className="lead">Our mission is to improve the lives of those suffering from diabetes as well as reduce the prevalence of it.</p>
                <p className="lead">Our Leo Club does this by annually volunteering at the local temple’s health fair. While some served food, some took blood to detect early signs of diseases like Diabetes.</p>
              </div>
            </div>
          </div>

          <hr></hr>

          <div className="row">
            <div className="col-lg-2 col-sm-12 text-center mb-4 mt-4">
              <img width="100px" height="100px"src={require("../assets/logos/vision.png")} alt="Vision"></img>
              <h3 className="mt-2 mb-2">Vision</h3>
            </div>
            <div className="col-lg-10 col-sm-12">
              <img className="img-fluid" src={require("../assets/mission/club_vision.jpg")} alt="Vision"></img>
              <div className="mt-4 mb-4">
                <p className="lead">Our mission is to prevent avoidable blindness and improve the quality of life for people who are blind and visually impaired.</p>
                <p className="lead">Our Leo Club does this by having an eyeglass recycling center. The Leos were able to test patients for prescriptions and fit them for a new set of glasses.</p>
              </div>
            </div>
          </div>

          <hr></hr>

          <div className="row">
            <div className="col-lg-2 col-sm-12 text-center mb-4 mt-4">
              <img width="100px" height="100px"src={require("../assets/logos/environment.png")} alt="Environment"></img>
              <h3 className="mt-2 mb-2">Environment</h3>
            </div>
            <div className="col-lg-10 col-sm-12">
              <img className="img-fluid" src={require("../assets/mission/club_environment.jpeg")} alt="Environment"></img>
              <div className="mt-4 mb-4">
                <p className="lead">Our missions is to keep our community clean and put an emphasis on recycling and being more environmentally conscious</p>
                <p className="lead">South Brunswick Leos even gave out trees for local people to plant while some Leos even took trees home to plant in their own neighborhoods. The Leos also had a park cleanup!</p>
              </div>
            </div>
          </div>

          <hr></hr>

          <div className="row">
            <div className="col-lg-2 col-sm-12 text-center mb-4 mt-4">
              <img width="100px" height="100px"src={require("../assets/logos/hunger.png")} alt="Hunger"></img>
              <h3 className="mt-2 mb-2">Hunger</h3>
            </div>
            <div className="col-lg-10 col-sm-12">
              <img className="img-fluid" src={require("../assets/mission/club_hunger.jpeg")} alt="Hunger"></img>
              <div className="mt-4 mb-4">
                <p className="lead">Our mission is to ensure all community members have access to nutritious foods. Our Leo club does this by having a Thanksgiving food drive.</p>
                <p className="lead">The Leos went to Edison on Thanksgiving to serve food to the less fortunate. The SB Leos not only served food, but provided entertainment based on musical talent as well.</p>
              </div>
            </div>
          </div>

          <hr></hr>

          <div className="row">
            <div className="col-lg-2 col-sm-12 text-center mb-4 mt-4">
              <img width="100px" height="100px"src={require("../assets/logos/childhood_cancer.png")} alt="Childhood Cancer"></img>
              <h3 className="mt-2 mb-2">Childhood Cancer</h3>
            </div>
            <div className="col-lg-10 col-sm-12">
              <img className="img-fluid" src={require("../assets/mission/club_childhood_cancer.jpeg")} alt="Childhood Cancer"></img>
              <div className="mt-4 mb-4">
                <p className="lead">Our mission is to provide support for these children and families affected by childhood cancer through various events.</p>
                <p className="lead">One of our biggest annual events is the Leo 5k which is a race which allows us to raise funds and help contribute towards cancer research and awareness.</p>
              </div>
            </div>
          </div>


        </div>
      </div>
    )}
}


