import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import Home from './Home';

declare const jest: any;

const mockData = [
  {
    id: 1,
    img: "https://via.placeholder.com/150",
    name: "Test Product 1",
    price: 10,
    quantity: 0,
  },
  {
    id: 2,
    img: "https://via.placeholder.com/150",
    name: "Test Product 2",
    price: 20,
    quantity: 0,
  },
];

describe("<Home />", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders loading screen when loading", () => {
    const { getByText } = render(<Home navigation={jest.fn()} />);
    expect(getByText("Loading...")).toBeDefined();
  });

  it("renders no items available message when there is an error or no items", () => {
    const { getByText } = render(<Home navigation={jest.fn()} error />);
    expect(getByText("No Items available")).toBeDefined();
  });

  it("renders product list when loaded successfully", () => {
    const { getByLabelText } = render(
      <Home navigation={jest.fn()} cart={mockData} />
    );
    expect(getByLabelText("product-list")).toBeDefined();
  });

  it("increments item quantity when add to cart button is pressed", () => {
    const handleAddToCart = jest.fn();
    const { getByTestId } = render(
      <Home navigation={jest.fn()} cart={mockData} handleAddToCart={handleAddToCart} />
    );

    fireEvent.press(getByTestId("add-to-cart-button-1"));

    expect(handleAddToCart).toHaveBeenCalledTimes(1);
    expect(handleAddToCart).toHaveBeenCalledWith(mockData[0]);
  });

  it("navigates to cart screen when cart icon is pressed", () => {
    const navigate = jest.fn();
    const { getByTestId } = render(<Home navigation={{ navigate }} />);

    fireEvent.press(getByTestId("cart-icon"));

    expect(navigate).toHaveBeenCalledTimes(1);
    expect(navigate).toHaveBeenCalledWith("Checkout", expect.any(Object));
  });
});
