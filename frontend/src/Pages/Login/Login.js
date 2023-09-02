import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../../Images/BLN_Logo.png';
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import GoogleIcon from '@mui/icons-material/Google';
import { Link } from 'react-router-dom';
import './login.css';
import { useLazyQuery } from '@apollo/client';
import { useAuth } from '../../context/auth-context';
import { LOGIN_QUERY } from '../../helpers/api/queries';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { login } = useAuth();
  const navigate = useNavigate();

  const [loginQuery, { loading, error, data }] = useLazyQuery(LOGIN_QUERY);

  useEffect(() => {
    if (data && data.login) {
      const { token } = data.login;
      login(token);
      navigate('/courses');
    }
  }, [data]);

  const handleLogin = () => {
    loginQuery({ variables: { email, password } });
  };

  return (
    <div className='container h-100 '>
      <div className='row justify-content-center h-100 align-items-center'>
        <div className='col-sm-8 '>
          <div className='border border-2 rounded my-5'>
            <div className='row justify-content-center '>
              <div className='col-10 text-center '>
                <img
                  className='mt-5 me-5 ms-3'
                  src={Logo}
                  alt='Logo'
                  width={'70px'}
                ></img>
                <p className='fs-30 border-bottom text-center pe-4 py-3'>
                  LOGIN
                </p>

                <div className='mt-6'>
                  <input
                    className='form-control '
                    placeholder='Email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className='mt-4'>
                  <input
                    className='form-control '
                    placeholder='Password'
                    type='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className='mt-4 d-flex'>
                  <button
                    className='btn btn-gray-shadow w-100 fs-24 p-2'
                    onClick={handleLogin}
                  >
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
                <p className='fs-14 text-center pe-4 c-gray mt-4 my-5'>
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
