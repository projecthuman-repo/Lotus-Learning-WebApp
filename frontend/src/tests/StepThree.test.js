import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import StepThree from '../Pages/newPages/createCoursePage/steps/StepThree';

const mockSetNewCourseObj = jest.fn();

const renderComponent = (step, newCourseObj) => {
  return render(
    <MemoryRouter initialEntries={[`/create-new-course/${step}`]}>
      <Routes>
        <Route path="/create-new-course/:step" element={<StepThree setNewCourseObj={mockSetNewCourseObj} newCourseObj={newCourseObj} />} />
      </Routes>
    </MemoryRouter>
  );
};

describe('StepThree component', () => {
  it('renders correctly', () => {
    const newCourseObj = { objectives: { one: '', two: '', three: '' } };
    renderComponent(3, newCourseObj);

    expect(screen.getByText('Define where you will take your learners with this course.')).toBeInTheDocument();
    expect(screen.getByText('This is only temporary, you can change it whenever you want')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Objective one')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Objective two')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Objective three')).toBeInTheDocument();
    expect(screen.getByText('3/4')).toBeInTheDocument();
    expect(screen.getByText('Next')).toBeInTheDocument();
  });
});