import React from 'react'
import {Link} from 'react-router-dom';
import people from './data/all-people'

export default class TeamSingle extends React.Component {
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
  render() {
    var name = this.props.location.state.fromParent.name;
    var id = this.props.location.state.fromParent.id;
    var job = this.props.location.state.fromParent.job;
    var image = this.props.location.state.fromParent.image;
    var description = this.props.location.state.fromParent.description;
    return (
      <div className={this.state.isMobile ? "person-mobile" : "person"}>
        <div className="image-section">
          <div className="team-list-image" style={{backgroundImage: `url(${require(`./img/People/${image}`)})`}} />
          <h2 className="job">{job.toUpperCase()}</h2>
          <div className={this.state.isMobile ? "contact-hidden" : "contact"}>
            <Link to="/contact"><button className="contact">CONTACT</button></Link>
          </div>
        </div>
        <div className="person-description">
          <h1 className="gray-header">{name}</h1>
          <p>{description[0]}</p>
          <p>{description[1]}</p>
          <p>{description[2]}</p>
          <p>{description[3]}</p>
          <p>{description[4]}</p>
          <p>{description[5]}</p>
          <p>{description[6]}</p>
        </div>
        <div className={this.state.isMobile ? "contact down" : "contact-hidden"}>
          <Link to="/contact"><button className="contact">CONTACT</button></Link>
        </div>
      </div>
    )
  }
}
