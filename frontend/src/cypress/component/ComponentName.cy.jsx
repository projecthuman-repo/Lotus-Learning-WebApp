 // StepOne.cy.jsx
import React from 'react';
import { mount } from '@cypress/react18';
import { BrowserRouter as Router } from 'react-router-dom';
import StepOne from 'C:/Users/User/Documents/Lotus-Learning-WebApp/frontend/src/Pages/newPages/createCoursePage/steps/StepOne';
import StepTwo from '../../src/Pages/newPages/createCoursePage/steps/StepTwo';
import "C:/Users/User/Documents/Lotus-Learning-WebApp/frontend/src/App.css";

describe('StepOne Component', () => {
  const newCourseObj = { title: '', description: '' };
  const setNewCourseObj = (newObj) => {
    Object.assign(newCourseObj, newObj);
  };

  const mountComponent = () => {
    mount(
      <Router>
        <StepOne newCourseObj={newCourseObj} setNewCourseObj={setNewCourseObj} />
      </Router>
    );
  };

  it('should display the initial UI correctly', () => {
    mountComponent();
    cy.get('p.font-semibold.text-3xl').should('contain', 'our first impressions');
    cy.get('input#title').should('exist');
    cy.get('textarea#title').should('exist');
    cy.get('button').contains('Next').should('have.class', 'text-stone-500');
  });

  describe('StepTwo Component', () => {
    const newCourseObj = { categories: [] };
    const setNewCourseObj = (newObj) => {
      Object.assign(newCourseObj, newObj);
    };
  
    const mountComponent = () => {
      mount(
        <Router>
          <StepTwo newCourseObj={newCourseObj} setNewCourseObj={setNewCourseObj} />
        </Router>
      );
    };
  
    it('should render without crashing', () => {
      mountComponent();
      cy.get('p.font-semibold.text-3xl').should('contain', 'What categories does your course have?');
    
      cy.get('button').contains('go Back').should('exist');
      cy.get('button').contains('Next').should('exist');
      cy.get('div.p-2.border').should('contain', 'Pick your categories');
      cy.get('p.text-xs.font-ligth.text-stone-400').should('contain', '1 category minimum 5 maximum.');
    });
    });

});