import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PortfolioAC } from '../../redux/reducers/portfolio/action-creators';
import { BaseEditing, QuoteEditing } from '../../redux/reducers/portfolio/selectors';
import { Coin } from '../../types/Coin';
import './selectCoin.sass';

type Props = {
  coin: Coin
}

export const CoinItem: React.FC<Props> = ({coin}) => {

  const {id, name, image, symbol} = coin;
  const baseEditing = useSelector(BaseEditing);
  const quoteEditing = useSelector(QuoteEditing);

  const dispatch = useDispatch();

  const changeSelected = (id: string) => {
    if (baseEditing) {
      dispatch(PortfolioAC.changeBaseCurr(id));
      dispatch(PortfolioAC.editingBase(false));
    }

    if (quoteEditing) {
      dispatch(PortfolioAC.changeQuoteCurr(id));
      dispatch(PortfolioAC.editingQuote(false));
    }
  }

  return (
    <>
      {coin && (
        <div
          className="coin"
          onClick={() => {changeSelected(id)}}
        >
            <img className="coin__image" src={image} alt="" />
            <span className="coin__name">
                {name}
            </span>
            <p className="coin__symbol">
                {symbol}
            </p>
            {/* <p className="coin__price">
                ${current_price.toLocaleString()}
            </p>
            <p className={priceChange > 0 ? "coin__change-percent coin__change-percent_green" : "coin__change-percent coin__change-percent_red"}>
                {(priceChange*100/currentPrice).toFixed(2)}%
            </p>
            <p className="coin__market-cap">
                Cap: ${marketCap.toLocaleString()}
            </p>
            <IoIosAddCircle className="coin__add" onClick={() => {changeCoinOnSidebar(name)}} /> */}
            
        </div>
      )}
    </>
  )
}
