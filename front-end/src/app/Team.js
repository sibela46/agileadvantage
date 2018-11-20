import React from 'react'
import {Link} from 'react-router-dom'
import people from './data/all-people'
import Background from './img/Banners/AAC-team.jpg'
import './scss/team.scss'

export default class Team extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      windowWidth:  window.document.documentElement.clientWidth,
      isMobile: false
    }
  }
  toggleState() {
    if (this.state.windowWidth < 750) {
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
  render () {
    return (
        <div className="team-page">
          <div className="mainpage-banner page long" data-aos="fade-down" style={{backgroundImage: `url(${Background})`}}>
            <h1 className="mainpage-banner-text">Our team is based around the world, creating and building connections to better support your business</h1>
          </div>
          <div className="team-content">
          <ul className="team-list" data-aos="fade-up">
          {people.map(({name, id, image, job, description}) => (
            <Link className={this.state.isMobile ? "single-person-mobile" : "single-person"} to={{
              pathname: `/team/${id}`,
              state: {
                fromParent: {name, id, job, image, description}
              }
            }}>
              <div className="team-list-image" style={{backgroundImage: `url(${require(`./img/People/${image}`)})`}} />
              <h2 className="gray-header">{name}</h2>
              <h2 className="job">{job.toUpperCase()}</h2>
            </Link>
          ))}
          </ul>
          </div>
        </div>
    )
  }
}
