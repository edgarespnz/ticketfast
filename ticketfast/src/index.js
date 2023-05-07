import React from 'react';
import ReactDOM from 'react-dom/client';
import Login from './components/login/SignIn';
import Dashboard from './components/dashboard/Dashboard';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Register from './components/register/Register';
import Product from './components/product/Product';
import Confirmation from './components/confirmation/Confirmation';
import Order from './components/order/Order';
import { Navigate } from 'react-router-dom';


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/dashboard'  element={<Dashboard />} />
        <Route path='/product/:id' element={<Product />} />
        <Route path='/confirmation' element={<Confirmation />} />
        <Route path='/order/:id' element={<Order />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

