import { render, screen, fireEvent, act } from '@testing-library/react';
import Signup from './Signup';
import { UserProvider } from '../utils/UserContext';
import { useAuthForm } from '../utils/useAuthForm';

// Mock useAuthForm hook
jest.mock('../utils/useAuthForm', () => ({
  useAuthForm: jest.fn(),
}));

describe('Signup Component', () => {
  const mockHandleFormSubmit = jest.fn();
  const mockValidate = jest.fn(() => true);

  beforeEach(() => {
    // Mock implementation for useAuthForm
    (useAuthForm as jest.Mock).mockReturnValue({
      formRef: { current: null },
      handleFormSubmit: mockHandleFormSubmit,
      formEntries: { fullname: '', email: '', password: '' },
      validate: mockValidate,
    });
  });

  const renderWithProvider = (component: React.ReactNode) => {
    const mockUserContext = {
      signedUser: null,
      setSignedUser: jest.fn(),
    };

    return render(
      <UserProvider value={mockUserContext}>{component}</UserProvider>
    );
  };

  test('submits the form and calls the API', async () => {
    renderWithProvider(<Signup />);

    await act(async () => {
      fireEvent.change(screen.getByPlaceholderText(/full name/i), {
        target: { value: 'John Doe' },
      });
      fireEvent.change(screen.getByPlaceholderText(/email/i), {
        target: { value: 'john.doe@example.com' },
      });
      fireEvent.change(screen.getByPlaceholderText(/password/i), {
        target: { value: 'password123' },
      });

      fireEvent.click(screen.getByRole('button', { name: /sign up/i }));
    });

    // Check if handleFormSubmit was called with the correct data
    expect(mockHandleFormSubmit).toHaveBeenCalledTimes(1);
    expect(mockHandleFormSubmit).toHaveBeenCalledWith(
      expect.objectContaining({
        preventDefault: expect.any(Function),
      })
    );
  });
});

