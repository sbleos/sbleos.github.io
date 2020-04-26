import React from 'react';
// import Calendar from '../components/Calendar';
import NavItem from '../components/NavItem';
import { Breadcrumb } from '../components/Layout';


const iframe = '<iframe src="https://calendar.google.com/calendar/embed?src=gb0ph7kb3k9g37t2f0ckvobeak%40group.calendar.google.com&ctz=America%2FNew_York" style="border: 0" width="800" height="600" frameborder="0" scrolling="no"></iframe>'

const projects = {
  diabetes: [
    {
      title: "Title",
      description: "Description"
    },
    {
      title: "Title",
      description: "Description"
    }
  ]
}


export default class Projects extends React.Component{

  componentDidMount(){
    document.title = "Projects | SB Leo Club";
    window.scrollTo(0, 0);
  }

  render(){
    return (
      <div>
        <Breadcrumb directory={[{"path":"/projects","name":"Projects"}]} />
        <div className="container">
          <h1 className="display-3 text-center pt-5 pb-5">Projects</h1>
          {/*<div className="text-center" dangerouslySetInnerHTML={ {__html:  iframe}} />*/}
          <div className="text-center">
            <iframe src="https://calendar.google.com/calendar/embed?src=gb0ph7kb3k9g37t2f0ckvobeak%40group.calendar.google.com&ctz=America%2FNew_York" style={{border: 0}} width="800" height="600" frameborder="0" scrolling="no"></iframe>
          </div>

          <div className="card" style={{margin:"3rem 0","border":"2px solid rgb(102,177,224)"}}>
            <div className="card-header display-4">Diabetes</div>
            <div className="card-body">
              <div>
                <h2 className="card-title text-left">Health Fair at Durga Mandir Temple</h2>
                <p className="card-text mb-3 text-right" style={{fontSize:"1.2rem",paddingLeft: "20rem"}} >Leos annually participate in volunteering at the local temple’s health fair. While some served food, some took blood to detect early signs of diseases such as diabetes. Many volunteers assisted doctors in various aspects of a full examination, including vision testing, ear, nose, and throat (ENT) exam, etc.</p>
              </div>
              <br />
              <div>
                <h2 className="card-title text-right">Event 2</h2>
                <p className="card-text mb-3 text-left" style={{fontSize:"1.2rem",paddingRight: "20rem"}}>Description 2</p>
              </div>
            </div>
          </div>

          <div className="card" style={{margin:"3rem 0","border":"2px solid rgb(92,38,104)"}}>
            <div className="card-header display-4">Vision</div>
            <div className="card-body">
              <div>
                <h2 className="card-title text-left">Eyeglass Recycling Center</h2>
                <p className="card-text mb-3 text-right" style={{fontSize:"1.2rem",paddingLeft: "20rem"}}>Leos worked at the (school’s name) by sorting through eyeglasses of various types, classifying them based on the lens type, and their cleanliness. These glasses were donated both by the Leo club and other groups, to be distributed across the country in order to provide affordable vision correction to the less fortunate. Leos checked to make sure only clean, fashionable, and undamaged eye glasses were sent out.</p>
              </div>
              <br />
              <div>
                <h2 className="card-title text-right">Special Olympics (Healthy Athletes)</h2>
                <p className="card-text mb-3 text-left" style={{fontSize:"1.2rem",paddingRight: "20rem"}}>Leos participate at multiple events run by Special Olympics of New Jersey. During the summer Leos got the chance to fulfill one of their goals. Leos were able to test patients for prescriptions and fit them for a new set of glasses.</p>
              </div>
            </div>
          </div>

          <div className="card" style={{margin:"3rem 0","border":"2px solid rgb(246,130,61)"}}>
            <div className="card-header display-4">Hunger</div>
            <div className="card-body">
              <div>
                <h2 className="card-title text-left">Community Food Bank</h2>
                <p className="card-text mb-3 text-right" style={{fontSize:"1.2rem",paddingLeft: "20rem"}}>Description 1</p>
              </div>
              <br />
              <div>
                <h2 className="card-title text-right">Thanksgiving Food Drive</h2>
                <p className="card-text mb-3 text-left" style={{fontSize:"1.2rem",paddingRight: "20rem"}}>Leos went to Perth Amboy on Thanksgiving to serve food to the less fortunate. Not only did SB Leos serve food but provided entertainment based on musical talent.</p>
              </div>
            </div>
          </div>

          <div className="card" style={{margin:"3rem 0","border":"2px solid rgb(115,189,77)"}}>
            <div className="card-header display-4">Environment</div>
            <div className="card-body">
              <div>
                <h2 className="card-title text-left">Park Cleanups</h2>
                <p className="card-text mb-3 text-right" style={{fontSize:"1.2rem",paddingLeft: "20rem"}}>Description 1</p>
              </div>
              <br />
              <div>
                <h2 className="card-title text-right">Earth Day (Edison)</h2>
                <p className="card-text mb-3 text-left" style={{fontSize:"1.2rem",paddingRight: "20rem"}}>On Earth Day, Leos got the opportunity to collaborate with their Edison counterparts. They worked together to promote recycling and express the importance of keeping the  environment healthy. South Brunswick Leos even gave out trees for local people to plant. Some Leos even took trees home to plant in their own neighborhoods.</p>
              </div>
            </div>
          </div>

          <div className="card" style={{margin:"3rem 0","border":"2px solid rgb(241,196,48)"}}>
            <div className="card-header display-4">Childhood Cancer</div>
            <div className="card-body">
              <div>
                <h2 className="card-title text-left">Event 1</h2>
                <p className="card-text mb-3 text-right" style={{fontSize:"1.2rem",paddingLeft: "20rem"}}>Description 1</p>
              </div>
              <br />
              <div>
                <h2 className="card-title text-right">Event 2</h2>
                <p className="card-text mb-3 text-left" style={{fontSize:"1.2rem",paddingRight: "20rem"}}>Description 2</p>
              </div>
            </div>
          </div>

          <div className="card" style={{margin:"3rem 0"}}>
            <div className="card-header display-4">More Events</div>
            <div className="card-body">
              <div>
                <h2 className="card-title text-left"><NavItem to="/projects/leo5krun" value="Leo 5k Run" /></h2>
                <p className="card-text mb-3 text-right" style={{fontSize:"1.2rem",paddingLeft: "20rem"}}>Ever since 2019, the South Brunswick Leo Club has hosted its own 5k, dedicated to raising funds for different topics, related to the Lion’s general goals. 2019, leos raised funds for diabetes, and in 2020, leos worked to raise funds for childhood cancer. The Leo club splits into different committees, dedicated to one specific goal such as designing the logo and fliers, searching for sponsors, advertising the event, ect. These committees come together to build the 5k.</p>
              </div>
              <br />
              <div>
                <h2 className="card-title text-right">Leo Leadership Conference</h2>
                <p className="card-text mb-3 text-left" style={{fontSize:"1.2rem",paddingRight: "20rem"}}>The Youth Leadership Conference is an interactive learning experience, with several important speakers and panels. The Conference allows for youth to engage in meaningful discussions regarding leadership, and helps them to develop skills used in powerful leadership through workshops and youth discussion panels.  The event is held at the Special Olympics New Jersey complex, a long-time partner of the South Brunswick Leo Club. Thanks to them, we have the opportunity to participate in a Unified Basketball Game with the Special Olympics Athletes!  This year’s event, held on April 4th, will be looking to be even more inclusive than last year’s. The Conference is absolutely free and open to everyone!</p>
              </div>
              <div>
                <h2 className="card-title text-left">Lions Day at the United Nations</h2>
                <p className="card-text mb-3 text-right" style={{fontSize:"1.2rem",paddingLeft: "20rem"}}>Every year the SB Leos participate in an event called the Lions Day at the UN. This is where Leos from across the country meet at the United Nations in New York to hear from motivational speakers. Not only do the Leos get to listen to great speakers but a few selected Leos are commended for outstanding work.</p>
              </div>
              <div>
                <h2 className="card-title text-right">South Brunswick National Night Out</h2>
                <p className="card-text mb-3 text-left" style={{fontSize:"1.2rem",paddingRight: "20rem"}}>Every year South Brunswick Leos volunteer at various booths at the local National Night Out. The event is important to the Leos because it is a community/police awareness-raising event which connects law enforcement with the community while bringing to light important topics. The annual event draws many people from all communities within South Brunswick. By participating in the local NNO, Leos are able to fulfill part of their mission which is to serve the community.</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    )}
  // return(<Calendar />)
}