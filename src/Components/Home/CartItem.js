import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const CartItem = ({ item, handleRemoveItem }) => {
  const { id, name, price, quantity, image } = item;

  // Find all items in the cart with the same ID
  const allItemsWithSameId = cartItems.filter((cartItem) => cartItem.id === id);

  // Calculate the total quantity and price for items with the same ID
  let itemQuantity = 0;
  let itemTotalPrice = 0;
  allItemsWithSameId.forEach(({quantity, price}) => {
    if (quantity && price) {
      itemQuantity += quantity;
      itemTotalPrice += price * quantity;
    }
  });

  return (
    <View key={`${id}`} style={styles.cartItem}>
      <Image source={{ uri: image }} style={styles.itemImage} />
      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>{name}</Text>
        <Text>Price: ${(price).toFixed(2)}</Text>
        <Text>Quantity: {itemQuantity || 0}</Text>
        <TouchableOpacity 
          onPress={() => handleRemoveItem(id)}
          style={styles.removeButton}
        >
        <View style={{alignItems: 'center'}}>
          <Icon name="trash" size={20} color="white" />
          {itemQuantity ? (
            <View style={styles.countBadge}>
              <Text style={styles.countBadgeText}>{itemQuantity}</Text>
            </View>
          ) : null}
        </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CartItem;
