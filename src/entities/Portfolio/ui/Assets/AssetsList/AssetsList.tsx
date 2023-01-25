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
import { Portfolio } from '../../../model/types/PortfolioSchema';
import { AssetsItem } from '../AssetsItem/AssetsItem';

interface AssetsListProps {
  portfolioList: Portfolio[];
}

export const AssetsList = React.memo(
  ({ portfolioList }: AssetsListProps) => (
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
          {portfolioList.length > 0 &&
            portfolioList.map((portfolioItem: Portfolio) => (
              <AssetsItem
                key={portfolioItem.id}
                assetsItem={portfolioItem}
              />
            ))}
        </TableBody>

      </Table>
    </TableContainer>
  ),
);
