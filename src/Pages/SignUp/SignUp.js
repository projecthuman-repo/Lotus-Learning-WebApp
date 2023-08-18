import React, { useEffect, useState } from 'react';
import Placeholder from '../../Images/placeholderimage.PNG';
import { FaCamera } from 'react-icons/fa';
import PhotoPlaceholder from '../../components/PhotoPlaceholder/PhotoPlaceholder';
import { Link } from 'react-router-dom';
import SetupProgressBar from '../../components/SetupProgressBar/SetupProgressBar';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';

const SignUp = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [currentScreen, setCurrentScreen] = useState();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [country, setCountry] = useState('');
  const [stateProvince, setStateProvince] = useState('');
  const [accountType, setAccountType] = useState('');
  const [password, setPassword] = useState('');
  const [confirmedPassword, setConfirmedPassword] = useState('');
  const [school, setSchool] = useState('');

  //onLoad set the first screen to create profile screen
  useEffect(() => {
    setCurrentScreen(<CreateProfile />);
  }, []);

  //when the currentStep of profile creation is updated, change screens
  useEffect(() => {
    if (currentStep === 1) {
      setCurrentScreen(<CreateProfile />);
    } else if (currentStep === 2) {
      setCurrentScreen(<TermsAndConditions />);
    } else if (currentStep === 3) {
      setCurrentScreen(<CompleteProfile />);
    }
  }, [currentStep]);

  //this needs fixing
  const validateProfile = () => {
    console.log(fullName);
    console.log(email);
    console.log(country);
    console.log(stateProvince);
    console.log(password);
    console.log(confirmedPassword);
    console.log(school);
    if (
      fullName.trim() !== '' &&
      email.trim() !== '' &&
      country.trim() !== '' &&
      stateProvince.trim() !== '' &&
      password.trim() !== '' &&
      confirmedPassword.trim() !== '' &&
      school.trim() !== ''
    ) {
      if (password === confirmedPassword) {
        setCurrentStep(2);
      }
    } else {
    }
  };

  //first screen in the profile creation process
  const CreateProfile = () => {
    return (
      <div className='bgc-lightLightGray p-5'>
        <div className='row '>
          <div className='col-6 '>
            <div className='mt-4'>
              <label htmlFor='signupFullName'>
                <p className='fs-18 fw-500'>Full Name*</p>
              </label>
              <input
                className='form-control'
                id='signupFullName'
                type='text'
                onChange={(e) => {
                  setFullName(e.target.value);
                }}
              />
            </div>

            <div className='mt-4'>
              <label htmlFor='signupEmail'>
                <p className='fs-18 fw-500'>Email*</p>
              </label>
              <input
                className='form-control'
                id='signupEmail'
                type='text'
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className='mt-4'>
              <label htmlFor='signupPassword'>
                <p className='fs-18 fw-500'>Password*</p>
              </label>
              <input
                className='form-control'
                id='signupPassword'
                type='password'
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className='mt-4'>
              <label htmlFor='signupConfirmPassword'>
                <p className='fs-18 fw-500'>Confirm Password*</p>
              </label>
              <input
                className='form-control'
                id='signupConfirmPassword'
                type='password'
                onChange={(e) => setConfirmedPassword(e.target.value)}
              />
            </div>

            <div className='mt-4'>
              <label htmlFor='signupCountry'>
                <p className='fs-18 fw-500'>Country*</p>
              </label>
              <input
                className='form-control'
                id='signupCountry'
                type='text'
                onChange={(e) => setCountry(e.target.value)}
              />
            </div>

            <div className='mt-4'>
              <label htmlFor='signupStateProvince'>
                <p className='fs-18 fw-500'>State/Province*</p>
              </label>
              <input
                className='form-control'
                id='signupStateProvince'
                type='text'
                onChange={(e) => setStateProvince(e.target.value)}
              />
            </div>

            <div className='mt-4'>
              <label htmlFor='signupAccountType'>
                <p className='fs-18 fw-500'>Type of Account*</p>
              </label>
              <select
                className='form-select'
                id='signupAccountType'
                onChange={(e) => setAccountType(e.target.value)}
                defaultValue={'Learner'}
              >
                <option value={'Learner'}>Learner</option>
                <option value={'Educator'}>Educator</option>
                <option value={'Admin'}>Admin</option>
              </select>
            </div>

            <div className='mt-4'>
              <label htmlFor='signupSchool'>
                <p className='fs-18 fw-500'>School (Optional)</p>
              </label>
              <input
                className='form-control'
                id='signupSchool'
                type='text'
                onChange={(e) => setSchool(e.target.value)}
              />
            </div>
          </div>

          <div className='col-6'>
            <div className='d-flex justify-content-end mt-4'>
              <div className='d-flex flex-column'>
                <PhotoPlaceholder />
                <div className='d-flex mx-auto mt-3'>
                  <FileUploadOutlinedIcon />
                  <p className='fw-500'>Upload Profile Photo</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='row justify-content-end p-3'>
          <div className='col-6'>
            <div className='d-flex'>
              <button
                className='btn btn-gray-shadow w-50 fs-22 p-2 ms-auto'
                onClick={validateProfile}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  //second screen in the profile creation process
  const TermsAndConditions = () => {
    return (
      <div className='bgc-lightLightGray p-5'>
        <div className='row'>
          <div className='pt-5 px-5 text-center bg-white'>
            <p className='fs-30 fw-600'>TERMS & CONDITIONS</p>
            <p className='fs-14 p-5 text-start'>
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

          <div className='form-check ms-3 mt-3'>
            <input
              className='form-check-input'
              type='checkbox'
              value=''
              id='termsAndConditions'
            />
            <label className='form-check-label' htmlFor='termsAndConditions'>
              <p>
                I agree with the{' '}
                <span className='fw-600'>Terms and Conditions</span>
              </p>
            </label>
          </div>

          <div className='form-check ms-3 mt-3'>
            <input
              className='form-check-input'
              type='checkbox'
              value=''
              id='privacyPolicy'
            />
            <label className='form-check-label' htmlFor='privacyPolicy'>
              <p>
                I agree with the <span className='fw-600'>Privacy Policy</span>
              </p>
            </label>
          </div>

          <div className='d-flex'>
            <button
              className='btn btn-gray-shadow w-25 fs-22 p-2 ms-auto'
              onClick={() => {
                setCurrentStep(3);
              }}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    );
  };

  //third and final screen in the profile creation process
  const CompleteProfile = () => {
    return (
      <div className='p-5 border text-center'>
        <img src={Placeholder} width={'275px'} alt='placeholder' />
        <p className='fs-28 fw-600 mt-5'>Verify your email address</p>
        <p className='p-3'>
          Please click on the{' '}
          <span className='text-decoration-underline'>link</span>that has just
          been sent to your{' '}
          <span className='text-decoration-underline'>email</span>to verify your
          email address and continue the registration process
        </p>

        <Link to={'/course-catologue'}>
          <p className='text-decoration-underline'>Back to homepage</p>
        </Link>
      </div>
    );
  };

  return (
    <div className='container'>
      <div className='row justify-content-center mt-5'>
        <SetupProgressBar step={currentStep} setCurrentStep={setCurrentStep} />
        <div className='col-10 mt-5'>{currentScreen}</div>
      </div>
    </div>
  );
};

export default SignUp;
