import React from 'react'
import { Link } from 'react-router-dom'
import services from './data/all-services';

export default class SingleService extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      windowWidth:  window.document.documentElement.clientWidth,
      isMobile: false,
      serviceDetails: []
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
  findData(id) {
    services.map((service) => {
      if (service.id == id) {
        var details = this.state.serviceDetails
        details.push({
          name: service.name,
          description: service.description
        });
        this.setState({
          serviceDetails: details
        })
      }
    });
    
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
    this.findData(this.props.match.params.id);
  }
  render() {
    var name = "";
    var description = "";
    var id = this.props.match.params.id;
    if (this.state.serviceDetails[0] != undefined){
      name = this.state.serviceDetails[0].name;
      description = this.state.serviceDetails[0].description;
    }
    return (
      <div className={this.state.isMobile ? "single-service-page-mobile" : "single-service-page"}>
        <div className={"mainpage-banner page " + id}/>
        <Link className="contact" to="/contact"><button>CONTACT</button></Link>
        <div className="single-service-info">
          <h1 className="gray-header">{name}</h1>
          <p>{description[0]}</p>
          <p>{description[1]}</p>
          <p className={(description.length == 3) ? "bolder" : ""}>{description[2]}</p>
          <p className={(description.length == 4) ? "bolder" : ""}>{description[3]}</p>
        </div>
      </div>
    )
  }
}
