import React from 'react'

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
        <h1 className="mainpage-banner-text">Change is inevitable, progress is a choice.</h1>
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
        expertise gained in London and internationally with the MENA region: to
        create a positive, swift impact in organisations wishing to operate at a
        world-class level and in a sustainable fashion. </p>
        <p>We share a common philosophy of trustworthiness, cooperation, hardwork,
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
      </div>
      </div>
    )
  }
}
