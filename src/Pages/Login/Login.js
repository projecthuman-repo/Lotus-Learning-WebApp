import React from 'react';
import Logo from '../../Images/BLN_Logo.png';
import fbIcon from '../../Images/fb_icon.svg';
import googleIcon from '../../Images/Googleicon.svg';
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import GoogleIcon from '@mui/icons-material/Google';
import { Link } from 'react-router-dom';
import './login.css';

const Login = () => {
  return (
    <div className='container-fluid'>
      <div className='row justify-content-center'>
        <div className='col-8'>
          <div className='border border-2 rounded  my-5'>
            <div className='row justify-content-center'>
              <div className='col-9 text-center'>
                <img
                  className='mt-5 me-5 ms-3'
                  src={Logo}
                  alt='Logo'
                  width={'70px'}
                ></img>
                {/* <div className='d-flex justify-content-center border-bottom mt-5'>
                  <p className='fs-30 border-end pe-5 py-3'>Login</p>
                  <p className='fs-30 ps-5 py-3'>Sign Up</p>
                </div> */}
                <p className='fs-30 border-bottom text-center pe-4 py-3'>
                  LOGIN
                </p>

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
                  <button className='btn btn-gray-shadow w-100 fs-24 p-2'>
                    Login
                  </button>
                </div>
                <div className='mt-4 d-flex justify-content-center'>
                  <hr />
                  <p className='fs-30'>OR</p>
                  <hr />
                </div>
                <div className='mt-3 socialSignUp d-flex mx-auto'>
                  <div className='d-flex mx-auto my-auto'>
                    <GoogleIcon fontSize='large' />
                    <p className='my-auto c-gray fs-18 fw-500 ms-3'>
                      Sign up with Google
                    </p>
                  </div>
                </div>
                <div className='mt-3 socialSignUp d-flex mx-auto'>
                  <div className='d-flex mx-auto my-auto'>
                    <FacebookRoundedIcon fontSize='large' />
                    <p className='my-auto c-gray fs-18 fw-500 ms-3'>
                      Sign up with Facebook
                    </p>
                  </div>
                </div>
                <p className='fs-14text-center pe-4 c-gray mt-3 my-5'>
                  Need an account?{' '}
                  <Link to={'/signup'} className='w-100'>
                    <span>Create your account</span>
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
