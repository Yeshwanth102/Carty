import React, { useState } from "react";
import { TouchableOpacity, View, Image, Text, StyleSheet, Modal } from "react-native";

const ProductItem = ({ product }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleImagePress = () => {
    setModalVisible(true);
  };

  return (
    <TouchableOpacity activeOpacity={0.5}>
      <View style={styles.container}>
        <TouchableOpacity onPress={handleImagePress}>
          <Image source={{ uri: product.img }} style={styles.image} />
        </TouchableOpacity>
        <View style={styles.textContainer}>
          <Text style={styles.name}>{product.name}</Text>
          <Text style={styles.price}>${product.price.toFixed(2)}</Text>
        </View>
        <Modal visible={modalVisible} transparent={true}>
          <TouchableOpacity style={styles.modalContainer} onPress={() => setModalVisible(false)}>
            <Image source={{ uri: product.img }} style={styles.modalImage} />
          </TouchableOpacity>
        </Modal>
      </View>
    </TouchableOpacity>
  );
};


const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    elevation: 2,
    marginVertical: 8,
    marginHorizontal: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  image: {
    alignContent: "center",
    width: 300,
    height: 300,
    resizeMode: "contain",
  },
  textContainer: {
    flex: 0.1,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
    color: "#555"
  },
  price: {
    fontSize: 20,
    fontWeight: "bold",
    color: "green",
  },
  modalContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalImage: {
    width: "90%",
    height: "90%",
    resizeMode: "contain",
    borderRadius: 10,
  },
});

export default ProductItem;
