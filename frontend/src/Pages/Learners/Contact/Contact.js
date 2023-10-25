import React from "react";

const ContactForm = () => {
	const submitButtonStyle = {
		width: "100%",
	};

	const leftSideStyle = {
		backgroundColor: "lightgray",
		padding: "20px",
		marginLeft: "0px",
		minHeight: "90vh",
	};

	const socialIconStyle = {
		position: "absolute",
		bottom: "20px",
		left: "30%",
	};

	return (
		<div className="container-fluid">
			<div className="row">
				<div
					className="col-lg-4 offset-lg-2"
					style={{ ...leftSideStyle, ...{ position: "relative" } }}
				>
					<h3 className="fw-bold">Get in touch</h3>
					<p>
						We would love to hear from you. Our team is always here
						to chat.
					</p>
					<br />
					<h3>
						<img
							src="https://img.icons8.com/?size=512&id=60688&format=png"
							alt="icon"
							width="30px"
						/>
						Email us
					</h3>
					<p>Our friendly team is here to help</p>
					<br />
					<p className="fw-bold">email@projecthumancity.com</p>
					<br />
					<h3>
						<img
							src="https://img.icons8.com/?size=512&id=78382&format=png"
							alt="icon"
							width="30px"
						/>
						Phone
					</h3>
					<p>Mon-Fri from 8am to 5pm</p>
					<br />
					<p>416-###-####</p>
					<br />
					<br />
					<div
						className="social-icons d-flex justify-content-center gap-3"
						style={{ ...socialIconStyle }}
					>
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
				<div className="container-fluid col-lg-8 justify-content-center">
					<form>
						<br />
						<div className="form-group">
							<label htmlFor="name" className="fw-bold">
								Name
							</label>
							<input
								type="text"
								className="form-control"
								id="name"
								value="John Doe"
								style={{
									marginBottom: "20px",
									border: "2px solid black",
								}}
							/>
						</div>
						<div className="form-group">
							<label htmlFor="email" className="fw-bold">
								E-mail
							</label>
							<input
								type="email"
								className="form-control"
								id="email"
								value="error@gmail.com"
								style={{
									marginBottom: "20px",
									border: "2px solid black",
								}}
							/>
						</div>
						<div
							className="form-group fw-bold form-control"
							style={{
								marginBottom: "20px",
								border: "2px solid black",
							}}
						>
							<label htmlFor="phone" className="fw-bold">
								Phone Number
							</label>
							<select className="form-select">
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
							<label htmlFor="topics" className="fw-bold">
								Topic
							</label>
							<select
								className="form-select"
								id="topics"
								style={{
									marginBottom: "20px",
									border: "2px solid black",
								}}
							>
								<option value="Lorem Ipsum">Lorem Ipsum</option>
								<option value="Lorem Ipsum">Lorem Ipsum</option>
								<option value="Lorem Ipsum">Lorem Ipsum</option>
								{/* Add more topics as needed */}
							</select>
						</div>
						<div className="form-group">
							<label htmlFor="message" className="fw-bold">
								How can we help?
							</label>
							<textarea
								className="form-control"
								id="message"
								rows="3"
								style={{
									marginBottom: "20px",
									border: "2px solid black",
								}}
							/>
						</div>

						<div className="d-flex justify-content-center">
							<button
								type="submit"
								className="btn btn-primary btn-lg submit-button bg-black"
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
