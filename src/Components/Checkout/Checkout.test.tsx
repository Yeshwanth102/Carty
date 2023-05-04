import React from 'react';
import { shallow } from 'enzyme';
import Checkout from './Checkout';

describe('Checkout component', () => {
  const mockRouteParams = {
    params: {
      cart: [
        {
          id: 1,
          name: 'Product 1',
          price: 9.99,
          quantity: 2,
          totalPrice: 19.98,
          image: 'https//example.com/product1.jpg'
        }
      ],
    },
  };
  
  it('renders without crashing', () => {
    shallow(<Checkout route={mockRouteParams} />);
  });

  it('displays the correct total price', () => {
    const wrapper = shallow(<Checkout route={mockRouteParams} />);
    const totalPriceText = wrapper.find({ testID: 'totalPrice' }).text();
    expect(totalPriceText).toEqual('$19.98');
  });

  it('displays the correct total quantity', () => {
    const wrapper = shallow(<Checkout route={mockRouteParams} />);
    const totalQuantityText = wrapper.find({ testID: 'totalQuantity' }).text();
    expect(totalQuantityText).toEqual('2');
  });

  it('calls the callback function when an item is removed', () => {
    const mockCallback = jest.fn();
    const wrapper = shallow(<Checkout route={mockRouteParams} />);
    const removeButton = wrapper.find({ testID: 'removeButton' });
    removeButton.simulate('press');
    expect(mockCallback).toHaveBeenCalledWith([]);
  });
});
