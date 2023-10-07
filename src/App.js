import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ReactDOM from 'react-dom';

import Login from './components/Login';
import Register from './components/Register';
import HomePage from './components/HomePage';
import ProductList from './components/ProductList';
import Fulldetails from './components/Fulldetails';
import Buynow from './components/Buynow';




function App() {
  return (
    <Router>
    <Routes>
      <Route path="/" element={<HomePage/>} />
    
      <Route path="/clogin" element={<Login/>} />
      <Route path="/register" element={<Register/>} />
      <Route path="/products" element={<ProductList/>} />
      <Route path="/details/:productId" element={<Fulldetails/>} />
      <Route path="/Buy/:productId" element={<Buynow/>} />
      
    
    </Routes>
  </Router>
  );
}

export default App;
