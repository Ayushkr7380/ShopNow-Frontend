# ShopNow Frontend
The frontend of the ShopNow e-commerce platform built with React, Vite, Tailwind CSS, and React Router. This application allows users and admins to interact with product listings, manage carts, view orders, and more.

---

## Tech Stack

**Frontend :**  React, Vite

**Styling :** Tailwind CSS, Material Tailwind

**Routing :** React Router

**State Management :** Context API

**Others :**  Axios (for API requests), React Spinners (for loading states), React Icons (for icons)

---

## Folder Structure

``` txt
ShopNowFrontend/
├── public/                   # Public assets
├── src/                      # Source code
│   ├── Components/           # React components
│   │   ├── AccountPage/      # Account related components
│   │   ├── Admin/            # Admin-related components
│   │   ├── Products/         # Product-related components
│   │   ├── User/             # User-related components
│   │   ├── Wishlist/         # Wishlist components
│   │   ├── Order/            # Order-related components
│   │   ├── Profile/          # User profile components
│   │   ├── AddAddress/       # Address-related components
│   │   └── Payment/          # Payment-related components
│   ├── Context/              # React context for global state management
│   ├── assets/               # Static assets (images, fonts, etc.)
│   ├── App.css               # Global styles
│   ├── App.jsx               # Main app component
│   ├── index.css             # Global styles
│   ├── main.jsx              # Entry point for React app
│   └── index.html            # HTML template
├── .gitignore                # Files to be ignored by Git
├── package.json              # Project metadata and dependencies
├── package-lock.json         # Lock file for dependencies
├── tailwind.config.js        # Tailwind CSS configuration
├── vite.config.js            # Vite configuration
└── postcss.config.js         # PostCSS configuration
```

---
## Features

``` txt
Admin Features

- Add, Edit, and Delete Products
- View Product Listings
- Admin Registration and Login

User Features

- User Registration and Login
- Edit User Profile
- Manage Wishlist
- View, Add, and Update Cart Items
- Manage Address Book
- Place Orders and View Order History
- Search Products

Product Features

- View All Products
- View Product Details
- Filter Products by Categories (Men's, Women's, Kids)
- Search for Products
```

---
## Setup Instructions
```txt
1. Clone and Install

git clone https://github.com/yourusername/shopnowfrontend.git
cd shopnowfrontend
npm install

2. Configure Environment

Create a `.env` file in the root with the following:
REACT_APP_BACKEND_URL=your_backend_url_here

3. Run the Development Server

npm run dev

The frontend will run at: http://localhost:3000
```

---
## API Endpoints

***These routes are connected to the backend via Axios requests:***

**Admin Routes:**
```txt
- POST   /admin/registration      Admin registration
- POST   /admin/login            Admin login
- GET    /admin/dashboard        Admin dashboard (requires authentication)
- POST   /admin/products         Add product (requires authentication)
```

**User Routes:**
```txt
- POST   /auth/userlogin         User login
- POST   /auth/userregistration  User registration
- POST   /user/editprofile       Edit user profile
- GET    /user/profile           Get user profile
- POST   /user/wishlist          Add to wishlist
- GET    /user/wishlist          View wishlist
- POST   /user/addtocart         Add to cart
- GET    /user/cart              View cart
- POST   /user/placeorder        Place an order
```

**Product Routes:**
```txt
- GET    /products               Get all products
- GET    /products/:id           Get single product by ID
- GET    /products/search        Search for products by name
```

---
## Development Scripts

**npm run dev:** Starts the development server using Vite

**npm run build:** Builds the app for production

**npm run lint:** Runs ESLint on all files

**npm run preview:** Previews the production build

---
## Tech Stack

**React -** JavaScript library for building user interfaces.

**Vite -** Fast build tool and development server.

**Tailwind CSS -** Utility-first CSS framework for custom styling.

**React Router -** Routing library for navigating between components.

**Axios - Promise-** based HTTP client for making requests to the backend API.

**Material Tailwind -** A library of Material Design components for React styled with Tailwind CSS.

--- 
## Contribution

Feel free to fork this repository and contribute by submitting a pull request. For major changes, please open an issue first to discuss what you would like to change.

---
## Note
This frontend is developed for learning and demo purposes. Add proper validation, error handling, and production configurations before deploying to production.

---
## License
This project is not licensed for public/commercial use. All rights reserved to the project owner.
