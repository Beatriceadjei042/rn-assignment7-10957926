import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

const DrawerContent = ({ navigation }) => {
  const navigateToScreen = (screenName) => {
    navigation.navigate(screenName);
  };

  const closeDrawer = () => {
    navigation.closeDrawer(); // Assuming your navigation stack supports closing the drawer this way
  };

  // List of drawer items
  const drawerItems = [
    { id: '1', label: 'Her name' },
    { id: '2', label: 'Home', screen: 'Home'},
    { id: '3', label: 'Cart', screen: 'Cart' },
    { id: '4', label: 'Store' },
    { id: '5', label: 'Blog' },
    { id: '6', label: 'Location' },
    { id: '7', label: 'Jewellery' },
    { id: '8', label: 'Electronics' },
  ];

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.drawerItem} onPress={closeDrawer}>
        <Image source={require('./assets/Close.png')} style={styles.drawerIcon} />
      </TouchableOpacity>
      {drawerItems.map(item => (
        <TouchableOpacity
          key={item.id}
          style={styles.drawerItem}
          onPress={() => item.screen && navigateToScreen(item.screen)}
        >
          {item.icon && <Image source={item.icon} style={styles.drawerIcon} />}
          <Text style={[styles.drawerText, item.label === 'Adjei Beatrice' && styles.underlineText]}>
            {item.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  drawerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    paddingBottom: 10,
  },
  drawerIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  drawerText: {
    fontSize: 18,
    color: '#000',
  },
  underlineText: {
    textDecorationLine: 'underline',
    textDecorationColor: 'red',
  },
});

export default DrawerContent;
