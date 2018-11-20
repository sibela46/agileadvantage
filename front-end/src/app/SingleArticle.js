import React from 'react'
import {Link} from 'react-router-dom'
import people from './data/all-people'

export default class SingleArticle extends React.Component {
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
  onResize() {
    this.windowWidth = window.document.documentElement.clientWidth;
  }
  removeUnicode(string) {
    if (string.indexOf("&#8217;") >= 0) {
      return this.removeUnicode(string.replace("&#8217;", "'"));
    }
    if (string.indexOf("[&hellip;]") >= 0) {
      return this.removeUnicode(string.replace("[&hellip;]", ""));
    }
    else {
      return string.replace("<p>", "").replace("</p>", "").replace("[&hellip;]</p>", "...").replace("&nbsp;", "");
    }
  }
  configureImage(string) {
    return string.replace("<p>", "").replace("</p>", "");
  }
  formatDate(date) {
    return date.slice(0, 10);
  }
  getAuthorDetails(authorName) {
    var job_image = []
    for (var i=0; i < people.length; i++) {
      if (people[i].name === authorName.toUpperCase()) {
        job_image[0] = people[i].job;
        job_image[1] = people[i].image;
      }
    }
    return job_image;
  }
  render() {
    let self = this.props.location.state.fromParent;
    var authorName = self.author.first_name + " " + self.author.last_name;
    var authorImage = this.getAuthorDetails(authorName)[1];
    var authorJob = this.getAuthorDetails(authorName)[0];
    var title = self.title;
    var image = self.featured_image;
    var tags = Object.keys(self.tags);
    var summary = this.removeUnicode(self.excerpt);
    console.log(self);
    return (
      <div className="single-article">
      <div className="mainpage-banner page" style={{backgroundImage: `url(${image})`}}/>
      <div className={this.state.isMobile ? "single-article-content-mobile" : "single-article-content"}>
        <h1 className="gray-header">{title.toUpperCase()}</h1>
        <div className="article-summary">{summary}</div>
        <div className="article-data">
          <span>BY:<h3>{authorName.toUpperCase()}</h3></span>
          <span>PUBLISHED:<h3>{this.formatDate(self.date)}</h3></span>
        </div>
        <div className="article-description" dangerouslySetInnerHTML={{__html: self.content}}/>
        <ul className="tags">
          {tags.map((tag) => (
            <div className="tag">
            <h2>{tag.toUpperCase()}</h2>
            </div>
          ))}
        </ul>
      </div>
      <div className={this.state.isMobile ? "contact-details-mobile" : "contact-details"}>
        <div className="contact-image"style={{backgroundImage: `url(${require(`./img/People/${authorImage}`)})`}}/>
        <h2>{authorName.toUpperCase()}</h2>
        <p>{authorJob}</p>
        <div className="contact">
        <Link to="/contact"><button>CONTACT</button></Link>
        </div>
      </div>
      </div>
    )
  }
}
