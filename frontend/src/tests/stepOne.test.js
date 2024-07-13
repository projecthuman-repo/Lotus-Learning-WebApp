import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import StepOne from '../Pages/newPages/createCoursePage/steps/StepOne';

const mockSetNewCourseObj = jest.fn();

const renderComponent = (step) => {
  return render(
    <MemoryRouter initialEntries={[`/create-new-course/${step}`]}>
      <Routes>
        <Route path="/create-new-course/:step" element={<StepOne setNewCourseObj={mockSetNewCourseObj} newCourseObj={{ title: '', description: '' }} />} />
      </Routes>
    </MemoryRouter>
  );
};

describe('StepOne component', () => {
  it('renders correctly', () => {
    renderComponent(1);

    expect(screen.getByText('our first impressions')).toBeInTheDocument();
    expect(screen.getByText('This is only temporary, you can change it whenever you want')).toBeInTheDocument();
    expect(screen.getByLabelText('Title')).toBeInTheDocument();
    expect(screen.getByLabelText('Description')).toBeInTheDocument();
    expect(screen.getByText('1/4')).toBeInTheDocument();
    expect(screen.getByText('Next')).toBeInTheDocument();
  });
});