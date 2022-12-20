import { Container } from '@mui/material';
import { RegisterByUsername } from 'features/registerByUsername';
import React from 'react';

export const RegisterPage: React.FC = () => (
  <Container
    sx={{
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <RegisterByUsername />
  </Container>
);
