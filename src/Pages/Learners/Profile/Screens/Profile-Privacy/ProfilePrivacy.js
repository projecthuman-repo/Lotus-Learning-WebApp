import React from 'react';
import './profilePrivacy.css';
import { BiPencil } from 'react-icons/bi';

const ProfilePrivacy = () => {
  const user = JSON.parse(window.sessionStorage.getItem('user'));
  return (
    <div className='px-5'>
      <div className='row mt-5'>
        <div className='d-flex'>
          <p className='fs-20 fw-600'>Two Factor Authentication</p>
          <div className='my-auto ms-2'>
            <BiPencil size={20} />
          </div>
        </div>
        <div className='border border-dark borRad-10 p-3 mt-2'>
          <div className='d-flex'>
            <div className='my-auto'>
              <p>Email Address:</p>
            </div>
            <div className='my-auto'>
              <input
                className='form-input-noline ms-3 c-gray borRad-10'
                placeholder={user.userEmail}
              />
            </div>
          </div>

          <hr className='accountTableLine' />

          <div className='d-flex'>
            <div className='my-auto'>
              <p>Secondary Email:</p>
            </div>
            <div className='my-auto'>
              <input
                className='form-input-noline ms-3 c-gray borRad-10'
                placeholder={user.userEmail}
              />
            </div>
          </div>

          <hr className='accountTableLine' />

          <div className='d-flex'>
            <div className='my-auto'>
              <p>Phone (Text SMS)</p>
            </div>
            <div className='my-auto'>
              <input
                className='form-input-noline ms-3 c-gray borRad-10'
                placeholder={user.userEmail}
              />
            </div>
          </div>
        </div>
      </div>

      <div className='row mt-5'>
        <div className='d-flex'>
          <p className='fs-20 fw-600'>Billing Information</p>
          <div className='my-auto ms-2'>
            <BiPencil size={20} />
          </div>
        </div>
        <div className='border border-dark borRad-10 p-3 mt-2'>
          <div className='d-flex'>
            <div className='my-auto'>
              <p>Payment Method:</p>
            </div>
            <div className='my-auto'>
              <input
                className='form-input-noline ms-3 c-gray borRad-10'
                placeholder={user.userEmail}
              />
            </div>
          </div>

          <hr className='accountTableLine' />

          <div className='d-flex'>
            <div className='my-auto'>
              <p>Billing Address:</p>
            </div>
            <div className='my-auto'>
              <input
                className='form-input-noline ms-3 c-gray borRad-10'
                placeholder='00-10000 Random, Address X1V 3T4'
                style={{ width: '500px' }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePrivacy;
