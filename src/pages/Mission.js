import React from 'react';
import { Breadcrumb } from '../components/Layout';


export default class Mission extends React.Component {
  componentDidMount(){
    document.title = "Our Mission | SB Leo Club";
    window.scrollTo(0, 0);
  }

  render(){
    return (
      <div>
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
                <p className="lead">Our mission is to improve the lives of those suffering from diabetes as well as reduce the prevalence of it.</p>
                <p className="lead">Our Leo Club does this by annually volunteering at the local temple’s health fair. While some served food, some took blood to detect early signs of diseases like Diabetes.</p>
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
                <p className="lead">Our mission is to improve the lives of those suffering from diabetes as well as reduce the prevalence of it.</p>
                <p className="lead">Our Leo Club does this by annually volunteering at the local temple’s health fair. While some served food, some took blood to detect early signs of diseases like Diabetes.</p>
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
                <p className="lead">Our mission is to improve the lives of those suffering from diabetes as well as reduce the prevalence of it.</p>
                <p className="lead">Our Leo Club does this by annually volunteering at the local temple’s health fair. While some served food, some took blood to detect early signs of diseases like Diabetes.</p>
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
                <p className="lead">Our mission is to improve the lives of those suffering from diabetes as well as reduce the prevalence of it.</p>
                <p className="lead">Our Leo Club does this by annually volunteering at the local temple’s health fair. While some served food, some took blood to detect early signs of diseases like Diabetes.</p>
              </div>
            </div>
          </div>


        </div>
      </div>
    )}
}


