import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import StepTwo from '../Pages/newPages/createCoursePage/steps/StepTwo';

const mockSetNewCourseObj = jest.fn();

const renderComponent = (step, newCourseObj) => {
  return render(
    <MemoryRouter initialEntries={[`/create-new-course/${step}`]}>
      <Routes>
        <Route path="/create-new-course/:step" element={<StepTwo setNewCourseObj={mockSetNewCourseObj} newCourseObj={newCourseObj} />} />
      </Routes>
    </MemoryRouter>
  );
};

describe('StepTwo component', () => {
  it('renders correctly', () => {
    const newCourseObj = { categories: [] };
    renderComponent(2, newCourseObj);

    
    expect(screen.getByText('What categories does your course have?')).toBeInTheDocument();
    expect(screen.getByText('This is only temporary, you can change it whenever you want')).toBeInTheDocument();
    expect(screen.getByText('Pick your categories')).toBeInTheDocument();
    expect(screen.getByText('1 category minimum 5 maximum.')).toBeInTheDocument();
    expect(screen.getByText('2/4')).toBeInTheDocument();
    expect(screen.getByText('Next')).toBeInTheDocument();
  });
});