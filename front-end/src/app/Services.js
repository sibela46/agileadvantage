import React from 'react'
import { Link } from 'react-router-dom'
import services from './data/all-services'
import companyLogos from './data/all-companies'
import './scss/services.css'
import Background from './img/Banners/AAC-services.jpg'
import talent from './img/Banners/AAC-services-talent.jpg'

export default class Services extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      windowWidth:  window.document.documentElement.clientWidth,
      isMobile: false
    }
  }
  toggleState() {
    if (this.state.windowWidth < 500) {
      this.setState({
        isMobile: true
      });
    }
    else {
      this.setState({
        isMobile: false
      });
    }
  }
  onResize = () => {
    this.setState({
      windowWidth: window.document.documentElement.clientWidth
    });
    this.toggleState();
  }
  componentDidMount() {
    window.scrollTo(0, 0);
    this.setState({
      windowWidth: window.document.documentElement.clientWidth
    });
    window.addEventListener("resize", this.onResize);
    this.toggleState();
  }
  render() {
    var middleScreen = (this.state.windowWidth < 700 && this.state.windowWidth > 500) ? "middle" : "";
    return (
      <div className="mainpage">
      <div className="mainpage-banner page long" data-aos="fade-down" style={{backgroundImage: `url(${Background})`}}>
        <h1 className="mainpage-banner-text long">When we get the environment right, humans will do remarkable things.</h1>
      </div>
      <div className="page-content">
        <ul className= {this.state.isMobile ? "services-list-mobile" : "services-list " + middleScreen} data-aos="fade-up">
        {services.map(({name, id, image, description}) => (
            <Link key = {id} className="single-service" to={{
              pathname: `/services/${id}`,
              state: {
                fromParent: {name, id, description}
              }
            }}>
            <img src={require(`${image}`)} alt="single-service-image"/>
            <span>{name}</span>
            </Link>
          ))}
        </ul>
        <h2>Some companies we have worked with in the past:</h2>
        <div className="past-companies">
          <ul className="companies-list">
          {companyLogos.map(({image}) => (
            <img key={image} src={require(`./img/CompanyLogos/${image}`)} alt="company-logo" width="100px"/>
          ))}
          </ul>
        </div>
      </div>
      </div>
    )
  }
}
