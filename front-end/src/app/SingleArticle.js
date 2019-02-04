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
    var details = []
    for (var i=0; i < people.length; i++) {
      if (people[i].name === authorName.toUpperCase()) {
        details[0] = people[i].job;
        details[1] = people[i].image;
        details[2] = people[i].id;
        details[3] = people[i].description;
      }
    }
    return details;
  }
  render() {
    let self = this.props.location.state.fromParent;
    var authorName = self.author.first_name + " " + self.author.last_name;
    var authorJob = this.getAuthorDetails(authorName)[0];
    var authorImage = this.getAuthorDetails(authorName)[1];
    var authorId = this.getAuthorDetails(authorName)[2];
    var authorDescription = this.getAuthorDetails(authorName)[3];
    var imageStyle = {};
    if (authorImage != undefined) {
      imageStyle = {
        backgroundImage: `url(${require(`./img/People/${authorImage}`)})`
      };
    }
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
            <Link className="tag" to='/insights'>
            {tag.toUpperCase()}
            </Link>
          ))}
        </ul>
      </div>
      <div className={this.state.isMobile ? "contact-details-mobile" : "contact-details"}>
        <Link className="contact-image"style={imageStyle} to={{
          pathname: `/team/${authorName.toLowerCase().split(" ")[0]}`,
          state: {
            fromParent: {
              name: authorName,
              id: authorId,
              job: authorJob,
              image: authorImage,
              description: authorDescription
            }
          }
        }}/>
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
