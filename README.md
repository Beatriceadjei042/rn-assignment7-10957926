 Mobile App README

 Description
This mobile app project is designed to showcase a product listing and cart management system. It allows users to view available products from an external API, preview product details, add products to their cart, remove products from their cart, and view items currently in their cart. The app utilizes local storage to persist selected items locally on the device.

 Features
- HomeScreen:** Displays a list of available products fetched from an external API.
- ProductDetailScreen:** Provides detailed information about each product.
- CartScreen:** Shows selected items currently in the user's cart.
- Drawer Component/Navigation Menu:** Accessible through swipe gesture or button for easy navigation.
- Add to Cart Button:** Allows users to add products to their cart.
- Remove from Cart Button:** Enables users to remove selected items from their cart.
- Asynchronous Operations:** Manages API calls using `fetch` or `axios` with `async/await` or promises.
- Local Storage:** Uses AsyncStorage, SecureStore, or FileSystem to store selected items locally on the device.

 Functionality
Users are able to:
- View a list of available products fetched from an external API.
- Preview detailed information about each product.
- Add products to their cart.
- Remove products from their cart.
- View the items currently in their cart.

Technology Stack
- React Native for cross-platform mobile app development.
- JavaScript/TypeScript for programming.
- AsyncStorage, SecureStore, or FileSystem for local storage.
- Fetch or Axios for API data fetching.
- UI Components for navigation, product listing, and cart management.

 Installation and Setup
1. Clone the repository.
2. Install dependencies using `npm install`.
3. Run the app on a simulator or device using `npm start` or `expo start`.

## Project Structure
```
project-root/

── assets/         # Contains app assets such as images, fonts, etc.
── components/     # UI components like ProductList, ProductDetail, Cart, etc.
── screens/        # Screen components like HomeScreen, ProductDetailScreen, CartScreen, etc.
── services/       # Contains API service files for fetching data.
── README.md       # This file, providing project overview, setup instructions, and usage details.
