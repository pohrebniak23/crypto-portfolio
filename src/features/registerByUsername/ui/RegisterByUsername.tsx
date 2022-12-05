import { LoadingButton } from '@mui/lab';
import { Alert, Box, Grid, TextField, Typography } from '@mui/material';
import { Formik } from 'formik';
import { useAppDispatch, useAppSelector } from 'shared/hooks/redux';
import { useCallback } from 'react';
import { Link } from 'react-router-dom';
import * as yup from 'yup';
import { getRegisterByUsernameError } from '../model/selectors/getRegisterByUsernameError';
import { getRegisterByUsernameLoading } from '../model/selectors/getRegisterByUsernameLoading';
import { registerByUsernameService } from '../model/services/registerByUsernameService';
import { RegisterByUsernameData } from '../model/types/registerByUsernameSchema';

export const RegisterByUsername = () => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(getRegisterByUsernameLoading);
  const error = useAppSelector(getRegisterByUsernameError);

  const onSubmit = useCallback(
    (values: RegisterByUsernameData) => {
      dispatch(registerByUsernameService(values));
    },
    [dispatch],
  );

  const validationSchema = yup.object().shape({
    name: yup
      .string()
      .min(3, 'Password must be 3 characters or more')
      .required('Required field'),
    username: yup
      .string()
      .typeError('Username field must be a string')
      .min(3, 'Username must be 3 characters or more')
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
        Register
      </Typography>
      <Formik
        initialValues={{
          name: '',
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
              type="username"
              name="username"
              id="username"
              label="Username"
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
              Register
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
        <Grid item sx={{ fontSize: 14, ml: 'auto' }}>
          <Link to="/login">Have an account? Sign in</Link>
        </Grid>
      </Grid>
    </Box>
  );
};
