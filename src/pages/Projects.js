import React from 'react';
import { Breadcrumb } from '../components/Layout';
import { Helmet } from 'react-helmet';

export default class Projects extends React.Component{

  componentDidMount(){
    window.scrollTo(0, 0);
  }

  render(){
    return (
      <React.Fragment>
        <Helmet>
          <title>Projects</title>
          <meta name="description" content="Leos serve the community through many projects. These projects often focus on our global causes such as diabetes, vision, hunger, environment, and childhood cancer." />
          <meta name="keywords" content="projects, 5k, leo 5k, leo 5k run, diabetes, vision, hunger, environment, childhood, cancer, community" />
        </Helmet>
        <Breadcrumb directory={{path:"/projects",name:"Projects"}} />
        <div className="container">
          <h3 className="display-3 text-center pt-5 pb-5">Projects</h3>

          <div className="mt-5 mb-5">
            <h4 className="display-4">Diabetes</h4>
            <div className="mt-4 mb-5">
              <h3>Health Fair at the Durga Temple</h3>
              <p className="lead">Leos annually participate in volunteering at the local temple’s health fair. While some served food, some took blood to detect early signs of diseases such as diabetes. Many volunteers assisted doctors in various aspects of a full examination, including vision testing, ear, nose, and throat (ENT) exam, etc.</p>
            </div>
          </div>

          <div className="mt-5 mb-5">
            <h4 className="display-4">Vision</h4>
            <div className="mt-4 mb-5">
              <h3>Eyeglass Recycling</h3>
              <p className="lead">Leos worked at the New Jersey Lions Eyeglass Recycling Center by sorting through eyeglasses of various types, classifying them based on the lens type, and their cleanliness. These glasses were donated both by the Leo club and other groups, to be distributed across the country in order to provide affordable vision correction to the less fortunate. Leos checked to make sure only clean, fashionable, and undamaged eye glasses were sent out.</p>
            </div>
            <div className="mt-4 mb-5">
              <h3>Special Olympics (Healthy Athletes)</h3>
              <p className="lead">Leos participate at multiple events run by Special Olympics of New Jersey. During the summer Leos got the chance to fulfill one of their goals. Leos were able to test patients for prescriptions and fit them for a new set of glasses.</p>
            </div>
          </div>

          <div className="mt-5 mb-5">
            <h4 className="display-4">Hunger</h4>
            <div className="mt-4 mb-5">
              <h3>Community Food Bank</h3>
              <p className="lead">Our Leos did a great job of packing boxes at the Community Food Bank of New Jersey in Hillside. They worked with other volunteers and packed a total of 192 boxes together in under two hours! These boxes were filled were filled with everyday items ranging from food supplies and paper products to cleaning items!</p>
            </div>
            <div className="mt-4 mb-5">
              <h3>Thanksgiving Food Drive</h3>
              <p className="lead">Leos went to Perth Amboy on Thanksgiving to serve food to the less fortunate. Not only did SB Leos serve food, but provided entertainment based on musical talent.</p>
            </div>
          </div>

          <div className="mt-5 mb-5">
            <h4 className="display-4">Environment</h4>
            <div className="mt-4 mb-5">
              <h3>Park Cleanups</h3>
              <p className="lead">In 2019, Leos joined hands with Parks and Recreation Department of South Brunswick Township for a week long community clean-up drive leading up to the Arbor Day celebrations at Reichler Park with Mayor Charlie Carley. We plan to do regular cleanups around South Brunswick.</p>
            </div>
            <div className="mt-4 mb-5">
              <h3>Earth Day</h3>
              <p className="lead">On Earth Day, Leos got the opportunity to collaborate with their Edison counterparts. They worked together to promote recycling and express the importance of keeping the environment healthy. South Brunswick Leos even gave out trees for local people to plant. Some Leos even took trees home to plant in their own neighborhoods.</p>
            </div>
          </div>

          <div className="mt-5 mb-5">
            <h4 className="display-4">Childhood Cancer</h4>
            <div className="mt-4 mb-5">
              <h3>Book Drive</h3>
              <p className="lead">Our club collected books for over a month to be donated to various locations such as the pediatric ward for the Robert Wood Johnson hospital. The books were given to children who were battling cancer in hopes to comfort them and let them know they aren't alone.</p>
            </div>
          </div>

          <div>
            <div className="row mt-5 mb-5">
              <div className="col-md-8">
                <h4 className="display-4 mt-4 mb-5">Leo 5K Run</h4>
                <p className="lead">We host an annual 5k dedicated to raising funds for the different causes set by Lions Clubs International. In 2019, We raised funds toward diabetes research and awareness, and in 2020, we worked to raise funds for childhood cancer. The club splits into different committees, dedicated to one specific goal such as designing the logo and fliers, searching for sponsors, advertising the event, etc. These committees come together to build the 5k.</p>
              </div>
              <div className="col-md-4 order-md-first order-first text-center align-self-center">
                <img className="img-fluid" src={require("../assets/projects/leo5krun.jpg")} alt="Leo 5k Run"></img>
              </div>
            </div>

            <div className="row mt-5 mb-5">
              <div className="col-md-8">
                <h4 className="display-4 mt-4 mb-5">Leo Leadership Conference</h4>
                <p className="lead">The Youth Leadership Conference is an interactive learning experience, with several important speakers and panels. The Conference allows for youth to engage in meaningful discussions regarding leadership, and helps them to develop skills used in powerful leadership through workshops and youth discussion panels. The event is held at the Special Olympics New Jersey complex, a long-time partner of the South Brunswick Leo Club. Thanks to them, we have the opportunity to participate in a Unified Basketball Game with the Special Olympics Athletes! This year’s event will be held virtually and is looking to be even more inclusive than last year’s. The Conference is absolutely free and open to everyone!</p>
              </div>
              <div className="col-md-4 order-md-last order-first text-center align-self-center">
                <img className="img-fluid" src={require("../assets/projects/leo_leadership_conference.jpeg")} alt="Leo Leadership Conference"></img>
              </div>
            </div>

            <div className="row mt-5 mb-5">
              <div className="col-md-8">
                <h4 className="display-4 mt-4 mb-5">Lions Day at the United Nations</h4>
                <p className="lead">Every year the SB Leos participate in an event called the Lions Day at the UN. This is where Leos from across the country meet at the United Nations in New York to hear from motivational speakers. Not only do the Leos get to listen to great speakers but a few selected Leos are commended for outstanding work.</p>
              </div>
              <div className="col-md-4 order-md-first order-first text-center align-self-center">
                <img className="img-fluid" src={require("../assets/projects/ldun.jpeg")} alt="LDUN"></img>
              </div>
            </div>

            <div className="row mt-5 mb-5">
              <div className="col-md-8">
                <h4 className="display-4 mt-4 mb-5">South Brunswick National Night Out</h4>
                <p className="lead">Every year we volunteer at various booths at the local National Night Out. The event is important to the Leos because it is a community/police awareness-raising event which connects law enforcement with the community while bringing to light important topics. The annual event draws many people from all communities within South Brunswick. By participating in the local NNO, Leos are able to fulfill part of their mission which is to serve the community.</p>
              </div>
              <div className="col-md-4 order-md-last order-first text-center align-self-center">
                <img className="img-fluid" src={require("../assets/projects/nno.jpeg")} alt="NNO"></img>
              </div>
            </div>

          </div>


        </div>
      </React.Fragment>
    )
  }
}