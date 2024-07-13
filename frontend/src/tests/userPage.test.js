import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import User from '../Pages/newPages/user/User';

const mockStore = configureStore([]);
const initialState = {
  user: {
    username: 'John Doe',
    email: 'john.doe@example.com',
    profilePic: '',
    accountType: 'Teacher'
  }
};

const renderComponent = (store, initialEntry = '/user/courses') => {
  return render(
    <Provider store={store}>
      <MemoryRouter initialEntries={[initialEntry]}>
        <Routes>
          <Route path="/user/:screen" element={<User />} />
        </Routes>
      </MemoryRouter>
    </Provider>
  );
};

describe('User component', () => {
  it('renders correctly with the initial screen', () => {
    const store = mockStore(initialState);
    renderComponent(store);

    expect(screen.getByText('Courses')).toBeInTheDocument();
    expect(screen.getByText('Explore')).toBeInTheDocument();
    expect(screen.getByText('Notifications')).toBeInTheDocument();
    expect(screen.getByText('Settings')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('john.doe@example.com')).toBeInTheDocument();
    expect(screen.getByText('Teacher')).toBeInTheDocument();
  });
/*
  it('displays the correct screen content based on the URL', () => {
    const store = mockStore(initialState);
    renderComponent(store, '/user/notifications');

    expect(screen.getByText('Notifications')).toBeInTheDocument();
  });
*/
  it('navigates to different screens on button click and highlights active button', () => {
    const store = mockStore(initialState);
    renderComponent(store);

    const coursesButton = screen.getByText('Courses');
    const exploreButton = screen.getByText('Explore');
    const notificationsButton = screen.getByText('Notifications');
    const settingsButton = screen.getByText('Settings');

    // Initially, "Courses" should be highlighted
    expect(coursesButton).toHaveClass('pl-5 bg-stone-50 text-stone-900');;

    // Click "Notifications" and check highlighting
    fireEvent.click(notificationsButton);
    expect(notificationsButton).toHaveClass('pl-5 bg-stone-50 text-stone-900');
    expect(exploreButton).not.toHaveClass('pl-5 bg-stone-50 text-stone-900');

    // Click "Settings" and check highlighting
    fireEvent.click(settingsButton);
    expect(settingsButton).toHaveClass('pl-5 bg-stone-50 text-stone-900');
    expect(notificationsButton).not.toHaveClass('pl-5 bg-stone-50 text-stone-900');
  });
});