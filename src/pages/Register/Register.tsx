import React from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import { Link } from 'react-router-dom';
import {
  Alert,
  Box,
  Container,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { RegisterAction } from '../../redux/reducers/Auth/ActionCreators';

interface FormValues {
  name: string,
  login: string,
  password: string,
};

export const Register: React.FC = () => {
  const dispatch = useAppDispatch();

  const onSubmit = (values: FormValues) => {
    dispatch(RegisterAction(values.login, values.password));
  };

  const { isLoading, isError } = useAppSelector((state) => state.auth);

  const validationSchema = yup.object().shape({
    name: yup
      .string()
      .min(3, 'Password must be 3 characters or more')
      .required('Required field'),
    login: yup
      .string()
      .typeError('Login field must be a string')
      .min(3, 'Login must be 3 characters or more')
      .required('Required field'),
    password: yup
      .string()
      .min(6, 'Password must be 6 characters or more')
      .required('Required field'),
  });

  return (
    <Container
      sx={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          width: 400,
          backgroundColor: 'secondary.main',
          borderRadius: 4,
          padding: 3,
        }}
      >
        <Typography
          component="h1"
          variant="h5"
          sx={{ mb: 2, textAlign: 'center' }}
        >
          Register
        </Typography>
        <Formik
          initialValues={{
            name: '',
            login: '',
            password: '',
          }}
          validateOnBlur
          onSubmit={(values) => onSubmit(values)}
          validationSchema={validationSchema}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            isValid,
            handleSubmit,
            dirty,
          }) => (
            <Box>
              <TextField
                type="text"
                name="name"
                id="name"
                label="Name"
                fullWidth
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
                error={touched.name && Boolean(errors.name?.length)}
                helperText={touched.name && errors.name}
                sx={{
                  mb: 2,
                  borderRadius: 2,
                }}
              />
              <TextField
                type="login"
                name="login"
                id="login"
                label="Login"
                fullWidth
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.login}
                error={touched.login && Boolean(errors.login?.length)}
                helperText={touched.login && errors.login}
                sx={{
                  mb: 2,
                  borderRadius: 2,
                }}
              />
              <TextField
                type="password"
                name="password"
                id="password"
                label="Password"
                error={touched.password && Boolean(errors.password?.length)}
                fullWidth
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                helperText={touched.password && errors.password}
              />
              <LoadingButton
                type="submit"
                fullWidth
                loading={isLoading}
                variant="contained"
                disabled={!isValid && !dirty}
                onClick={() => handleSubmit()}
                sx={{ mt: 3, borderRadius: 2, padding: 1, fontSize: 14 }}
              >
                Register
              </LoadingButton>
              {isError.length > 0 && (
                <Alert severity="error" sx={{ mt: 2 }}>
                  {isError}
                </Alert>
              )}
            </Box>
          )}
        </Formik>
        <Grid container spacing={2} sx={{ mt: 1.2 }}>
          <Grid item sx={{ fontSize: 14, ml: 'auto' }}>
            <Link to="/login">Have an account? Sign in</Link>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};
