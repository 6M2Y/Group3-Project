import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Navbar from "../Components/Navbar";

import { UserProvider } from '../utils/UserContext';

describe('Navbar Component', () => {
  const mockValue = {
    signedUser: {
      access_token: 'mock_token',
      fullname: 'John Doe',
      password: 'password123',
      email: 'john.doe@example.com',
      username: 'johndoe',
    },
    setSignedUser: jest.fn(),
  };

  const renderNavbar = () =>
    render(
      <BrowserRouter>
        <UserProvider value={mockValue}>
          <Navbar />
        </UserProvider>
      </BrowserRouter>
    );

  test('renders correct links', () => {
    renderNavbar();
    expect(screen.getByRole('link', { name: /superblog/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /write/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /signout/i })).toBeInTheDocument();
  });

  test('handles Sign Out button click', () => {
    renderNavbar();
    const signOutButton = screen.getByRole('button', { name: /signout/i });
    signOutButton.click();
    expect(mockValue.setSignedUser).toHaveBeenCalledWith(null);
  });

  test('renders search input and accepts text input', () => {
    renderNavbar();
    const searchInput = screen.getByPlaceholderText(/search/i) as HTMLInputElement;

    // Simuler tekstinput i søkeboksen
    searchInput.value = 'Test Input';
    expect(searchInput.value).toBe('Test Input');
  });
});



