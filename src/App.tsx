import React from 'react'
// import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { PrivateRoute } from './router/PrivateRoute';
import { PublicRoute } from './router/PublicRoute';
// import { isAuth } from './redux/reducers/auth/selectors';
import { Home } from './pages/Home/Home';
import { Portfolio } from './pages/Portfolio/Portfolio';
import { Login } from './pages/Login/Login';
import './App.sass';

const App: React.FC = () => {
  // const auth = useSelector(isAuth);
  const auth = true;

  return (
    <div className="app">
      <div className="wrapper">

        <Routes >
          <Route
            path="/"
            element={<PrivateRoute isAuth={auth} component={Home} />}
          />

          <Route
            path="/login"
            element={<PublicRoute isAuth={auth} component={Login} />}
          />

          <Route
            path="/portfolio"
            element={<PrivateRoute isAuth={auth} component={Portfolio} />}
          />
        </Routes>
      </div>
    </div>
  );
};

export default App;