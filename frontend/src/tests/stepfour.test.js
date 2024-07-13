import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import StepFour from '../Pages/newPages/createCoursePage/steps/StepFour';

const mockSetNewCourseObj = jest.fn();
const mockSendNewCourse = jest.fn();

const renderComponent = (step, newCourseObj) => {
  return render(
    <MemoryRouter initialEntries={[`/create-new-course/${step}`]}>
      <Routes>
        <Route
          path="/create-new-course/:step"
          element={<StepFour setNewCourseObj={mockSetNewCourseObj} newCourseObj={newCourseObj} sendNewCourse={mockSendNewCourse} />}
        />
      </Routes>
    </MemoryRouter>
  );
};

describe('StepFour component', () => {
  it('renders correctly', () => {
    const newCourseObj = { age: 'Intermediate (13-15)' };
    renderComponent(4, newCourseObj);

    // Check if the main text is rendered
    expect(screen.getByText('Let us make our first impressions')).toBeInTheDocument();
    expect(screen.getByText('This is only temporary, you can change it whenever you want')).toBeInTheDocument();

    // Check if the age text is rendered
    expect(screen.getByText('Intermediate (13-15)')).toBeInTheDocument();

    // Check if the step indicator is rendered
    expect(screen.getByText('4/4')).toBeInTheDocument();

    // Check if the buttons are rendered
    expect(screen.getByText('go Back')).toBeInTheDocument();
    expect(screen.getByText('Finish')).toBeInTheDocument();

    // Check if the ComplexBar is rendered
    const complexityBar = screen.getByRole('slider');
    expect(complexityBar).toBeInTheDocument();
  });
});