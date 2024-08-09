import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from "react-router-dom"; 
import ShopNowAdminContext from './Context/AdminContext/ShopNowAdminContext.jsx';
import ShopNowproductContext from './Context/ProductContext/ShopNowProductContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <ShopNowAdminContext>
      <ShopNowproductContext>
        <App />
      </ShopNowproductContext>
    </ShopNowAdminContext>
  </BrowserRouter> 
)
