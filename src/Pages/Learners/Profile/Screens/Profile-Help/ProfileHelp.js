import React from 'react';
import { AiTwotoneMail } from 'react-icons/ai';
import { BsTelephoneFill } from 'react-icons/bs';
import Searchbar from '../../../../../components/Searchbar/Searchbar';
import FaqDropdown from './FaqDropdown';

const faqList = [
  { question: 'Q: Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
  { question: 'Q: Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
  { question: 'Q: Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
  { question: 'Q: Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
  { question: 'Q: Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
];

const ProfileHelp = () => {
  return (
    <>
      <div className='row justify-content-around bgc-darkGray'>
        <div className='col-sm-8'>
          <div className='mt-6 mb-5 text-center'>
            <p className='fs-30 c-white'>HELP CENTER</p>
          </div>
          <div className='mb-5'>
            <Searchbar />
          </div>
        </div>
        <div className='col-1'></div>
      </div>
      <div className='row px-sm-4 justify-content-center  justify-content-sm-start'>
        <div className='row mb-5'>
          <p className='fs-22 fw-600 mt-5'>Frequently Asked Questions</p>
        </div>
        <div className='row justify-content-between'>
          <div className='col-sm-8'>
            {faqList.map((faq, index) => {
              return <FaqDropdown question={faq.question} key={faq + index} />;
            })}
          </div>
          <div className='col-sm-3 mb-3'>
            <p className='fw-600'>Can't Find An Answer?</p>
            <p className='fs-14 fw-600 mt-3 mb-2'>Contact Us</p>
            <ContactLine
              icon={<AiTwotoneMail size={15} className='c-blue' />}
              text={'email@projecthumancity.com'}
            />
            <ContactLine
              icon={<BsTelephoneFill size={15} className='c-blue' />}
              text={'###-###-####'}
            />

            <p className='fs-14 fw-600 mt-4 mb-2'>Operations</p>
            <ContactLine
              icon={<AiTwotoneMail size={15} className='c-blue' />}
              text={'email@projecthumancity.com'}
            />
            <ContactLine
              icon={<BsTelephoneFill size={15} className='c-blue' />}
              text={'###-###-####'}
            />
          </div>
        </div>
      </div>
    </>
  );
};

const ContactLine = ({ icon, text }) => {
  return (
    <div className='d-flex my-1'>
      {icon}
      <p className='ms-1 fs-12'>{text}</p>
    </div>
  );
};
export default ProfileHelp;
