import React from 'react'
import { Link, Route, Routes } from 'react-router-dom';
import { Sidebar } from './components/Sidebar/Sidebar';
import { Home } from './pages/Home/Home';
import { Portfolio } from './pages/Portfolio/Portfolio';
import './App.sass';

export const App: React.FC = () => {
  return (
    <div className="app">
      <div className="wrapper">
        <Sidebar />

        <Routes >
          <Route
            path="/"
            element={<Home />}
          />

          <Route
            path="/portfolio"
            element={<Portfolio />}
          />
        </Routes>
      </div>
    </div>
  );
};
