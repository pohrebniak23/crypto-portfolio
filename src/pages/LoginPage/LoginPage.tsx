import { Container } from '@mui/material';
import { LoginByUsername } from 'features/loginByUsername';
import React from 'react';

export const LoginPage: React.FC = () => (
  <Container
    sx={{
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <LoginByUsername />
  </Container>
);
