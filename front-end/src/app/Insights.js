import React, { Component } from "react";
import axios from "axios";
import { Link } from 'react-router-dom'
import SingleArticle from './SingleArticle'
import Background from './img/Banners/AAC-insights.jpg'
import './scss/insights.css'

export default class Insights extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      chosenFilter: "all",
      tags: [],
      windowWidth:  window.document.documentElement.clientWidth,
      isMobile: false
    };
  }
  toggleState() {
    if (this.state.windowWidth < 600) {
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
    axios
      .get(
        "https://public-api.wordpress.com/rest/v1/sites/agileadvantage462538617.wordpress.com/posts"
      )
      .then(res => {
        this.setState({ posts: res.data.posts, });
      })
      .catch(error => console.log(error));

      this.setState({
        windowWidth: window.document.documentElement.clientWidth
      });
      window.addEventListener("resize", this.onResize);
      this.toggleState();
  }
  handleTagChange(event) {
    var chosenTag = event.target.innerHTML.toLowerCase();
    var tags = document.getElementsByClassName('tag');
    for (var i=0; i < tags.length; i++) {
      if (tags[i].innerHTML.toLowerCase() == chosenTag) {
        tags[i].className = (tags[i].className == "tag active-tag") ? "tag" : "tag active-tag";
      }
      else {
        tags[i].className = "tag";
      }
    }
    chosenTag = chosenTag.split("(")[0];
    if (chosenTag === this.state.chosenFilter) {
      this.setState({ chosenFilter: "all"});
    }
    else {
      this.setState({ chosenFilter: chosenTag});
    }
  }
  getFilteredPosts() {
    var filteredPosts = [];

    if (this.state.chosenFilter !== "all") {
      filteredPosts = this.state.posts.filter(post => {
        var individual = Object.keys(post.tags);
        var indTags = [];
        console.log(individual);
        for(var i=0; i<individual.length; i++) {
          indTags.push(individual[i].toLowerCase());
        }
        if (this.state.chosenFilter){
          return (indTags.indexOf(this.state.chosenFilter) >= 0);
        }
      })
    }
    else {
      filteredPosts = this.state.posts;
    }

    return filteredPosts;
  }
  handleCheck(val, list) {
    return list.some(item => val === item);
  }
  checkDuplicateTags(tags, tagName) {
    var duplicate = false;
    for (var i = 0; i < tags.length; i++) {
      if (tags[i].name == tagName) {
        duplicate = true;
      }
    }
    return duplicate;
  }
  getAllTags() {
    var posts = this.state.posts;
    var tags = [];
    for (var i = 0; i < posts.length; i++) {
      var individualTags = posts[i].tags;
      var numTags = Object.keys(individualTags).length;
      for (var j = 0; j < numTags; j++){
        if (!(Object.keys(individualTags).length === 0 && individualTags.constructor === Object)) {
          var tagName = individualTags[Object.keys(individualTags)[j]].name.toLowerCase();
          var tagCount = individualTags[Object.keys(individualTags)[j]].post_count;
          
          if (!this.handleCheck(tagName, this.state.tags)) {
            this.state.tags.push(tagName);
          }

          if (!this.checkDuplicateTags(tags, tagName)) {
            tags.push({name: tagName, count: tagCount});
          }
        }
      }
    }
    return tags;
  }
  render() {
    var tags = this.getAllTags();
    var filteredPosts = this.getFilteredPosts();
    var middleScreen = (this.state.windowWidth < 800 && this.state.windowWidth > 600) ? "insights-middle" : "";
    return (
      <div className="blog">
      <div className="mainpage-banner page" data-aos="fade-down" style={{backgroundImage: `url(${Background})`, backgroundPosition: "10% 70%"}}>
        <div className="mainpage-banner-text">
          <h1>The best vision is insight</h1>
          <h2>Malcolm Forbes</h2>
        </div>
      </div>
      <div className="blogpage-content">
      <ul className="tags">
        {tags.map((tag) => (
          <div key={tag}>
            {(tag.count != 0) ?
            <div className="tag" key={tag} onClick={this.handleTagChange.bind(this)}>
              {tag.name.toUpperCase()}
              ({tag.count})
            </div>
            : <div/>
            }
          </div>
        ))}
      </ul>
      <ul className={this.state.isMobile ? "articles-list-mobile" :"articles-list " + middleScreen} data-aos="fade-up"
     data-aos-offset="100"
     data-aos-easing="ease-in-sine">=
      {filteredPosts.map((post) => (
        <Link key = {post.ID} className={"single-service " + post.ID} to={{
          pathname: `/insights/${post.slug}`,
          state: {
            fromParent: post
          }
        }}>
        <img src={post.featured_image} alt="article-img"/>
        <span>{post.title.toUpperCase()}</span>
        </Link>
      ))}
      </ul>
      </div>
      </div>
    );
  }
}
