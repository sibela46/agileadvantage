import React from 'react'
import { Link } from 'react-router-dom'
import services from './data/all-services'
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
        <div className="mainpage-banner-text-long">
          <h1>When we get the environment right, humans will do remarkable things.</h1>
          <h2>Simon Sinek</h2>
        </div>
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
            <img src={require(`${image}`)}/>
            <span>{name}</span>
            </Link>
          ))}
        </ul>
      </div>
      </div>
    )
  }
}
