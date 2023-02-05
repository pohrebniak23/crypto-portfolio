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
import { Loader } from 'shared/ui/Loader/Loader';
import {
  StyledTableCell,
  StyledTableRow,
} from 'shared/ui/StyledTable/StyledTable';
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
  const tableEl = useRef<any>(null);
  const [distanceBottom, setDistanceBottom] = useState(0);

  const scrollListener = useCallback(() => {
    const bottom = tableEl.current.scrollHeight - tableEl.current.clientHeight;
    if (!distanceBottom) {
      setDistanceBottom(Math.round(bottom * 0.2));
    }

    if (
      tableEl.current.scrollTop > bottom - distanceBottom &&
      !isLoading &&
      !isFetching
    ) {
      infiniteScrollCallback();
    }
  }, [infiniteScrollCallback, isLoading, isFetching, distanceBottom]);

  useLayoutEffect(() => {
    const tableRef = tableEl.current;
    tableRef.addEventListener('scroll', scrollListener);
    return () => {
      tableRef.removeEventListener('scroll', scrollListener);
    };
  }, [scrollListener]);

  return (
    <TableContainer
      component={Box}
      style={{
        maxWidth: '100%',
        margin: 'auto',
        maxHeight: 'calc(100vh - 166px)',
      }}
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

          <StyledTableRow
            sx={{ border: 'none', backgroundColor: 'unset !important' }}
          >
            <StyledTableCell
              colSpan={7}
              sx={{ position: 'relative', height: '80px' }}
            >
              <Loader />
            </StyledTableCell>
          </StyledTableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};
