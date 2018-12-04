import React from 'react'
import companyLogos from './data/all-companies'

export default class About extends React.Component {
  state = {
    background: ""
  }
  componentWillMount() {
    this.setState({
      background: require('./img/Banners/AAC-about.jpg')
    });
  }
  componentDidMount() {
    window.scrollTo(0,0);
  }
  render() {
    return (
      <div className="mainpage">
      <div className="mainpage-banner page" data-aos="fade-down" style={{backgroundImage: `url(${this.state.background})`}}>
        <div className="mainpage-banner-text">
          <h1>Change is inevitable, progress is optional.</h1>
          <h2>Tony Robbins</h2>
        </div>
      </div>
      <div className="page-content">
        <p> <span className="bolder">Agile Advantage Consulting (AA) </span>is a
        management and strategy consulting firm specialising in delivering efficient
        and effective professional services to assure high-performance in our clients’
        organisations. AA brings together the talents of international specialists
        in finance and management with extensive experience across sectors including
        higher education, property and construction, start-up technology firms,
        and pharmaceutical companies.  </p>
        <p>AA was inspired by an opportunity to create a vehicle through which we
        could work together as a team and share our well-crafted knowledge and
        expertise gained in London and internationally with the local region: to
        create a positive, swift impact in organisations wishing to operate at a
        world-class level and in a sustainable fashion. </p>
        <p>We share a common philosophy of trustworthiness, cooperation, hard work,
        and high emotional intelligence, working with people, not against them.
        Each team member has at least 25 years of functional/consulting experience
        in their domain: both within organisations and as external consultants.
        We don’t simply suggest solutions, we understand the frustrations of
        those delivering the day to day improvements, and therefore take great
        care to minimise disruption and eliminate non-value added components
        whilst connecting the workforce to the future of the company.</p>
        <p>We are a high performing company specialising in SMEs and educational
        organisations. Working with our clients, we will help you find the tools
        you need to achieve the best.</p>
        <h2>Some companies we have worked with in the past:</h2>
        <div className="past-companies">
        <ul className="companies-list">
        {companyLogos.map(({image}) => (
          <img key={image} src={require(`./img/CompanyLogos/${image}`)} alt="company-logo" width="80px"/>
        ))}
        </ul>
        </div>
      </div>
      </div>
    )
  }
}
