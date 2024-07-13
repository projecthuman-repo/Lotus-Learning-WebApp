import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import GeneralNavbar from '../components/navbar/GeneralNavbar';

const mockStore = configureStore([]);
const initialState = { user: { username: 'John Doe', profilePic: '' } };

const renderComponent = (store) => {
  return render(
    <Provider store={store}>
      <MemoryRouter>
        <GeneralNavbar />
      </MemoryRouter>
    </Provider>
  );
};

describe('GeneralNavbar component', () => {
  it('renders correctly when user is not logged in', () => {
    const store = mockStore({ user: null });
    renderComponent(store);

    expect(screen.getByPlaceholderText('Search')).toBeInTheDocument();
    expect(screen.getByText('Create an account')).toBeInTheDocument();
    expect(screen.getByText('Sign In')).toBeInTheDocument();
  });

  it('renders correctly when user is logged in', () => {
    const store = mockStore(initialState);
    renderComponent(store);

    expect(screen.getByPlaceholderText('Search')).toBeInTheDocument();
    expect(screen.queryByText('Create an account')).not.toBeInTheDocument();
    expect(screen.queryByText('Sign In')).not.toBeInTheDocument();
    expect(screen.getByText('JD')).toBeInTheDocument(); // Initials generated from username "John Doe"
  });

});