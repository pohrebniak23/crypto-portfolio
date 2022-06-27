import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Coins } from '../../redux/reducers/portfolio/selectors';
import { Coin } from '../../types/Coin';
import { Portfolio } from '../../types/Portfolio';

type Props = {
  item: Portfolio;
};

export const PortfolioLineItem: React.FC<Props> = ({ item }) => {
  const { id, buyPrice, coinCount } = item;
  const coins = useSelector(Coins);
  const [coinData, setCoinData] = useState<Coin | null>(null);

  useEffect(() => {
    const data = coins.find((coin: Coin) => coin.id === id) || null;

    setCoinData(data);
  }, [coins, id]);

  return (
    <div className="coinLineItem">
      {coinData !== null && (
        <div className="portfolio-list__item" key={item.id}>
          <div className="portfolio-list__name">
            <img
              className="portfolio-list__name-image"
              src={coinData.image}
              alt=""
            />
            <div className="portfolio-list__name-column">
              <div className="portfolio-list__name-ticker">
                {coinData.symbol.toUpperCase()}
              </div>
              <div className="portfolio-list__name-text">{coinData.name}</div>
            </div>
          </div>

          <div className="portfolio-list__price">{coinData.current_price}$</div>

          <div className="portfolio-list__24h">
            <div
              className={classNames(
                'portfolio-list__24h-change',
                {
                  'portfolio-list__24h-change_green':
                    coinData.price_change_percentage_24h > 0,
                },
                {
                  'portfolio-list__24h-change_red':
                    coinData.price_change_percentage_24h < 0,
                },
              )}
            >
              {coinData.price_change_percentage_24h.toFixed(2)}%
            </div>
          </div>

          <div
            className={
              coinData.current_price * coinCount - buyPrice * coinCount > 0
                ? 'portfolio-list__profitAll portfolio-list__profitAll_green'
                : 'portfolio-list__profitAll portfolio-list__profitAll_red'
            }
          >
            {(
              coinData.current_price * coinCount -
              buyPrice * coinCount
            ).toFixed(2)}
            $
          </div>

          <div className="portfolio-list__avgPrice">{buyPrice.toFixed(2)}$</div>

          <div className="portfolio-list__holdings">
            <div className="portfolio-list__holdings_sum">
              $ {(coinCount * coinData.current_price).toLocaleString()}
            </div>
            <div className="portfolio-list__holdings_symbol">
              {coinCount} {coinData.symbol.toUpperCase()}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
