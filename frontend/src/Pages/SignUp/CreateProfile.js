import React, { useState } from 'react';
import PhotoPlaceholder from '../../components/PhotoPlaceholder/PhotoPlaceholder';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';

const CreateProfile = ({ setCurrentStep }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [country, setCountry] = useState('');
  const [stateProvince, setStateProvince] = useState('');
  const [accountType, setAccountType] = useState('');
  const [password, setPassword] = useState('');
  const [confirmedPassword, setConfirmedPassword] = useState('');
  const [school, setSchool] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();

    console.log(e);

    const formData = {
      name,
      email,
      password,
      accountType,
      country,
      stateProvince,
      school,
    };

    // console.log(JSON.stringify(formData));
    try {
      const response = await fetch('http://localhost:5000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log(data);

      if (data.message === 'User registered successfully') {
        // Registration successful
        setCurrentStep(2);
        window.sessionStorage.setItem('token', data);
        window.sessionStorage.setItem('user', JSON.stringify(data.user));
        // You might redirect the user to another page or perform other actions here
      } else {
        // Registration failed
        console.error(data.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <form onSubmit={(e) => handleRegister(e)}>
      <div className='bgc-lightLightGray p-5'>
        <div className='row '>
          <div className='col-sm-6 '>
            <div className='d-flex d-sm-none justify-content-end mt-4'>
              <div className='d-flex flex-column'>
                <PhotoPlaceholder />
                <div className='d-flex mx-auto mt-3'>
                  <FileUploadOutlinedIcon />
                  <p className='fw-500'>Upload Profile Photo</p>
                </div>
              </div>
            </div>

            <div className='mt-6 mt-sm-4'>
              <label htmlFor='signupFullName'>
                <p className='fs-18 fw-500'>Full Name* {name}</p>
              </label>
              <input
                className='form-control'
                id='signupFullName'
                type='text'
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
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
                value={email}
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
                value={password}
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
                value={confirmedPassword}
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
                value={country}
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
                value={stateProvince}
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
                value={accountType}
                onChange={(e) => setAccountType(e.target.value)}
              >
                <option>-</option>
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
                value={school}
                onChange={(e) => setSchool(e.target.value)}
              />
            </div>
          </div>

          <div className='col-sm-6 d-none d-sm-block'>
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
        <div className='row justify-content-sm-end p-3'>
          <div className='col-sm-6'>
            <div className='d-flex mt-4 mt-sm-0'>
              <button
                type='submit'
                className='btn btn-gray-shadow w-50 fs-22 p-2 mx-auto mx-sm-0 ms-sm-auto'
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default CreateProfile;
