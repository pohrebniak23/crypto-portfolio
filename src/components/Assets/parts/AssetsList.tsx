import {
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Box,
} from '@mui/material';
import React from 'react';
import { useAppSelector } from '../../../hooks/redux';
import { Portfolio } from '../../../types/Portfolio';
import { StyledTableCell } from '../../UI/StyledTable';
import { AssetsLineItem } from './AssetsLineItem';

export const AssetsList: React.FC = React.memo(() => {
  const portfolio =
    useAppSelector((state) => state.portfolio.portfolio) || null;

  return (
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
              <AssetsLineItem key={item.id} item={item} />
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
});
