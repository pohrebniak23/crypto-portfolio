import { LoadingButton } from '@mui/lab';
import { Alert, Box, Grid, TextField, Typography } from '@mui/material';
import { Formik } from 'formik';
import { useCallback } from 'react';
import { Link } from 'react-router-dom';
import * as yup from 'yup';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { getLoginByUsernameError } from '../model/selectors/getLoginByUsernameError';
import { getLoginByUsernameLoading } from '../model/selectors/getLoginByUsernameLoading';
import { loginByUsernameService } from '../model/services/loginByUsernameService';
import { LoginByUsernameData } from '../model/types/loginByUsernameSchema';

export const LoginByUsername = () => {
  const dispatch = useAppDispatch();

  const isLoading = useAppSelector(getLoginByUsernameLoading);
  const error = useAppSelector(getLoginByUsernameError);

  const onSubmit = useCallback(
    async (values: LoginByUsernameData) => {
      await dispatch(loginByUsernameService(values));
    },
    [dispatch],
  );

  const validationSchema = yup.object().shape({
    username: yup
      .string()
      .typeError('username field must be a string')
      .min(3, 'username must be 3 characters or more')
      .required('Required field'),
    password: yup
      .string()
      .min(6, 'Password must be 6 characters or more')
      .required('Required field'),
  });

  return (
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
        Sign in
      </Typography>
      <Formik
        initialValues={{
          username: '',
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
              type="username"
              name="username"
              id="username"
              label="username"
              fullWidth
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.username}
              error={touched.username && Boolean(errors.username?.length)}
              helperText={touched.username && errors.username}
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
              Sign in
            </LoadingButton>
            {error && error.length > 0 && (
              <Alert severity="error" sx={{ mt: 2 }}>
                {error}
              </Alert>
            )}
          </Box>
        )}
      </Formik>
      <Grid container spacing={2} sx={{ mt: 1.2 }}>
        <Grid item sx={{ fontSize: 14 }}>
          <Link to="/renew-password">Forgot password?</Link>
        </Grid>
        <Grid item sx={{ fontSize: 14, ml: 'auto' }}>
          <Link to="/register">{`Don't have an account? Register`}</Link>
        </Grid>
      </Grid>
    </Box>
  );
};
