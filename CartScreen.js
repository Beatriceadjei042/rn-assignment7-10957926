import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused, DrawerActions } from '@react-navigation/native'; // Import DrawerActions

const logo = require('./assets/Logo.png');
const menu = require('./assets/Menu.png');
const shoppingBag = require('./assets/shoppingBag.png');
const search = require('./assets/Search.png');

const CartScreen = ({ navigation }) => {
  const [cart, setCart] = useState([]);
  const isFocused = useIsFocused();

  const verifyUniqueIds = (cart) => {
    const idMap = {};
    cart.forEach((item) => {
      if (idMap[item.id]) {
        console.warn(`Duplicate key found: ${item.id}`);
      }
      idMap[item.id] = true;
    });
  };

  useEffect(() => {
    const loadCart = async () => {
      try {
        const cartData = await AsyncStorage.getItem('cart');
        if (cartData) {
          const parsedCart = JSON.parse(cartData);
          // Check for duplicate IDs
          const uniqueCart = parsedCart.filter((item, index, self) =>
            index === self.findIndex((t) => t.id === item.id)
          );
          verifyUniqueIds(uniqueCart); // Verify IDs
          setCart(uniqueCart);
        }
      } catch (error) {
        console.error('Error loading cart:', error);
      }
    };

    if (isFocused) {
      loadCart();
    }
  }, [isFocused]);

  useEffect(() => {
    const saveCart = async () => {
      try {
        await AsyncStorage.setItem('cart', JSON.stringify(cart));
      } catch (error) {
        console.error('Error saving cart:', error);
      }
    };

    saveCart();
  }, [cart]);

  const removeFromCart = async (product) => {
    const newCart = cart.filter((item) => item.id !== product.id);
    setCart(newCart);
  };

  const addToCart = async (product) => {
    const updatedCart = [...cart, product];
    setCart(updatedCart);
  };

  const handleNavigateToCheckout = () => {
    navigation.navigate('Checkout');
  };

  const renderCartItem = ({ item }) => (
    <View key={item.id.toString()} style={styles.cartItemContainer}>
      <Image source={{ uri: item.image }} style={styles.cartItemImage} />
      <View style={styles.cartItemDetails}>
        <Text style={styles.productText}>{item.category}</Text>
        <Text style={styles.productName}>{item.title}</Text>
        <Text style={styles.productPrice}>${item.price.toFixed(2)}</Text>
        <Text style={styles.productDetails}>
          {item.description.length > 100 ? `${item.description.substring(0, 100)}...` : item.description}
        </Text>
      </View>
      <TouchableOpacity style={styles.removeIconContainer} onPress={() => removeFromCart(item)}>
        <Image source={require('./assets/remove.png')} style={styles.removeIcon} />
      </TouchableOpacity>
    </View>
  );

  const calculateTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price, 0).toFixed(2);
  };

  return (
    <View style={styles.container}>
      <View style={styles.topHeader}>
        <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
          <View style={styles.menuContainer}>
            <Image source={menu} style={styles.menuImage} />
          </View>
        </TouchableOpacity>
        <View style={styles.logoContainer}>
          <Image source={logo} style={styles.logoImage} />
        </View>
      
      </View>

      <View style={styles.headingWrapper}>
        <Text style={styles.heading}>C A R T</Text>
        <View style={styles.separatorWrapper}>
          <View style={styles.separator} />
          <View style={styles.diamond} />
          <View style={styles.separator} />
        </View>
      </View>

      <FlatList
        data={cart}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderCartItem}
        style={styles.cartList}
        ListFooterComponent={
          <View style={styles.footer}>
            <Text style={styles.totalText}>Total Price:</Text>
            <Text style={styles.totalAmount}>${calculateTotalPrice()}</Text>
          </View>
        }
      />
      <TouchableOpacity style={styles.checkoutButton} onPress={handleNavigateToCheckout}>
        <Text style={styles.checkoutButtonText}>CHECKOUT</Text>
        <Image source={require('./assets/shoppingBag.png')} style={styles.checkoutIcon} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  navigateIcon: {
    width: 24,
    height: 24,
    tintColor: '#000',
    marginBottom: 16,
  },
  checkoutimage: {
    width: 25,
    height: 27,
    marginTop: 16,
    marginBottom: 16,
  },
  cartList: {
    paddingBottom: 20,
  },
  cartItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#DDD',
    paddingBottom: 10,
  },
  cartItemImage: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
    marginRight: 10,
  },
  cartItemDetails: {
    flex: 1,
  },
  productText: {
    fontSize: 12,
    color: '#666',
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  productPrice: {
    fontSize: 14,
    color: 'green',
    marginBottom: 8,
  },
  productDetails: {
    fontSize: 12,
    color: '#888',
    marginBottom: 8,
  },
  removeIconContainer: {
    padding: 10,
    backgroundColor: '#FF6347',
    borderRadius: 5,
  },
  removeIcon: {
    width: 20,
    height: 20,
    tintColor: '#FFF',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#DDD',
    paddingTop: 10,
    paddingBottom: 20,
  },
  totalText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  totalAmount: {
    fontSize: 18,
    color: 'green',
    fontWeight: 'bold',
  },
  checkoutButton: {
    backgroundColor: '#000',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    borderRadius: 5,
    marginTop: 20,
  },
  checkoutButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 10,
  },
  checkoutIcon: {
    width: 20,
    height: 20,
    tintColor: '#FFF',
  },
  heading: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
    color: '#BEBCDE',
  },
  topHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 10,
    marginBottom: 12,
  },
  logoContainer: {
    flex: 2,
    alignItems: 'center',
    width: 79,
    height: 32,
    marginLeft: 100,
  },
  searchContainer: {
    flex: 1,
    alignItems: 'flex-end',
    marginRight: 5,
  },
  logoImage: {
    width: 79,
    height: 32,
  },
  searchImage: {
    width: 30,
    height: 30,
  },
  headingWrapper: {
    alignItems: 'center',
    marginBottom: 20,
  },
  separatorWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 1,
  },
  separator: {
    borderBottomWidth: 0.225,
    width: '10%',
    textAlign: 'center',
  },
  diamond: {
    width: 7.5,
    height: 7.5,
    borderWidth: 0.5,
    backgroundColor: 'white',
    transform: [{ rotate: '45deg' }],
  },

  topHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 8,
    paddingBottom: 10,
    marginBottom: 12,
    marginRight: 10,
    marginLeft: 10,
  },
  menuContainer: {
    flex: 1,
  },
  logoContainer: {
    flex: 2,
    alignItems: 'center',
    marginLeft: 50,
    width: 79,
    height: 32,
  },
  searchContainer: {
    flex: 1,
    alignItems: 'flex-end',
    marginLeftt: -50,
  },
  shoppingBagContainer: {
    flex: 1,
    alignItems: 'flex-end',
    marginLeft: -25,
  },
  menuImage: {
    width: 30,
    height: 30,
  },
  logoImage: {
    width: 79,
    height: 32,
  },
  searchImage: {
    width: 30,
    height: 30,
  },
  shoppingBagImage: {
    width: 30,
    height: 30,
  },

  homeIcon: {
    width: 30,
    height: 30,
  },

  cartIcon: {
    width: 30,
    height: 30,
  },

  cartIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 150,
  },

  homeIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: -130,
  },
});

export default CartScreen;
