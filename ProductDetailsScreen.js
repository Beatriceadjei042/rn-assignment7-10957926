import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DrawerActions } from '@react-navigation/native';

const menu = require('./assets/Menu.png');
const logo = require('./assets/Logo.png');
const listImage = require('./assets/list.png');
const filterImage = require('./assets/filter.png');
const shoppingBag = require('./assets/shoppingBag.png');
const search = require('./assets/Search.png');

const ProductDetailsScreen = ({ route, navigation }) => {
  const { product } = route.params;

  const addToCart = async (product) => {
    const cartData = await AsyncStorage.getItem('cart');
    let cart = [];
    if (cartData) {
      cart = JSON.parse(cartData);
    }
    cart.push(product);
    await AsyncStorage.setItem('cart', JSON.stringify(cart));
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
            <Image source={listImage} style={styles.listImage} />
          </View>
        </TouchableOpacity>
        <View style={styles.filterContainer}>
          <Image source={filterImage} style={styles.filterImage} />
        </View>
      </View>
      
      <ScrollView>
        <View style={styles.productDetailsContainer}>
          <Image source={{ uri: product.image }} style={styles.productDetailsImage} />
          <View style={styles.productDetailsTextContainer}>
            <Text style={styles.productDetailsName}>{product.title}</Text>
            <Image source={require('./assets/Export.png')} style={styles.exportIcon} />
          </View>
          <Text style={styles.productDetailsDescription}>{product.description}</Text>
          <Text style={styles.productDetailsPrice}>${product.price}</Text>
          <Text style={styles.materialTitle}>MATERIALS</Text>
          <Text style={styles.materialDescription}>
            We work with monitoring programs to ensure compliance with safety, health, and quality standards for our products.
          </Text>
          <View style={styles.instructionsContainer}>
            <Text style={styles.instructionText}><Image source={require('./assets/Do Not Bleach.png')} style={styles.icon} /> Do not bleach</Text>
            <Text style={styles.instructionText}><Image source={require('./assets/Do Not Tumble Dry.png')} style={styles.icon} /> Do not tumble dry</Text>
            <Text style={styles.instructionText}><Image source={require('./assets/Do Not Wash.png')} style={styles.icon} /> Dry clean with tetrachloroethylene</Text>
            <Text style={styles.instructionText}><Image source={require('./assets/Iron Low Temperature.png')} style={styles.icon} /> Iron at a maximum of 110°C/230°F</Text>
          </View>
          <View style={styles.borderLine} />
          <View style={styles.shippingInfoContainer}>
            <Image source={require('./assets/Shipping.png')} style={styles.shippingInfoIcon} />
            <Text style={styles.shippingInfoText}>Free Flat Rate Shipping</Text>
            <Image source={require('./assets/Up.png')} style={styles.upIcon} />
          </View>
          <Text style={styles.deliveryEstimate}>Estimated to be delivered on</Text>
          <Text style={styles.deliveryDates}>09/11/2023 - 14/11/2023</Text>
          <TouchableOpacity style={styles.addToCartButton} onPress={() => addToCart(product)}>
            <Text style={styles.addToCartButtonText}>Add to Cart</Text>
            <Image source={require('./assets/Heart.png')} style={styles.heartIcon} />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  navigateIcon: {
    width: 24,
    height: 24,
    marginTop: 20,
    marginLeft: 20,
  },
  productDetailsContainer: {
    padding: 20,
  },
  productDetailsImage: {
    width: '100%',
    height: 300,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  productDetailsTextContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  productDetailsName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  exportIcon: {
    width: 24,
    height: 24,
  },
  productDetailsDescription: {
    fontSize: 18,
    color: '#000',
    marginBottom: 20,
  },
  productDetailsPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'red',
    marginBottom: 20,
  },
  materialTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
  },
  materialDescription: {
    fontSize: 16,
    color: '#000',
    marginBottom: 20,
  },
  instructionsContainer: {
    marginBottom: 20,
  },
  instructionText: {
    flexDirection: 'row',
    alignItems: 'center',
    fontSize: 16,
    color: '#000',
    marginBottom: 10,
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  borderLine: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 20,
  },
  shippingInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  shippingInfoIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  shippingInfoText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginLeft: -3,
  },
  upIcon: {
    marginLeft: 'auto',
    width: 24,
    height: 24,
  },
  deliveryEstimate: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
  },
  deliveryDates: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 20,
  },
  addToCartButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#000',
    padding: 15,
    borderRadius: 5,
    justifyContent: 'center',
  },
  addToCartButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 10,
  },
  heartIcon: {
    width: 24,
    height: 24,

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
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#FFF',
  },
  ourStoryText: {
    fontSize: 16,
    fontWeight: 'bold',
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
    marginLeft: 120,
  },
  listImage: {
    width: 15,
    height: 15,
 
  },
  filterImage: {
    width: 20,
    height: 20,

  },
});

export default ProductDetailsScreen;