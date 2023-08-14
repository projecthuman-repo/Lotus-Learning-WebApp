import React from 'react';
import './profileAccount.css';
import { BiPencil } from 'react-icons/bi';

const ProfileAccount = () => {
  const user = JSON.parse(window.sessionStorage.getItem('user'));

  return (
    <div className='px-5'>
      <div className='row my-5'>
        <div className='col-sm-4'>
          <img
            src={user.userProfilePic}
            alt='ProfilePic'
            width={200}
            height={200}
          />
        </div>
        <div className='col-sm-8 mt-3 mt-sm-5'>
          <p className='fs-22 fw-600'>{user.userFullName}</p>
          <p className='fs-16'>Student/Learner</p>
          <div className='row mt-4'>
            <div className='col-6'>
              <p className='fs-14'>
                <span className='fw-600'>Email:</span>
                {user.userEmail}
              </p>
              <p className='fs-14'>
                <span className='fw-600'>Password:</span>
                {user.userPassword}
              </p>
              <p className='fs-14'>
                <span className='fw-600'>Phone Number:</span>
                {user.userPhoneNum}
              </p>
            </div>
            <div className='col-6'>
              <p className='fs-14'>
                <span className='fw-600'>Country:</span>
                {user.userCountry}
              </p>
              <p className='fs-14'>
                <span className='fw-600'>Province:</span>
                {user.userProvince}
              </p>
              <p className='fs-14'>
                <span className='fw-600'>City:</span>
                {user.userCity}
              </p>
            </div>
          </div>
        </div>
      </div>

      <hr className='profileHomeHR' />

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
          <p className='fs-20 fw-600'>Password Settings</p>
          <div className='my-auto ms-2'>
            <BiPencil size={20} />
          </div>
        </div>
        <div className='border border-dark borRad-10 p-3 mt-2'>
          <div className='d-flex'>
            <div className='my-auto'>
              <p>Change Password:</p>
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
        <p className='fs-20 fw-600'>Preferences</p>

        <div className='border border-dark borRad-10 p-3 mt-2'>
          <div className='d-flex'>
            <div className='my-auto'>
              <p>Language</p>
            </div>
            <div className='my-auto ms-auto w-50'>
              {/* <input
                className='form-input-noline ms-3 c-gray borRad-10'
                placeholder={user.userEmail}
              /> */}
              <select className='form-select language-selection bor-blue c-darkBlue'>
                <option selected value='english'>
                  English (US)
                </option>
                <option value='french'>French</option>
                <option value='spanish'>Spanish</option>
                <option value='Mandarin'>Mandarin</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className='row mt-5'>
        <p className='fs-20 fw-600'>Notification Settings</p>

        <div className='border notiBorder borRad-10 bgc-lightBlue p-3 mt-2'>
          <div className='d-flex'>
            <div className='my-auto'>
              <p className='c-darkBlue'>Learning Reminders</p>
            </div>
            <div className='my-auto ms-auto'>
              {/* <input
                className='form-input-noline ms-3 c-gray borRad-10'
                placeholder={user.userEmail}
              /> */}
              <div className='form-check form-switch'>
                <input
                  className='form-check-input'
                  type='checkbox'
                  style={{ height: '20px' }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className='border notiBorder borRad-10 p-3 mt-3'>
          <div className='d-flex'>
            <div className='my-auto'>
              <p className='c-darkBlue'>Set Reminder Time</p>
            </div>
            <div className='my-auto ms-auto'>
              {/* <input
                className='form-input-noline ms-3 c-gray borRad-10'
                placeholder={user.userEmail}
              /> */}
              <select className='form-select language-selection bor-blue c-darkBlue'>
                <option selected value='10:00pm'>
                  10:00pm
                </option>
                <option value='11:00pm'>11:00pm</option>
                <option value='12:00am'>12:00am</option>
                <option value='01:00am'>01:00am</option>
              </select>
            </div>
          </div>
        </div>

        <div className='border notiBorder borRad-10 bgc-lightBlue p-3 mt-3'>
          <div className='d-flex'>
            <div className='my-auto'>
              <p className='c-darkBlue'>Email Notifications</p>
            </div>
            <div className='my-auto ms-auto'>
              {/* <input
                className='form-input-noline ms-3 c-gray borRad-10'
                placeholder={user.userEmail}
              /> */}
              <div className='form-check form-switch'>
                <input
                  className='form-check-input'
                  type='checkbox'
                  style={{ height: '20px' }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className='border notiBorder borRad-10 bgc-lightBlue p-3 mt-3'>
          <div className='d-flex'>
            <div className='my-auto'>
              <p className='c-darkBlue'>Sound Effects</p>
            </div>
            <div className='my-auto ms-auto'>
              {/* <input
                className='form-input-noline ms-3 c-gray borRad-10'
                placeholder={user.userEmail}
              /> */}
              <div className='form-check form-switch'>
                <input
                  className='form-check-input'
                  type='checkbox'
                  style={{ height: '20px' }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className='border notiBorder borRad-10 p-3 my-3'>
          <div className='d-flex'>
            <div className='my-auto'>
              <p className='c-darkBlue'>News and Announcements</p>
            </div>
            <div className='my-auto ms-auto'>
              {/* <input
                className='form-input-noline ms-3 c-gray borRad-10'
                placeholder={user.userEmail}
              /> */}
              <div className='form-check form-switch'>
                <input
                  className='form-check-input'
                  type='checkbox'
                  style={{ height: '20px' }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileAccount;
