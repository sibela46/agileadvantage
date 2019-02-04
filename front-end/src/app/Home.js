import React from 'react'
import { Link } from 'react-router-dom'
import axios from "axios"
import {services1} from './data/all-services'
import './scss/homepage.css'
import Background from "./img/Banners/AAC-main.jpg"
import Cookies from 'universal-cookie';
const cookies = new Cookies();

export default class Home extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        newestPost: [],
        otherPosts: [],
        windowWidth:  window.document.documentElement.clientWidth,
        isMobile: false
      };
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
      window.scrollTo(0,0);
      axios
        .get(
          "https://public-api.wordpress.com/rest/v1/sites/agileadvantage462538617.wordpress.com/posts"
        )
        .then(res => {
          if (res.data.posts.length >= 3) {
            this.setState({ newestPost: res.data.posts[0], otherPosts: [res.data.posts[1], res.data.posts[2]]});
          }
          else if (res.data.posts.length == 2) {
            this.setState({ newestPost: res.data.posts[0], otherPosts: [res.data.posts[1]]});
          }
          else {
            this.setState({ newestPost: res.data.posts[0],  otherPosts: [] });
          }
        })
        .catch(error => console.log(error));
        this.setState({
          windowWidth: window.document.documentElement.clientWidth
        });
        window.addEventListener("resize", this.onResize);
        this.toggleState();
    }
    render() {
      var isSingle;
      if (this.state.otherPosts.length == 0) {
        isSingle = {
            width: '80%',
            fontSize: '2.5vw'
        };
      }
      else {
        isSingle = {};
      }
      return(
        <div className="mainpage">
          <div className="mainpage-banner" data-aos="fade-down" style={{backgroundImage: `url(${Background})`}}>
            <div className="mainpage-banner-text home">
              <h1>Management & strategy consulting firm based in Dubai</h1>
            </div>
            <div className="homepage-description">
            <p> <span className="bolder">Agile Advantage Consulting (AA) </span>is a
            management and strategy consulting firm specialising in delivering
            efficient and effective professional services to assure high-performance
            in our clients’ organisations.<Link to="/about" style = {{textDecoration: "none"}}> >> </Link>
            </p>
            </div>
          </div>
          <div className="white-heading">
            <h1 data-aos="fade up">INSIGHTS</h1>
          </div>
          <div className={this.state.isMobile ? "homepage-articles-mobile" : "homepage-articles-list"} data-aos="fade-up">
            <Link key = {this.state.newestPost.ID} style = {isSingle} className={this.state.isMobile ? "single-service" : "single-service-main"} to={{
              pathname: `/insights/${this.state.newestPost.slug}`,
              state: {
                fromParent: this.state.newestPost
              }
            }}>
            <img src={this.state.newestPost.featured_image} alt="article-img"/>
            <span>{this.state.newestPost.title}</span>
            </Link>
            {this.state.otherPosts.map((post) => (
              <Link key = {post.ID} className={"single-service"} to={{
                pathname: `/insights/${post.slug}`,
                state: {
                  fromParent: post
                }
              }}>
              <img src={post.featured_image} alt="article-img"/>
              <span>{post.title.toUpperCase()}</span>
              </Link>
            ))}
          </div>
          <Link className="homepage-services" to="/services">
            <h1 data-aos="fade up">SERVICES WE OFFER</h1>
            <div className="homepage-services-list">
            <ul data-aos="fade-right">
              <h2>Advanced Analytics</h2>
              <h2>Change Management</h2>
              <h2>Performance Improvement</h2>
              <h2>Talent, Leadership & Culture</h2>
            </ul>
            </div>
          </Link>
        </div>
      )
    }
}
