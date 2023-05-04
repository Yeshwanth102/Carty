import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import ProductItem from './ProductItem';

describe('ProductItem component', () => {
  const product = {
    img: 'https://example.com/image.png',
    name: 'Test Product',
    price: 19.99,
  };

  test('should render product details', () => {
    const { getByText } = render(<ProductItem product={product} />);
    const name = getByText(product.name);
    const price = getByText(`$${product.price.toFixed(2)}`);

    expect(name).toBeDefined();
    expect(price).toBeDefined();
  });

  test('should open modal when image is pressed', () => {
    const { getByTestId } = render(<ProductItem product={product} />);
    const image = getByTestId('product-image');

    fireEvent.press(image);

    const modal = getByTestId('product-modal');
    expect(modal).toBeDefined();
  });
});
