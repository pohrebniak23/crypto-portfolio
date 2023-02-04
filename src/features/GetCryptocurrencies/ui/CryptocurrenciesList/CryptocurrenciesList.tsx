import {
  Box,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { StyledTableCell } from 'shared/ui/StyledTable/StyledTable';
import { Coin } from 'entities/Coin';
import { CryptocurrenciesItem } from '../CryptocurrenciesItem/CryptocurrenciesItem';

interface CryptocurrenciesListProps {
  cryptocurrencies: Coin[];
}

export const CryptocurrenciesList = ({
  cryptocurrencies,
}: CryptocurrenciesListProps) => (
  <TableContainer component={Box}>
    <Table sx={{ minWidth: 700 }} aria-label="customized table">
      <TableHead sx={{ borderBottom: 'unset' }}>
        <TableRow>
          <StyledTableCell
            sx={{
              borderRadius: '10px 0 0 10px',
              width: '20px',
              maxWidth: '50px',
            }}
          >
            #
          </StyledTableCell>
          <StyledTableCell>Name</StyledTableCell>
          <StyledTableCell>Price</StyledTableCell>
          <StyledTableCell>24h %</StyledTableCell>
          <StyledTableCell>Market Cap</StyledTableCell>
          <StyledTableCell>Circulation supply</StyledTableCell>
          <StyledTableCell sx={{ borderRadius: '0 10px 10px 0' }}>
            Last 7 days
          </StyledTableCell>
        </TableRow>
      </TableHead>

      <TableBody>
        {cryptocurrencies.map((cryptocurrenciesItem: Coin) => (
          <CryptocurrenciesItem
            key={cryptocurrenciesItem.name}
            cryptoItem={cryptocurrenciesItem}
          />
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);
