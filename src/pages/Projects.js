import React from 'react';
// import Calendar from '../components/Calendar';
import NavItem from '../components/NavItem';
import Section from '../components/Section';



function Projects(props) {
  return (
    <div className="container">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><NavItem to="/" value="Home"/></li>
          <li className="breadcrumb-item active" aria-current="page">Projects</li>
        </ol>
      </nav>

      <div style={{height: "30%",width: "50%"}} className="container-fluid" dangerouslySetInnerHTML={ {__html:  iframe}} />


      <div class="card" style={{margin:"3rem 0"}}>
        <div class="card-header display-4">Diabetes</div>
        <div class="card-body">
          <div>
            <h2 class="card-title text-left">Health Fair at Durga Mandir Temple</h2>
            <p class="card-text text-right" style={{fontSize:"1.2rem",paddingLeft: "20rem"}} >Leos annually participate in volunteering at the local temple’s health fair. While some served food, some took blood to detect early signs of diseases such as diabetes. Many volunteers assisted doctors in various aspects of a full examination, including vision testing, ear, nose, and throat (ENT) exam, etc. </p>
          </div>
          <br />
          <div>
            <h2 class="card-title text-right">Event 2</h2>
            <p class="card-text text-left" style={{fontSize:"1.2rem",paddingRight: "20rem"}}>Description 2</p>
          </div>
        </div>
      </div>

      <div class="card" style={{margin:"3rem 0"}}>
        <div class="card-header display-4">Vision</div>
        <div class="card-body">
          <div>
            <h2 class="card-title text-left">Eyeglass recycling center</h2>
            <p class="card-text text-right" style={{fontSize:"1.2rem",paddingLeft: "20rem"}}>Description 1</p>
          </div>
          <br />
          <div>
            <h2 class="card-title text-right">Special Olympics (Healthy Athletes)</h2>
            <p class="card-text text-left" style={{fontSize:"1.2rem",paddingRight: "20rem"}}>Leos participate at multiple events run by Special Olympics of New Jersey. During the summer Leos got the chance to fulfill one of their goals. Leos were able to test patients for prescriptions and fit them for a new set of glasses.</p>
          </div>
        </div>
      </div>

      <div class="card" style={{margin:"3rem 0"}}>
        <div class="card-header display-4">Hunger</div>
        <div class="card-body">
          <div>
            <h2 class="card-title text-left">Community Food Bank</h2>
            <p class="card-text text-right" style={{fontSize:"1.2rem",paddingLeft: "20rem"}}>Description 1</p>
          </div>
          <br />
          <div>
            <h2 class="card-title text-right">Thanksgiving Food Drive</h2>
            <p class="card-text text-left" style={{fontSize:"1.2rem",paddingRight: "20rem"}}>Leos went to Perth Amboy on Thanksgiving to serve food to the less fortunate. Not only did SB Leos serve food but provided entertainment based on musical talent.</p>
          </div>
        </div>
      </div>

      <div class="card" style={{margin:"3rem 0"}}>
        <div class="card-header display-4">Environment</div>
        <div class="card-body">
          <div>
            <h2 class="card-title text-left">Park Cleanups</h2>
            <p class="card-text text-right" style={{fontSize:"1.2rem",paddingLeft: "20rem"}}>Description 1</p>
          </div>
          <br />
          <div>
            <h2 class="card-title text-right">Earth Day (Edison)</h2>
            <p class="card-text text-left" style={{fontSize:"1.2rem",paddingRight: "20rem"}}>On Earth Day, Leos got the opportunity to collaborate with their Edison counterparts. They worked together to promote recycling and express the importance of keeping the  environment healthy. South Brunswick Leos even gave out trees for local people to plant. Some Leos even took trees home to plant in their own neighborhoods.</p>
          </div>
        </div>
      </div>

      <div class="card" style={{margin:"3rem 0"}}>
        <div class="card-header display-4">Childhood Cancer</div>
        <div class="card-body">
          <div>
            <h2 class="card-title text-left">Event 1</h2>
            <p class="card-text text-right" style={{fontSize:"1.2rem",paddingLeft: "20rem"}}>Description 1</p>
          </div>
          <br />
          <div>
            <h2 class="card-title text-right">Event 2</h2>
            <p class="card-text text-left" style={{fontSize:"1.2rem",paddingRight: "20rem"}}>Description 2</p>
          </div>
        </div>
      </div>

    </div>
  );
  // return(<Calendar />)
}




const iframe = '<iframe src="https://calendar.google.com/calendar/embed?src=gb0ph7kb3k9g37t2f0ckvobeak%40group.calendar.google.com&ctz=America%2FNew_York" style="border: 0" width="800" height="600" frameborder="0" scrolling="no"></iframe>'

export default Projects;
