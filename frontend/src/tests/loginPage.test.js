import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import Login from '../Pages/newPages/registration/Login'
import { GoogleOAuthProvider } from '@react-oauth/google';

const mockStore = configureStore([]);

describe('Login Component', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      user: {
        isAuthenticated: false,
      },
    });
  });

  test('renders Login component', () => {
    render(
      <Provider store={store}>
        <GoogleOAuthProvider clientId="client-id"> {}
          <Router>
            <Login />
          </Router>
        </GoogleOAuthProvider>
      </Provider>
    );

    expect(screen.getByText(/Login to your account/i)).toBeInTheDocument();

    // Check if the email input is rendered
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();

    // Check if the password input is rendered
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();

    // Check if the login button is rendered
    expect(screen.getByRole('button', { name: 'Login' })).toBeInTheDocument();

    // Check if the Google login button is rendered
    expect(screen.getByRole('button', { name: /Login with Google/i })).toBeInTheDocument();
  });

 
});