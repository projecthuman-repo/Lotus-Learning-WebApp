import React, { useEffect, useState } from "react";
import Placeholder from "../../Images/placeholderimage.PNG";
import { useNavigate } from "react-router-dom";
import SetupProgressBar from "../../components/SetupProgressBar/SetupProgressBar";
import CreateProfile from "./CreateProfile";
import { useLazyQuery } from "@apollo/client";
import { LOGIN_QUERY } from "../../helpers/api/queries";
import { useAuth } from "../../context/auth-context";
//muiIcons
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';

import "./Signup.css";
//cookies
import { saveUserCookies } from "../../cookie-handler/cookieHandler";
// redux
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/slice/user/userSlice";

const SignUp = () => {

  const dispatch = useDispatch();


  const [currentStep, setCurrentStep] = useState(1);
  const [currentScreen, setCurrentScreen] = useState();
  const [acceptedEmail, setAcceptedEmail] = useState("");
  const [acceptedPassword, setAcceptedPassword] = useState("");
  const [userBeingCreated, setUserBeingCreated] = useState(
    // {
    // name,
    // email, 
    // country,
    // state,
    // type,
    // password,
    // school,
    // image(pfp),
    // }

  )

  const [loginQuery, { loading, error, data }] = useLazyQuery(LOGIN_QUERY);

  const { login } = useAuth();
  const navigate = useNavigate();

  //onLoad set the first screen to create profile screen
  useEffect(() => {
    setCurrentScreen(<CreateProfile setCurrentStep={setCurrentStep} />);
  }, []);

  //when the currentStep of profile creation is updated, change screens
  useEffect(() => {
    if (currentStep === 1) {
      setCurrentScreen(
        <CreateProfile
          userBeingCreated={userBeingCreated}
          setUserBeingCreated={setUserBeingCreated}
          setCurrentStep={setCurrentStep}
          setAcceptedEmail={setAcceptedEmail}
          setAcceptedPassword={setAcceptedPassword}
        />
      );
    } else if (currentStep === 2) {
      setCurrentScreen(<TermsAndConditions />);
    } else if (currentStep === 3) {
      setCurrentScreen(<CompleteProfile />);
    }
  }, [currentStep]);

  useEffect(() => {
    if (data && data.login) {
      const { token } = data.login;
      login(token);
      navigate("/courses");
    }
  }, [data, loading, error]);

  const handleSuccessfulRegister = () => {
    loginQuery({
      variables: { email: acceptedEmail, password: acceptedPassword },
    });
  };

  //second screen in the profile creation process
  const TermsAndConditions = () => {
    
	const [agreeTandC, setAgreeTandC] = useState(false)
	const [agreePP, setAgreePP] = useState(false)
	

	const gotToNextStep = () => {
		if(agreePP && agreeTandC){
      //SAVING USER INTO THE COOKIES
      saveUserCookies(userBeingCreated)
      dispatch(setUser(userBeingCreated));

			setCurrentStep(3)
		}
		else{
			return
		}
	} 

	return (
      <div className="flex flex-col justify-center items-center">
        <div className="mt-5 text-center bg-white flex flex-col items-center justify-center rounded-sm">
          <p className="text-xl font-semibold">TERMS & CONDITIONS</p>
          <div className="max-w-[800px]  text-sm text-justify my-4 h-[350px] overflow-auto text-container">
            <p className="">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
              non fringilla massa. Pellentesque porttitor ultricies risus, nec
              facilisis tortor porta ac. Nulla aliquam et nibh quis venenatis.
              Nunc at tempor ligula. Vestibulum ante ipsum primis in faucibus
              orci luctus et ultrices posuere cubilia curae; Vestibulum non
              dolor eu nisl porta viverra. Integer vehicula vulputate pharetra.
              Mauris non mattis sem. Nullam eget orci urna. Nunc non faucibus
              nibh. Proin euismod in arcu sit amet semper. Sed et facilisis
              libero. Nam fermentum quis est ut tincidunt. Phasellus arcu metus,
              blandit in rutrum sed, mollis ac nisi. Aliquam semper aliquam
              nibh, quis ultrices est lobortis sed. Sed nec ligula sit amet mi
              aliquet efficitur. Nam gravida finibus ante quis condimentum. Duis
              fringilla aliquet nisi in eleifend. Sed mi erat, fringilla quis
              consectetur id, venenatis id lectus. Praesent convallis augue
              risus. Ut luctus, justo semper faucibus rhoncus, tortor tellus
              mattis turpis, at lacinia dui nunc et nisi. Cras et neque quis mi
              sodales volutpat. Integer tempus, sem fermentum mollis finibus,
              erat dui blandit tortor, sit amet sagittis risus nulla et mi.
              Proin tristique venenatis accumsan. Phasellus accumsan dolor at
              dictum iaculis. Mauris aliquet, ante a scelerisque malesuada, sem
              metus ultrices dolor, a semper odio ex eget augue. Morbi suscipit
              rutrum sapien. Integer ac metus tincidunt, auctor mauris ac,
              blandit quam. Ut laoreet imperdiet turpis non aliquet. Curabitur
              tempus placerat bibendum. Quisque molestie, est malesuada
              ultricies suscipit, purus eros volutpat odio, sed finibus mi erat
              sed est. Class aptent taciti sociosqu ad litora torquent per
              conubia nostra, per inceptos himenaeos. Nullam lacus orci, semper
              nec interdum vel, bibendum in nunc. Nam facilisis leo arcu, sit
              amet feugiat urna auctor lobortis. Curabitur aliquam sagittis
              sodales. Pellentesque iaculis lorem a ligula convallis, et
              vestibulum nisl dapibus. Integer aliquet posuere dolor, vitae
              vestibulum mi porta sit amet. Aliquam velit ipsum, luctus ac
              accumsan sit amet, dapibus at enim. Sed auctor velit mi, faucibus
              aliquam nisi tincidunt nec. Sed maximus eros nec ligula egestas
              auctor. Pellentesque condimentum pellentesque euismod. Sed
              lobortis, sem sit amet faucibus bibendum, risus eros suscipit
              nisl, et tristique quam massa et velit. Aliquam ultrices sapien
              hendrerit metus tincidunt congue. Nullam eu nibh tincidunt,
              lacinia est a, pretium tellus. Proin vitae sollicitudin erat.
              Interdum et malesuada fames ac ante ipsum primis in faucibus.
            </p>
          </div>
        </div>

        <div className="flex md:flex-row flex-col items-center justify-between  md:w-[90%] w-full px-2 mt-4">
          <div className="flex flex-col items-start justify-center space-y-3">
            <div className="form-check  text-sm">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="termsAndConditions"
				onChange={() => setAgreeTandC(!agreeTandC)}
				checked={agreeTandC}
              />
              <label className="form-check-label" htmlFor="termsAndConditions">
                <p>
                  I agree with the{" "}
                  <span className="fw-600">Terms and Conditions</span>
                </p>
              </label>
            </div>

            <div className="form-check text-sm">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="privacyPolicy"
				onChange={() => setAgreePP(!agreePP)}
				checked={agreePP}
              />
              <label className="form-check-label" htmlFor="privacyPolicy">
                <p>
                  I agree with the{" "}
                  <span className="fw-600">Privacy Policy</span>
                </p>
              </label>
            </div>
          </div>
          <button
            className="border-1 border-black px-4 py-2 w-[200px] rounded-md  font-normal text-black mt-2 md:mt-0"
            onClick={() => gotToNextStep()}
          >
            Next
          </button>
        </div>
      </div>
    );
  };

  //third and final screen in the profile creation process
  const CompleteProfile = () => {
    return (
      <div className=" text-center h-[80vh] flex flex-col items-center justify-center">
        <VerifiedUserIcon className="mb-5 "
		sx={{
			fontSize: '6rem', // Cambia el tamaño del icono
		}}
		style={{ color: '#78c200' }} 
		/>
        <p className="md:text-3xl text-lg fw-600 ">Verify your email address</p>
        <p className="p-3 md:text-medium text-sm ">
          Please click on the{" "}
          <span className="text-decoration-underline cursor-pointer">link</span> that has just
          been sent to your{" "}
          <span className="text-decoration-underline cursor-pointer">email</span> to verify
          your email address and continue the registration process
        </p>

        <p
          className="text-decoration-underline cursor-pointer"
          onClick={handleSuccessfulRegister}
        >
          Back to homepage
        </p>
      </div>
    );
  };

  return (
    <div className="container">
      <div className="row justify-content-center mt-3">
        <SetupProgressBar step={currentStep} setCurrentStep={setCurrentStep} />
        <div className="col-sm-10 mb-1">{currentScreen}</div>
      </div>


	
    </div>
  );
};

export default SignUp;
