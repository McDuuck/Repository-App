import { render, screen, fireEvent, waitFor } from '@testing-library/react-native'
import { SignInContainer } from "../components/SignInContainer";
import React from 'react';

describe('SignIn', () => {
    describe('SignInContainer', () => {
        it('calls onSubmit function with correct arguments when a valid form is submitted', async () => {
            const onSubmit = jest.fn();
            render(<SignInContainer onSubmit={onSubmit} />);

            fireEvent.changeText(screen.getByTestId('username'), 'kalle');
            fireEvent.changeText(screen.getByTestId('password'), 'password');
            fireEvent.press(screen.getByText('Sign in'));

            await waitFor(() => {
                expect(onSubmit).toHaveBeenCalledTimes(1);

                expect(onSubmit.mock.calls[0][0]).toEqual({
                    username: 'kalle',
                    password: 'password',
                });
            });
        });
    });
});
