import React from 'react'
import {Link} from 'react-router-dom';
import people from './data/all-people';
import Team from './Team';

export default class TeamSingle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      windowWidth:  window.document.documentElement.clientWidth,
      isMobile: false,
      personDetails: []
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
  findData(id) {
    people.map((person) => {
      if (person.id == id) {
        console.log(person.id);
        var details = this.state.personDetails
        details.push({
          name: person.name,
          job: person.job,
          image: person.image,
          description: person.description
        });
        this.setState({
          personDetails: details
        })
      }
    });
  }
  componentDidMount() {
    window.scrollTo(0, 0);
    this.setState({
      windowWidth: window.document.documentElement.clientWidth
    });
    window.addEventListener("resize", this.onResize);
    this.toggleState();
    this.findData(this.props.match.params.id);
  }
  render() {
    var name = "";
    var job = "";
    var description = "";
    var image = "Bibi-Sheikh.jpg";
    if (this.state.personDetails[0] != undefined){
      name = this.state.personDetails[0].name;
      job = this.state.personDetails[0].job;
      description = this.state.personDetails[0].description;
      image = this.state.personDetails[0].image;
    }
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