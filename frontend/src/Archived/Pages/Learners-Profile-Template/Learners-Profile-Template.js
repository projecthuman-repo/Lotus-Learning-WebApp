import './Learners-Profile-Template.css';

import Header from '../../../components/Header-Components/Logged-In/Header-Logged-In';
import SideNav from '../../Components/Side-Nav-bar/Side-Nav';

// This is a template Component for the Learns Profile

// It takes a react component to be used and renders it

export default function LearnersProfileTemplate({ childComponent: Child }) {
  return (
    <div className='thePage'>
      {/* <Header /> */}
      <div className='pattyDiv'>
        <div className='sideNav'>
          <SideNav />
        </div>
        <Child />
      </div>
      <div className='footer'></div>
    </div>
  );
}
