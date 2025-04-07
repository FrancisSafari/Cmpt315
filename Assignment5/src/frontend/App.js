import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Orders from './components/Orders';

const App = () => (
  <Router>
    <nav>
      <Link to='/'>Dashboard</Link>
      <Link to='/orders'>Orders</Link>
    </nav>
    <Routes>
      <Route path='/' element={<Dashboard />} />
      <Route path='/orders' element={<Orders />} />
    </Routes>
  </Router>
);

export default App;