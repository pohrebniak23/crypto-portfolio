import {
  Paper,
  styled,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Box,
} from '@mui/material';
import React from 'react';
import { useAppSelector } from '../../hooks/redux';
import { Portfolio } from '../../types/Portfolio';
import { PortfolioLineItem } from '../PortfolioLineItem/PortfolioLineItem';
import './portfolioList.sass';

export const PortfolioList: React.FC = () => {
  const { portfolio } = useAppSelector((state) => state.portfolio) || null;

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  return (
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
          <TableHead sx={{borderBottom: 'unset'}}>
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
  );
};
