import React from 'react'
import Background from './img/Banners/AAC-community.jpg'
import './scss/homepage.css'

export default class Community extends React.Component {
  componentDidMount() {
    window.scrollTo(0,0);
  }
  render() {
    return (
      <div className="mainpage">
      <div className="mainpage-banner page" data-aos="fade-down" style={{backgroundImage: `url(${Background})`, backgroundPosition: "90% 60%"}}>
        <h1 className="mainpage-banner-text">Everyone benefits when they can help others</h1>
      </div>
      <div className="page-content">
        <p>Agile Advantage is a team of highly motivated leaders
        working together to improve its clients’ sustainability
        and performance with respect to their strategy, people and systems.
        Delivering class-leading support in a tailor fashion to
        suit their specific objectives, it is important to us as
        a company that we also create and contribute to the society
        in which we live, supporting and contributing to the local community.<br/>
        </p>
        <p>
        <h2 className="heading">MENTORING</h2>
        AA will mentor graduates from the regions in which they serve, substantially increasing their employability, whilst offering continued support for their personal advancement. Each mentee will be championed by one team member and they, in turn, will be encouraged to positively impact on those they live and work with.
        </p>
        <p>
        <h2 className="heading">AUTISM</h2>
        For the past 25 years, Naina Biring has been teaching and supporting children with autism in a special needs school in London, UK. This condition develops in early childhood and is characterised by great difficulty in communicating, forming relationships with other people and in using language and abstract concepts. Naina’s wish has been to help many families to understand autism and prepare them for their futures. The number of positive successes over the years has brought so much joy to her and Agile Advantage founder, Steve, that AAC are passionate to place profits from the company into a fund to support those requiring specialist support and do not have the resources to do so in the local MENA region.</p>
      </div>
      </div>
    )
  }
}
