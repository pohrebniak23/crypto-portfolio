import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { PrivateRoute } from './router/PrivateRoute';
import { PublicRoute } from './router/PublicRoute';
import { Home } from './pages/Home/Home';
import { Portfolio } from './pages/Portfolio/Portfolio';
import { Register } from './pages/Register/Register';
import { Login } from './pages/Login/Login';
import './App.sass';

const App: React.FC = () => (
  <div className="app">
    <div className="wrapper">
      <Routes>
        <Route path="/" element={<PrivateRoute component={Home} />} />

        <Route path="/login" element={<PublicRoute component={Login} />} />

        <Route
          path="/register"
          element={<PublicRoute component={Register} />}
        />

        <Route
          path="/portfolio"
          element={<PrivateRoute component={Portfolio} />}
        />
      </Routes>
    </div>
  </div>
);

export default App;
