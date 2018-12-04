import React from 'react'
import './scss/header.css'
import { Link } from 'react-router-dom'

const Footer = () => (
  <div className="footer">
  <div className="agile-company">
    <span>© 2018</span>
    <h1>AGILE ADVANTAGE CONSULTING</h1>
    <span>All rights reserved</span>
  </div>
  <div className="footer-info">
    <Link to='/terms-and-conditions'>
    TERMS AND CONDITIONS
    </Link>
    <h1>|</h1>
    <h1>WEB DESIGN</h1>
    <h2>chasingshadows.com</h2>
  </div>
  </div>
)

export default Footer;
