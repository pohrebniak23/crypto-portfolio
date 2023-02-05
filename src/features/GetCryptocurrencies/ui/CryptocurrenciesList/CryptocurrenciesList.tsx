import {
  Box,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { Coin } from 'entities/Coin';
import { useCallback, useLayoutEffect, useRef, useState } from 'react';
import { StyledTableCell } from 'shared/ui/StyledTable/StyledTable';
import { CryptocurrenciesItem } from '../CryptocurrenciesItem/CryptocurrenciesItem';

interface CryptocurrenciesListProps {
  cryptocurrencies: Coin[];
  infiniteScrollCallback: () => void;
  isLoading: boolean;
  isFetching: boolean;
}

export const CryptocurrenciesList = ({
  cryptocurrencies,
  infiniteScrollCallback,
  isLoading,
  isFetching,
}: CryptocurrenciesListProps) => {
  const tableEl = useRef<any>();
  const [distanceBottom, setDistanceBottom] = useState(0);
  const [hasMore] = useState(true);

  const scrollListener = useCallback(() => {
    const bottom = tableEl.current.scrollHeight - tableEl.current.clientHeight;
    // if you want to change distanceBottom every time new data is loaded
    // don't use the if statement
    if (!distanceBottom) {
      // calculate distanceBottom that works for you
      setDistanceBottom(Math.round(bottom * 0.2))
    }
    if (tableEl.current.scrollTop > bottom - distanceBottom && hasMore && !isLoading && !isFetching) {
      infiniteScrollCallback()
    }
  }, [hasMore, infiniteScrollCallback, isLoading, isFetching, distanceBottom])
  useLayoutEffect(() => {
    const tableRef = tableEl.current
    tableRef.addEventListener('scroll', scrollListener)
    return () => {
      tableRef.removeEventListener('scroll', scrollListener)
    }
  }, [scrollListener])

  return (
    <TableContainer
      component={Box}
      style={{ maxWidth: '100%', margin: 'auto', maxHeight: '700px' }}
      ref={tableEl}
    >
      <Table sx={{ minWidth: 700 }} stickyHeader aria-label="customized table">
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

        <TableBody
          sx={{
            width: '100%',
            overflowY: 'scroll',
          }}
          id="scrollableDiv"
        >
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
};
