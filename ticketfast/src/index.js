import React from 'react';
import ReactDOM from 'react-dom/client';
import Login from './components/login/SignIn';
import Dashboard from './components/dashboard/Dashboard';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Register from './components/register/Register';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
      <Route path='/register' element ={<Register />}/>
        <Route path='/login' element ={<Login />}/>
        <Route path='/dashboard' element ={<Dashboard />}/>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

