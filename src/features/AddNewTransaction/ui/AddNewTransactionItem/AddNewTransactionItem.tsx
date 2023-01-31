import { LoadingButton } from '@mui/lab';
import { Box, Button, Input, Switch, Typography } from '@mui/material';
import { Coin } from 'entities/Coin';
import { getUserData } from 'entities/User';
import { AddNewTransactionActions } from 'features/AddNewTransaction';
import { memo, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { priceInputFormatter } from 'shared/helpers/priceInputFormatter';
import { useAppDispatch } from '../../../../shared/hooks/redux';
import { getAddNewTransactionStatus } from '../../model/selectors/getNewTransactionSelector';
import { addTransactionService } from '../../model/services/addTransactionService';
import { updatePortfolioDataService } from '../../model/services/updatePortfolioDataService';

interface AddNewTransactionItemProps {
  transactionType: 'BUY' | 'SELL';
  baseCurrencyCoin: Coin;
  quoteCurrencyCoin: Coin;
}

export const AddNewTransactionItem = memo(
  (props: AddNewTransactionItemProps) => {
    const { transactionType, baseCurrencyCoin, quoteCurrencyCoin } = props;

    const dispatch = useAppDispatch();

    const [buyCount, setBuyCount] = useState<string>('0');
    const [price, setPrice] = useState<string>('0');
    const [isCustomPrice, setIsCustomPrice] = useState<boolean>(false);
    const [customPrice, setCustomPrice] = useState<string>('0');
    const transactionStatus = useSelector(getAddNewTransactionStatus);
    const user = useSelector(getUserData);

    useEffect(() => {
      if (isCustomPrice) {
        setPrice(String((Number(buyCount) * Number(customPrice)).toFixed(3)));
      } else {
        setPrice(String((Number(buyCount) * baseCurrencyCoin.current_price).toFixed(3)));
      }
    }, [baseCurrencyCoin, buyCount, isCustomPrice, customPrice]);

    const customPriceToggle = () => setIsCustomPrice(!isCustomPrice);

    const addTransaction = () => {
      if (user) {
        dispatch(
          updatePortfolioDataService({
            ticker: baseCurrencyCoin.id,
            price: !isCustomPrice
              ? +baseCurrencyCoin.current_price
              : +customPrice,
            count: +buyCount,
            type: transactionType,
          }),
        );

        dispatch(
          addTransactionService({
            userId: user.id,
            date: new Date(),
            ticker: baseCurrencyCoin.id,
            price: !isCustomPrice
              ? +baseCurrencyCoin.current_price
              : +customPrice,
            count: +buyCount,
            type: transactionType,
          }),
        );
      }
    };

    return (
      <Box
        sx={{
          pt: 3,
        }}
      >
        <Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              mb: 2,
            }}
          >
            <Typography
              variant="body2"
              sx={{
                color: '#757575',
                mb: 0.5,
                textAlign: 'center',
              }}
            >
              {`${baseCurrencyCoin.name} price`}
            </Typography>
            <Typography
              variant="h5"
              sx={{
                color: '#000',
                fontWeight: '600',
                textAlign: 'center',
                pb: '4px',
                display: !isCustomPrice ? 'block' : 'none',
              }}
            >
              {`$${baseCurrencyCoin.current_price}`}
            </Typography>
            <Input
              placeholder="0.00"
              sx={{
                py: 0,
                borderRadius: 0,
                fontSize: '24px',
                lineHeight: '100%',
                textAlign: 'center',
                fontWeight: '600',
                borderBottom: '1px solid #000',
                display: isCustomPrice ? 'block' : 'none',
              }}
              inputProps={{
                style: {
                  textAlign: 'center',
                  lineHeight: '100%',
                  paddingTop: 0,
                  paddingBottom: 0,
                },
              }}
              disableUnderline
              value={customPrice}
              onChange={(event) => priceInputFormatter(event, setCustomPrice)}
            />
          </Box>

          <>
            <Typography variant="body2" sx={{ color: '#757575', mb: 1 }}>
              Quantity
            </Typography>
            <Box
              sx={{
                backgroundColor: 'rgba(52, 28, 191, 0.1)',
                display: 'flex',
                alignItems: 'center',
                padding: '6px 8px',
                borderRadius: '10px',
                mb: 2,
              }}
            >
              <Input
                placeholder="0.00"
                sx={{ pl: 0.5 }}
                disableUnderline
                value={buyCount}
                onChange={(event) => priceInputFormatter(event, setBuyCount)}
              />

              <Button
                variant="text"
                sx={{ backgroundColor: 'transparent !important' }}
                onClick={() =>
                  dispatch(AddNewTransactionActions.setBaseEditing(true))
                }
              >
                <img
                  src={baseCurrencyCoin.image}
                  alt={baseCurrencyCoin.name}
                  className="transaction__image"
                  style={{
                    width: '30px',
                    marginRight: '6px',
                  }}
                />
                <Typography
                  variant="body1"
                  sx={{ color: '#000', fontWeight: '600' }}
                >
                  {baseCurrencyCoin.symbol.toUpperCase()}
                </Typography>
              </Button>
            </Box>
          </>

          <>
            <Typography variant="body2" sx={{ color: '#757575', mb: 1 }}>
              Total spent
            </Typography>
            <Box
              sx={{
                backgroundColor: 'rgba(52, 28, 191, 0.1)',
                display: 'flex',
                alignItems: 'center',
                padding: '6px 8px',
                borderRadius: '10px',
                mb: 2,
              }}
            >
              <Input
                placeholder="0.00"
                sx={{ pl: 0.5 }}
                disableUnderline
                disabled
                value={price}
              />

              <Button
                variant="text"
                sx={{ backgroundColor: 'transparent !important' }}
                onClick={() =>
                  dispatch(AddNewTransactionActions.setQuoteEditing(true))
                }
              >
                <img
                  src={quoteCurrencyCoin.image}
                  alt={quoteCurrencyCoin.name}
                  className="transaction__image"
                  style={{
                    width: '30px',
                    marginRight: '6px',
                  }}
                />
                <Typography
                  variant="body1"
                  sx={{ color: '#000', fontWeight: '600' }}
                >
                  {quoteCurrencyCoin.symbol.toUpperCase()}
                </Typography>
              </Button>
            </Box>

            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <Typography variant="body2" sx={{ color: '#757575', mb: 1 }}>
                Custom price
              </Typography>
              <Switch checked={isCustomPrice} onChange={customPriceToggle} />
            </Box>
          </>

          <LoadingButton
            variant="contained"
            loading={transactionStatus === 'loading'}
            onClick={addTransaction}
            sx={{
              mt: 1,
              py: 1,
              width: '100%',
            }}
          >
            Add to portfolio
          </LoadingButton>
        </Box>
      </Box>
    );
  },
);
