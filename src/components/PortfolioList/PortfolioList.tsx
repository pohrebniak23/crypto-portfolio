import {
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Box,
  Grid,
} from '@mui/material';
import React from 'react';
import { useAppSelector } from '../../hooks/redux';
import { Portfolio } from '../../types/Portfolio';
import { StyledTableCell } from '../Material/StyledTable';
import { PortfolioLineItem } from '../PortfolioLineItem/PortfolioLineItem';

export const PortfolioList: React.FC = () => {
  const { portfolio } = useAppSelector((state) => state.portfolio) || null;

  return (
    <Grid item md={12} lg={12} xl={9}>
      <Paper
        elevation={3}
        sx={{
          width: '100%',
          p: 3,
          backgroundColor: '#fff',
          borderRadius: 4,
          height: 'max-content',
        }}
      >
        <Typography variant="h6" sx={{ mb: 2 }}>
          Assets
        </Typography>

        <TableContainer component={Box}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead sx={{ borderBottom: 'unset' }}>
              <TableRow>
                <StyledTableCell sx={{ borderRadius: '10px 0 0 10px' }}>
                  Name
                </StyledTableCell>
                <StyledTableCell>Price</StyledTableCell>
                <StyledTableCell>24H</StyledTableCell>
                <StyledTableCell>Profit/Loss</StyledTableCell>
                <StyledTableCell>Avg. Buy Price</StyledTableCell>
                <StyledTableCell>Holdings</StyledTableCell>
                <StyledTableCell sx={{ borderRadius: '0 10px 10px 0' }}>
                  Actions
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {portfolio.length > 0 &&
                portfolio.map((item: Portfolio) => (
                  <PortfolioLineItem key={item.id} item={item} />
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Grid>
  );
};
