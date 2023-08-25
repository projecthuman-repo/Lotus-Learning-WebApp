import React from 'react';
import { BiPencil } from 'react-icons/bi';

const EducatorAccount = () => {
  const user = JSON.parse(window.sessionStorage.getItem('user'));

  return (
    <div className='px-md-4 mt-6'>
      <div className='row'>
        <div className='d-flex'>
          <p className='fs-20 fw-600'>Personal Information</p>
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
              <p>Phone Number:</p>
            </div>
            <div className='my-auto'>
              <input
                className='form-input-noline ms-3 c-gray borRad-10'
                placeholder={user.userPhoneNum}
              />
            </div>
          </div>

          <hr className='accountTableLine' />

          <div className='d-flex'>
            <div className='my-auto'>
              <p>Gender:</p>
            </div>
            <div className='my-auto'>
              <input
                className='form-input-noline ms-3 c-gray borRad-10'
                placeholder={user.userGender}
              />
            </div>
          </div>

          <hr className='accountTableLine' />

          <div className='d-flex'>
            <div className='my-auto'>
              <p>Country:</p>
            </div>
            <div className='my-auto'>
              <input
                className='form-input-noline ms-3 c-gray borRad-10'
                placeholder={user.userCountry}
              />
            </div>
          </div>

          <hr className='accountTableLine' />

          <div className='d-flex'>
            <div className='my-auto'>
              <p>Province:</p>
            </div>
            <div className='my-auto'>
              <input
                className='form-input-noline ms-3 c-gray borRad-10'
                placeholder={user.userProvince}
              />
            </div>
          </div>
        </div>
      </div>

      <div className='row mt-5'>
        <div className='d-flex'>
          <p className='fs-20 fw-600'>Account Settings</p>
          <div className='my-auto ms-2'>
            <BiPencil size={20} />
          </div>
        </div>
        <div className='border border-dark borRad-10 p-3 mt-2'>
          <div className='d-flex'>
            <div className='my-auto'>
              <p>Display Name:</p>
            </div>
            <div className='my-auto'>
              <input
                className='form-input-noline ms-3 c-gray borRad-10'
                type='text'
                placeholder={user.name}
              />
            </div>
          </div>
          <div className='d-flex'>
            <div className='my-auto'>
              <p>Current Password:</p>
            </div>
            <div className='my-auto'>
              <input
                className='form-input-noline ms-3 c-gray borRad-10'
                type='password'
                placeholder={'***'}
              />
            </div>
          </div>
          <div className='d-flex'>
            <div className='my-auto'>
              <p>New Password:</p>
            </div>
            <div className='my-auto'>
              <input
                className='form-input-noline ms-3 c-gray borRad-10'
                placeholder={user.userPassword}
              />
            </div>
          </div>
          <div className='d-flex'>
            <div className='my-auto'>
              <p>Confirm Password:</p>
            </div>
            <div className='my-auto'>
              <input
                className='form-input-noline ms-3 c-gray borRad-10'
                placeholder={user.userPassword}
              />
            </div>
          </div>
        </div>
      </div>

      <div className='row mt-5'>
        <div className='d-flex'>
          <p className='fs-20 fw-600'>Two Factor Authentification</p>
          <div className='my-auto ms-2'>
            <BiPencil size={20} />
          </div>
        </div>

        <div className='border border-dark borRad-10 p-3 mt-2'>
          <div className='d-flex'>
            <div className='my-auto'>
              <p>Secondary Email:</p>
            </div>
            <div className='my-auto'>
              <input
                className='form-input-noline ms-3 c-gray borRad-10'
                type='text'
                placeholder={user.email}
              />
            </div>
          </div>

          <div className='d-flex'>
            <div className='my-auto'>
              <p>Phone (Text SMS):</p>
            </div>
            <div className='my-auto'>
              <input
                className='form-input-noline ms-3 c-gray borRad-10'
                type='password'
                placeholder={'xxx-xxx-xxxx'}
              />
            </div>
          </div>
        </div>
      </div>

      <div className='row mt-5'>
        <div className='d-flex'>
          <p className='fs-20 fw-600'>Institutional Information:</p>
          <div className='my-auto ms-2'>
            <BiPencil size={20} />
          </div>
        </div>

        <div className='border border-dark borRad-10 p-3 mt-2'>
          <div className='d-flex'>
            <div className='my-auto'>
              <p>Institution Name:</p>
            </div>
            <div className='my-auto'>
              <input
                className='form-input-noline ms-3 c-gray borRad-10'
                type='text'
                placeholder={'xxx-xxx-xxxx'}
              />
            </div>
          </div>

          <div className='d-flex'>
            <div className='my-auto'>
              <p>Business Address:</p>
            </div>
            <div className='my-auto'>
              <input
                className='form-input-noline ms-3 c-gray borRad-10'
                type='text'
                placeholder={'xxx-xxx-xxxx'}
              />
            </div>
          </div>

          <div className='d-flex'>
            <div className='my-auto'>
              <p>Tax Number:</p>
            </div>
            <div className='my-auto'>
              <input
                className='form-input-noline ms-3 c-gray borRad-10'
                type='text'
                placeholder={'xxx-xxx-xxxx'}
              />
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
                <p>Bank Account Number:</p>
              </div>
              <div className='my-auto'>
                <input
                  className='form-input-noline ms-3 c-gray borRad-10'
                  type='text'
                  placeholder={'xxx-xxx-xxxx'}
                />
              </div>
            </div>

            <div className='d-flex'>
              <div className='my-auto'>
                <p>Bank Account Name:</p>
              </div>
              <div className='my-auto'>
                <input
                  className='form-input-noline ms-3 c-gray borRad-10'
                  type='text'
                  placeholder={'xxx-xxx-xxxx'}
                />
              </div>
            </div>

            <div className='d-flex'>
              <div className='my-auto'>
                <p>Instituion Number:</p>
              </div>
              <div className='my-auto'>
                <input
                  className='form-input-noline ms-3 c-gray borRad-10'
                  type='text'
                  placeholder={'xxx-xxx-xxxx'}
                />
              </div>
            </div>

            <div className='d-flex'>
              <div className='my-auto'>
                <p>Transit Number:</p>
              </div>
              <div className='my-auto'>
                <input
                  className='form-input-noline ms-3 c-gray borRad-10'
                  type='text'
                  placeholder={'xxx-xxx-xxxx'}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EducatorAccount;
