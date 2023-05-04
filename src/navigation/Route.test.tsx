import React from 'react';
import { render } from '@testing-library/react-native';
import { MyStack } from './Routs';

describe('MyStack', () => {
  it('should render the Home component by default', () => {
    const { getByText } = render(<MyStack />);
    expect(getByText('Pretty Little Thing')).toBeTruthy();
  });

  it('should render the Checkout component when navigated to', () => {
    const { getByText, getByTestId } = render(<MyStack />);
    const homeButton = getByText('Pretty Little Thing');
    homeButton.press();
    const checkoutButton = getByTestId('checkout-button');
    checkoutButton.press();
    expect(getByText('Checkout')).toBeTruthy();
  });
});
