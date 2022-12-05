import { Grid } from '@mui/material';
import { UserActions } from 'entities/User';
import { getUserInited } from 'entities/User/model/selectors/getUserInited';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import './App.sass';
import { useAppDispatch } from '../shared/hooks/redux';
import { Home } from '../pages/Home/Home';
import { Login } from '../pages/Login/Login';
import { Portfolio } from '../pages/Portfolio/Portfolio';
import { Register } from '../pages/Register/Register';
import { PrivateRoute } from '../router/PrivateRoute';
import { PublicRoute } from '../router/PublicRoute';

const App = () => {
  const dispatch = useAppDispatch();
  const inited = useSelector(getUserInited);

  useEffect(() => {
    dispatch(UserActions.initAuthData());
  }, [dispatch]);

  return (
    <div className="app">
      <Grid
        sx={{
          backgroundColor: 'common.darkPurple',
          p: 1,
          display: 'flex',
        }}
      >
        {inited && (
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
        )}
      </Grid>
    </div>
  );
};

export default App;
