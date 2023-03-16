import "./LearnersInfo.css";

export default function LearnersInfo() {
  return (
    <>
      <div className="Leaners-Info-Container">
        <div className="Learners-Info-profile-pic">
          <svg
            width="250"
            height="250"
            viewBox="0 0 250 250"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="125" cy="125" r="125" fill="#D9D9D9" />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M90.875 99.8125H95.8125C101.266 99.8125 105.688 95.3913 105.688 89.9375C105.688 87.2106 107.898 85 110.625 85H140.25C142.977 85 145.188 87.2106 145.188 89.9375C145.188 95.3913 149.609 99.8125 155.062 99.8125H160C165.454 99.8125 169.875 104.234 169.875 109.688V154.125C169.875 159.579 165.454 164 160 164H90.875C85.4212 164 81 159.579 81 154.125V109.688C81 104.234 85.4212 99.8125 90.875 99.8125"
              fill="#D9D9D9"
            />
            <path
              d="M90.875 99.8125H95.8125C101.266 99.8125 105.688 95.3913 105.688 89.9375C105.688 87.2106 107.898 85 110.625 85H140.25C142.977 85 145.188 87.2106 145.188 89.9375C145.188 95.3913 149.609 99.8125 155.062 99.8125H160C165.454 99.8125 169.875 104.234 169.875 109.688V154.125C169.875 159.579 165.454 164 160 164H90.875C85.4212 164 81 159.579 81 154.125V109.688C81 104.234 85.4212 99.8125 90.875 99.8125"
              stroke="white"
              stroke-width="5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <circle
              cx="125.438"
              cy="129.438"
              r="14.8125"
              fill="white"
              stroke="white"
              stroke-width="5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
        <div className="Learners-Info-User">
          <div>
            <h4>Insert Name Here</h4>
          </div>
          <div>
            <h6>Student/Learner</h6>
          </div>
          <div className="Learners-Info-UserInfo">
            <div>
              <div>
                <p>
                  <b>Email: </b>
                  <span>johndoe@gmail.com</span>
                </p>
              </div>
              <div>
                <p>
                  <b>Password: </b>
                  <span>********</span>
                </p>
              </div>
              <div>
                <p>
                  <b>Phone Number: </b>
                  <span>123-134-5646</span>
                </p>
              </div>
            </div>
            <div>
              <div>
                <p>
                  <b>Country: </b>
                  <span>Canada</span>
                </p>
              </div>
              <div>
                <p>
                  <b>Province: </b>
                  <span>Ontario</span>
                </p>
              </div>
              <div>
                <p>
                  <b>City: </b>
                  <span>Toronto</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
