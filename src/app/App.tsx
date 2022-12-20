import { Grid } from '@mui/material';
import { UserActions } from 'entities/User';
import { getUserInited } from 'entities/User/model/selectors/getUserInited';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../shared/hooks/redux';
import './App.sass';
import { AppRouter } from './providers/AppRouter';

const App = () => {
  const dispatch = useAppDispatch();
  const userInited = useSelector(getUserInited);

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
        {userInited && <AppRouter />}
      </Grid>
    </div>
  );
};

export default App;
