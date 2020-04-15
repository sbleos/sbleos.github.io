import React from 'react';
import Section from '../components/Section';
import NavItem from '../components/NavItem';
import { Breadcrumb } from '../components/Layout';


export default class Mission extends React.Component {
  componentDidMount(){
    document.title = "Mission | SB Leo Club";
  }

  render(){
    return (
      <div>
        <Breadcrumb directory={[{"path":"/mission","name":"Our Mission"}]} />
        <div className="container">
          <Section pos="left" h="Our" p="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec velit erat, efficitur a molestie sit amet, ultrices eget dui. Duis non sagittis nunc. Nunc pretium ex quis tortor commodo imperdiet. Phasellus aliquet nisi finibus nisl fringilla, nec pulvinar sem lobortis. Phasellus eu enim nunc. Sed ac diam imperdiet, consequat urna et, hendrerit odio. Phasellus mollis dui a dui blandit pulvinar. Nullam malesuada sem finibus velit tempor facilisis. Donec sed viverra orci."/>
          <Section pos="right" h="Mission" p="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec velit erat, efficitur a molestie sit amet, ultrices eget dui. Duis non sagittis nunc. Nunc pretium ex quis tortor commodo imperdiet. Phasellus aliquet nisi finibus nisl fringilla, nec pulvinar sem lobortis. Phasellus eu enim nunc. Sed ac diam imperdiet, consequat urna et, hendrerit odio. Phasellus mollis dui a dui blandit pulvinar. Nullam malesuada sem finibus velit tempor facilisis. Donec sed viverra orci."/>
        </div>
      </div>
    )}
}

export function Diabetes(props){
  return(
    <div className="container">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><NavItem to="/" value="Home"/></li>
          <li className="breadcrumb-item"><NavItem to="/mission" value="Our Mission"/></li>
          <li className="breadcrumb-item active" aria-current="page">Diabetes</li>
        </ol>
      </nav>
    </div>)
}

export function Vision(props){
  return(
    <div className="container">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><NavItem to="/" value="Home"/></li>
          <li className="breadcrumb-item"><NavItem to="/mission" value="Our Mission"/></li>
          <li className="breadcrumb-item active" aria-current="page">Vision</li>
        </ol>
      </nav>
    </div>)
}

export function Hunger(props){
  return(
    <div className="container">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><NavItem to="/" value="Home"/></li>
          <li className="breadcrumb-item"><NavItem to="/mission" value="Our Mission"/></li>
          <li className="breadcrumb-item active" aria-current="page">Hunger</li>
        </ol>
      </nav>
    </div>)
}

export function Environment(props){
  return(
    <div className="container">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><NavItem to="/" value="Home"/></li>
          <li className="breadcrumb-item"><NavItem to="/mission" value="Our Mission"/></li>
          <li className="breadcrumb-item active" aria-current="page">Environment</li>
        </ol>
      </nav>
    </div>)
}

export function ChildhoodCancer(props){
  return(
    <div className="container">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><NavItem to="/" value="Home"/></li>
          <li className="breadcrumb-item"><NavItem to="/mission" value="Our Mission"/></li>
          <li className="breadcrumb-item active" aria-current="page">Childhood Cancer</li>
        </ol>
      </nav>
    </div>)
}
