import React from 'react';
import Logo from '../../Images/BLN_Logo.png';
import fbIcon from '../../Images/fb_icon.svg';
import googleIcon from '../../Images/Googleicon.svg';
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <div className='container-fluid'>
      <div className='row justify-content-center'>
        <div className='col-8'>
          <div className='border rounded my-5'>
            <div className='row justify-content-center'>
              <div className='col-9 text-center'>
                <img
                  className='mt-5 me-5 ms-3'
                  src={Logo}
                  alt='Logo'
                  width={'70px'}
                ></img>
                <div className='d-flex justify-content-center border-bottom mt-5'>
                  <p className='fs-30 border-end pe-5 py-3'>Login</p>
                  <p className='fs-30 ps-5 py-3'>Sign Up</p>
                </div>
                <div className='mt-6'>
                  <input
                    className='form-control '
                    placeholder='Email or Username'
                  />
                </div>
                <div className='mt-4'>
                  <input className='form-control ' placeholder='Password' />
                </div>
                <div className='mt-4 d-flex'>
                  <Link to={'/signup'} className='w-100'>
                    <button className='btn btn-gray-shadow w-100 fs-24 p-2'>
                      Sign Up
                    </button>
                  </Link>
                </div>
                <div className='mt-4 d-flex justify-content-center'>
                  <hr />
                  <p className='fs-30'>OR</p>
                  <hr />
                </div>

                <div className='mt-6'>
                  <div className='border d-flex'>
                    <img src={googleIcon} alt='Googleicon'></img>
                    Sign up with Google
                  </div>
                </div>
                <div className='mt-3'>
                  <img src={fbIcon} alt='Googleicon'></img>
                  Sign up with Facebook
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
