import classNames from 'classnames';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { PortfolioData } from '../../redux/reducers/portfolio/selectors';
import { Coin } from '../../types/Coin';
import { Portfolio } from '../../types/Portfolio';
import { PortfolioLineItem } from '../PortfolioLineItem/PortfolioLineItem';
import './portfolioList.sass'

export const PortfolioList: React.FC = () => {
  const portfolio = useSelector(PortfolioData) || null;

  return (
    <div className="portfolio-list">
      <h2 className="finance__subtitle">
        Assets
      </h2>

      <div className="finance-nav">
        <div className="finance-nav__item finance-nav__item_name">
          Name
        </div>
        <div className="finance-nav__item finance-nav__item_price">
          Price
        </div>
        <div className="finance-nav__item finance-nav__item_profit24">
          24H 
        </div>
        <div className="finance-nav__item finance-nav__item_profitAll">
          Profit/Loss
        </div>
        <div className="finance-nav__item finance-nav__item_avgPrice">
          Avg. Buy Price
        </div>
        <div className="finance-nav__item finance-nav__item_holdings">
          Holdings
        </div>
      </div>
      <div className="portfolio-list__block">
        {portfolio.length > 0 &&
          portfolio.map((item: Portfolio) => (
            <PortfolioLineItem item={item} />
          ))
        }
      </div>
    </div>
  );
};
