import React, { useEffect, useState } from "react";
import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import ProductItem from "./ProductItem";

export default function Home({ navigation }) {
  const [cart, setCart] = useState([]);
  const [checkoutItems, setCheckoutItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    fetch("https://my-json-server.typicode.com/benirvingplt/products/products")
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);
        setCart(data);
        setCheckoutItems(data)
      })
      .catch((error) => {
        setError(true);
        console.error(error);
      });
  }, []);

  useEffect(() => {
    let price = 0;
    let quantity = 0;

    checkoutItems?.forEach(({ price: itemPrice, quantity: itemQuantity }) => {
      if (itemPrice && itemQuantity) {
        price += itemPrice * itemQuantity;
        quantity += itemQuantity;
      }
    });

    setTotalPrice(price);
    setTotalQuantity(quantity);
  }, [checkoutItems]);

  const handleAddToCart = (product) => {
    const cartItem = {
      id: product.id,
      img: product.img,
      name: product.name,
      price: product.price,
      quantity: 1,
    };

    // Check if the item already exists in cart
    const existingCartItemIndex = checkoutItems.findIndex(
      (item) => item.id === product.id
    );

    if (existingCartItemIndex !== -1) {
      // Item already exists in cart - update quantity and price
      const existingCartItem = checkoutItems[existingCartItemIndex];
      const updatedCartItem = {
        ...existingCartItem,
        quantity: (existingCartItem?.quantity || 0) + 1,
        // price: product.price,
      };
      const updatedCart = [...checkoutItems];
      updatedCart[existingCartItemIndex] = updatedCartItem;
      setCheckoutItems(updatedCart);
    } else {
      // Item does not exist in cart - add it
      setCheckoutItems([...checkoutItems, cartItem]);
    }

    // Update the total quantity and price
    setTotalQuantity(totalQuantity + 1);
    setTotalPrice(totalPrice + product.price);
  };

  const handleRemoveItem = (items) => {
    setCheckoutItems(items);
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <ProductItem product={item} />
      <TouchableOpacity
        style={styles.button}
        onPress={() => handleAddToCart(item)}
      >
        <Text style={styles.cart}>Add to Cart</Text>
      </TouchableOpacity>
    </View>
  );

  const navigateToCart = () => {
    navigation.navigate("Checkout", {
      cart: [...checkoutItems.filter(item => !!item?.quantity)],
      totalQuantity,
      totalPrice,
      callback: handleRemoveItem,
    });
  };

  if (loading) {
    <View style={styles.container}>
      <Text>Loading...</Text>
    </View>;
  }

  if (error) {
    <View style={styles.container}>
      <Text>Error in loading data</Text>
    </View>;
  }

  if (!!cart?.length) {
    <View style={styles.container}>
      <Text>No Items available</Text>
    </View>;
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={navigateToCart}>
        <Ionicons
          name="cart-outline"
          size={30}
          color="black"
          style={styles.iconSize}
        />
        <View style={styles.cartImage}>
          <Text style={styles.quantityText}>{totalQuantity}</Text>
        </View>
      </TouchableOpacity>
      <FlatList
        data={cart}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    marginTop: 10,
    paddingVertical: 30,
    paddingHorizontal: 30,
    borderRadius: 5,
    backgroundColor: "pink",
  },
  quantityText: { color: "black", fontWeight: "bold" },
  iconSize: { marginRight: 10 },
  cart: { color: "black", fontSize: 20, fontWeight: "bold" },
  itemContainer: { marginBottom: 20 },
  cartImage: {
    position: "absolute",
    backgroundColor: "pink",
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
    top: 0,
    right: 0,
  },
});
