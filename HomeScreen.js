import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { DrawerActions } from '@react-navigation/native';

const API_URL = 'https://fakestoreapi.com/products';
const menu = require('./assets/Menu.png');
const logo = require('./assets/Logo.png');
const listImage = require('./assets/list.png');
const filterImage = require('./assets/filter.png');
const shoppingBag = require('./assets/shoppingBag.png');
const search = require('./assets/Search.png');

const HomeScreen = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(API_URL);
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    const loadCart = async () => {
      const cartData = await AsyncStorage.getItem('cart');
      if (cartData) {
        setCart(JSON.parse(cartData));
      }
    };

    fetchProducts();
    loadCart();
  }, []);

  const addToCart = async (product) => {
    const newCart = [...cart, product];
    setCart(newCart);
    await AsyncStorage.setItem('cart', JSON.stringify(newCart));
  };

  const renderProduct = ({ item }) => (
    <TouchableOpacity style={styles.productWrapper} onPress={() => navigation.navigate('ProductDetails', { product: item })}>
      <View style={styles.productImageContainer}>
        <Image source={{ uri: item.image }} style={styles.productImage} />
        <TouchableOpacity style={styles.addIconContainer} onPress={() => addToCart(item)}>
          <Image source={require('./assets/addCircle.png')} style={styles.addIcon} />
          {cart.filter((prod) => prod.id === item.id).length > 0 && (
            <Text style={styles.cartCount}>{cart.filter((prod) => prod.id === item.id).length}</Text>
          )}
        </TouchableOpacity>
      </View>
      <Text style={styles.categoryText}>{item.category}</Text>
      <Text style={styles.productName}>{item.title}</Text>
      <Text style={styles.productPrice}>${item.price}</Text>
      <Text style={styles.productDetails}>{item.description.length > 100 ? `${item.description.substring(0, 100)}...` : item.description}</Text>
    </TouchableOpacity>
  );

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
      
        <View style={styles.searchContainer}>
          <Image source={search} style={styles.searchImage} />
        </View>
      
        <View style={styles.shoppingBagContainer}>
          <Image source={shoppingBag} style={styles.shoppingBagImage} />
        </View>
      </View>

      <View style={styles.secondHeader}>
        <Text style={styles.ourStoryText}>O  U  R    S  T  O  R  Y</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Checkout')}>
          <View style={styles.listContainer}>
            <Image source={listImage} style={styles.contentImage} />
          </View>
        </TouchableOpacity>
        <View style={styles.filterContainer}>
          <Image source={filterImage} style={styles.sortDescendingImage} />
        </View>
      </View>

      <ScrollView listContainerStyle={styles.container}>
        <FlatList
          data={products}
          numColumns={2}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderProduct}
          contentContainerStyle={styles.productGrid}
        />
        <TouchableOpacity style={styles.viewCartButton} onPress={() => navigation.navigate('Cart')}>
          <Text style={styles.viewCartButtonText}>View Cart</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#FFF',
    paddingHorizontal: 16,
    paddingTop: 20,
    marginBottom: 100,
  },
  productGrid: {
    paddingBottom: 20,
  },
  productWrapper: {
    flex: 1,
    borderRadius: 8,
    backgroundColor: '#FFF',
    marginBottom: 16,
    marginRight: 10,
    marginLeft: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 2 },
  },
  productImageContainer: {
    position: 'relative',
    overflow: 'hidden',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  productImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  addIconContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#000',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderTopLeftRadius: 8,
    borderBottomRightRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  addIcon: {
    width: 20,
    height: 20,
    tintColor: '#FFF',
  },
  cartCount: {
    color: '#FFF',
    marginLeft: 5,
    fontWeight: 'bold',
  },
  categoryText: {
    fontSize: 12,
    color: '#666',
    marginTop: 8,
    marginLeft: 8,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginVertical: 8,
    marginLeft: 8,
  },
  productPrice: {
    fontSize: 14,
    color: 'green',
    marginLeft: 8,
  },
  productDetails: {
    fontSize: 12,
    color: '#888',
    marginLeft: 8,
    marginBottom: 8,
  },
  viewCartButton: {
    backgroundColor: '#000',
    paddingVertical: 15,
    alignItems: 'center',
    marginBottom: 20,
    borderRadius: 5,
  },
  viewCartButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
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
    marginLeft: 20,
    width: 79,
    height: 32,
  },
  searchContainer: {
    flex: 1,
    alignItems: 'flex-end',
    marginLeft: -50,
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
  secondHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginRight: 12,
    marginLeft: 10,
    marginBottom: 10,
  },
  ourStoryText: {
    paddingTop: 5,
    fontWeight: 'bold',
    paddingBottom: 5,
    fontSize: 15,
  },
  filterContainer: {
    alignItems: 'center',
    width: 30,
    height: 30,
    borderRadius: 17,
    backgroundColor: '#DCDCDC',
    justifyContent: 'center',
  },
  listContainer: {
    alignItems: 'center',
    width: 30,
    height: 30,
    borderRadius: 17,
    backgroundColor: '#DCDCDC',
    justifyContent: 'center',
    marginLeft: 130,
  },
  filterImage: {
    width: 20,
    height: 20,
  },
});

export default HomeScreen;
