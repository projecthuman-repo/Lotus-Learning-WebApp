import React from "react";
import "./contact.css";
const ContactForm = () => {
  const submitButtonStyle = {
    backgroundColor: "black",
    color: "white",
  };
  return (
    <div className="container">
      <div className="row">
        {/* Left Side */}
        <div className="col-lg-4 left-side">
          <h3 style={{ fontWeight: "bold" }}>Get in touch</h3>
          <p>
            We would love to hear from you. Our team is always here to chat.
          </p>
          <br></br>
          <h3>
            <img
              src="https://img.icons8.com/?size=512&id=60688&format=png"
              alt="icon"
              width="30px"
            />
            Email us
          </h3>
          <p>Our friendly team is here to help</p>
          <br></br>
          <p style={{ fontWeight: "bold" }}>email@projecthumancity.com</p>
          <br></br>
          <h3>
            <img
              src="https://img.icons8.com/?size=512&id=78382&format=png"
              alt="icon"
              width="30px"
            />
            Phone
          </h3>
          <p>Mon-Fri from 8am to 5pm</p>
          <br></br>
          <p>416-###-####</p>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <div className="social-icons">
            <img
              src="https://www.svgrepo.com/show/3885/facebook.svg"
              alt="icon"
              width="30px"
            />
            <img
              src="https://www.svgrepo.com/show/11841/twitter.svg"
              alt="icon"
              width="30px"
            />
            <img
              src="https://www.svgrepo.com/show/447135/instagram-fill.svg"
              alt="icon"
              width="30px"
            />
            <img
              src="https://www.svgrepo.com/show/513089/youtube-168.svg"
              alt="icon"
              width="30px"
            />
            <img
              src="https://www.svgrepo.com/show/324169/tik-tok-brand-assets-video-socialnetwork-oneline.svg"
              alt="icon"
              width="30px"
            />
          </div>
          {/* Add more contact information as needed */}
        </div>

        {/* Right Side */}
        <div className="col-lg-8">
          <form>
            <br></br>
            <div className="form-group">
              <label htmlFor="name" style={{ fontWeight: "bold" }}>
                Name
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                value="John Doe"
                style={{ marginBottom: "20px" }}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email" style={{ fontWeight: "bold" }}>
                E-mail
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                value="error@gmail.com"
                style={{ marginBottom: "20px" }}
              />
            </div>
            <div className="form-group form-control">
              <label htmlFor="phone" style={{ fontWeight: "bold" }}>
                Phone Number
              </label>
              <select>
                <option value="CAN">CAN</option>
                <option value="USA">USA</option>
                <option value="UK">UK</option>
              </select>
              <input
                type="tel"
                className="form-control"
                id="phone"
                value="+1 (416) 000-0000"
                style={{ marginBottom: "5px" }}
              />
            </div>

            <div className="form-group">
              <label htmlFor="topics" style={{ fontWeight: "bold" }}>
                Topic
              </label>
              <select
                className="form-control"
                id="topics"
                style={{ marginBottom: "20px" }}
              >
                <option value="Lorem Ipsum">Lorem Ipsum</option>
                <option value="Lorem Ipsum">Lorem Ipsum</option>
                <option value="Lorem Ipsum">Lorem Ipsum</option>
                {/* Add more topics as needed */}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="message" style={{ fontWeight: "bold" }}>
                How can we help?
              </label>
              <textarea
                className="form-control"
                id="message"
                rows="3"
                style={{ marginBottom: "20px" }}
              />
            </div>

            <div className="d-flex justify-content-center">
              <button
                type="submit"
                className="btn btn-primary btn-lg submit-button"
                style={submitButtonStyle}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
