import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import CartItem from './CartItem';

describe('CartItem component', () => {
  const item = {
    id: 1,
    name: 'Test Item',
    price: 9.99,
    quantity: 2,
    image: 'https://example.com/image.png',
  };

  const cartItems = [
    {
      id: 1,
      name: 'Test Item',
      price: 9.99,
      quantity: 2,
      image: 'https://example.com/image.png',
    },
    {
      id: 2,
      name: 'Another Item',
      price: 12.99,
      quantity: 1,
      image: 'https://example.com/another-image.png',
    },
  ];

  const handleRemoveItemMock = jest.fn();

  afterEach(() => {
    handleRemoveItemMock.mockClear();
  });

  test('should display item details and total price', () => {
    const { getByText } = render(
      <CartItem item={item} cartItems={cartItems} handleRemoveItem={handleRemoveItemMock} />
    );

    const itemName = getByText(item.name);
    expect(itemName).toBeDefined();

    const itemPrice = getByText(`Price: $${item.price.toFixed(2)}`);
    expect(itemPrice).toBeDefined();

    const itemQuantity = getByText(`Quantity: ${item.quantity}`);
    expect(itemQuantity).toBeDefined();

    const totalPrice = getByText(`Total Price: $${(item.price * item.quantity).toFixed(2)}`);
    expect(totalPrice).toBeDefined();
  });

  test('should call handleRemoveItem when user removes an item', () => {
    const { getByTestId } = render(
      <CartItem item={item} cartItems={cartItems} handleRemoveItem={handleRemoveItemMock} />
    );

    const removeButton = getByTestId('remove-button');
    fireEvent.press(removeButton);

    expect(handleRemoveItemMock).toHaveBeenCalledWith(item.id);
  });
});
