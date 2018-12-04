import React from 'react'
import axios from 'axios'
import swal from 'sweetalert'
import $ from 'jquery'

export default class Contact extends React.Component {
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
  handleSubmit(e){
      e.preventDefault();
      const firstName = document.getElementById('firstName').value;
      const lastName = document.getElementById('lastName').value;
      const email = document.getElementById('email').value;
      const message = document.getElementById('message').value;
      const phone = document.getElementById('phone').value;
      const companyName = document.getElementById('company').value;

      if (firstName === "" || lastName === "" || email === "" || message === "" || phone === "" || companyName === "") {
        swal("Sending failed.", "Please fill in all fields.", "error");
      }
      else {
        $.ajax({
          url: "https://formspree.io/info@agileadvantage.consulting",
          method: "POST",
          data: {
            Name: firstName + " " + lastName,
            Email: email,
            Number: phone,
            Company: companyName,
            Message: message
          },
          dataType: "json"
        });
        swal("Thanks for sending us an email.", "We wll be in touch shortly.", "success")
      }

      return false;

  }
  resetForm(){
      document.getElementById('contact-form').reset();
  }
  render() {
    return (
      <div className="contact-page">
        <div className="mainpage-banner page contact-banner" data-aos="fade-down">
          <div className="mainpage-banner-text">
          <h1>In a global society, communication is the key</h1>
          </div>
        </div>
        <div className={this.state.isMobile ? "contact-content mobile" : "contact-content"}>
        <h1 className="gray-header">CONTACT</h1>
        <p>For a complimentary introductory meeting please complete the form below: </p>
        <form id="contact-form" method="POST">
            <div className="name-fields">
              <div className="form-group">
                  <input type="text" className="form-control" placeholder="FIRST NAME" id="firstName" />
              </div>
              <div className="form-group">
                  <input type="text" className="form-control" placeholder="LAST NAME" id="lastName" />
              </div>
            </div>
            <div className="name-fields">
              <div className="form-group">
                  <input type="email" className="form-control" placeholder="EMAIL ADDRESS" id="email" aria-describedby="emailHelp" />
              </div>
              <div className="form-group">
                  <input type="phone" className="form-control" placeholder="PHONE NUMBER" id="phone" />
              </div>
            </div>
            <div className="form-group company-name">
              <input type="text" className="company-name" placeholder="COMPANY NAME" id="company" />
            </div>
            <div className="form-group message-field">
                <label className="message">MESSAGE</label>
                <textarea className="form-control" rows="5" id="message"></textarea>
            </div>
            <div className="contact submit">
              <button type="submit" className="btn btn-primary" onClick={this.handleSubmit}>SUBMIT</button>
            </div>
        </form>
        </div>
        <div className={this.state.isMobile ? "contact-details-mobile" : "contact-details"}>
          <h2>Agile Advantage Consulting DMCC</h2>
          <p className="spaced">+971 (0) 55 293 2600</p>
          <p className="spaced">info@agileadvantage.consulting</p>
        </div>
      </div>
    )
  }
}


// axios({
//     method: "POST",
//     url:"localhost:3002/send",
//     data: {
//         name: name,
//         email: email,
//         message: message
//     }
// }).then((response)=>{
//     if (response.data.msg === 'success'){
//         swal ( "Thank you!", "Your message has been sent." ,  "success" );
//         this.resetForm();
//     }else if(response.data.msg === 'fail'){
//         swal ( "Something went wrong." ,  "Please, check your internet connection." ,  "error" );
//     }
// })
