import React from 'react'
import logo from './img/logo.png'
import smallLogo from './img/smallLogo.png'
import search from './img/search.png'
import NavLink from './nav_link'
import './scss/header.css'

var windowWidth;
class Header extends React.Component {
  constructor(props) {
    super(props);
  }
  onResize() {
    this.windowWidth = window.document.documentElement.clientWidth;
    if (this.windowWidth < 750) {
      document.getElementsByClassName('header-logo')[0].style.display = "none";
      document.getElementsByClassName('small-logo')[0].style.display = "block";
    }
    else {
      document.getElementsByClassName('header-logo')[0].style.display = "block";
      document.getElementsByClassName('small-logo')[0].style.display = "none";
    }
  }
  componentDidMount() {
    this.windowWidth = window.document.documentElement.clientWidth;
    window.addEventListener("resize", this.onResize);
    if (this.windowWidth < 750) {
      document.getElementsByClassName('header-logo')[0].style.display = "none";
      document.getElementsByClassName('small-logo')[0].style.display = "block";
    }
    else {
      document.getElementsByClassName('header-logo')[0].style.display = "block";
      document.getElementsByClassName('small-logo')[0].style.display = "none";
    }
  }
  toggleNav = () => {
    this.setState(prevState => ({
      isActive: !prevState.isActive
    }))
  }

  render() {
    return (
      <div className="header">
        <NavLink to="/" className="logo">
          <img className="header-logo" src={logo} alt="logo"/>
          <img className="small-logo" src={smallLogo} alt="smallLogo"/>
        </NavLink>
        <div className="navigation">
        <ul className="nav-items">
          <li><NavLink to="/about"><span>ABOUT</span></NavLink></li>
          <li><NavLink to="/services"><span>SERVICES</span></NavLink></li>
          <li><NavLink to="/insights"><span>INSIGHTS</span></NavLink></li>
          <li><NavLink to="/team"><span>TEAM</span></NavLink></li>
          <li><NavLink to="/community"><span>COMMUNITY</span></NavLink></li>
          <li><NavLink to="/contact"><span>CONTACT</span></NavLink></li>
        </ul>
        </div>
      </div>
    )
  }
}

export default Header

// <div className="search-field">
//   <img src={search} alt="search"/>
//   <input className="search-box" type="text"/>
// </div>
