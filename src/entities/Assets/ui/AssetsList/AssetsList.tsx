import {
  Box,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import React from 'react';
import { StyledTableCell } from 'shared/ui/StyledTable/StyledTable';
import { AssetsItem } from '../AssetsItem/AssetsItem';
import { AssetsData } from '../../model/types/AssetsSchema';

interface AssetsListProps {
  assetsList: AssetsData[];
  transactionsToggle: (ticker: string) => void;
}

export const AssetsList = React.memo(({ assetsList, transactionsToggle }: AssetsListProps) => (
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
        {assetsList.map((portfolioItem: AssetsData) => (
          <AssetsItem transactionsToggle={transactionsToggle} key={portfolioItem.id} assetsItem={portfolioItem} />
        ))}
      </TableBody>
    </Table>
  </TableContainer>
));
