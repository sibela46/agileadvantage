import React from 'react'
import { Link } from 'react-router-dom'

export default class SingleService extends React.Component {
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
    var description = this.props.location.state.fromParent.description;
    console.log(description.length);
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
