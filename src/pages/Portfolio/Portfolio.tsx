import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PortfolioInfo } from "../../components/PortfolioInfo/PortfolioInfo";
import { PortfolioList } from "../../components/PortfolioList/PortfolioList";
import { SelectCoin } from "../../components/SelectCoin/SelectCoin";
import { Tabs } from "../../components/Tabs/Tabs";
import { getCoins } from "../../helpers/portfolio";
import { walletSum } from "../../helpers/portfolioInfo";
import { useInterval } from "../../hooks/useInterval";
import { PortfolioAC } from "../../redux/reducers/portfolio/action-creators";
import { PortfolioData } from "../../redux/reducers/portfolio/selectors";
import { Coin } from "../../types/Coin";
import "./portfolio.sass";

export const Portfolio: React.FC = () => {
  const dispatch = useDispatch();
  const portfolio = useSelector(PortfolioData);
  const [coins, setCoins] = useState<Coin[] | null>(null);

  useEffect(() => {
    getCoins()
      .then((data: any) => {
        dispatch(PortfolioAC.setCoins(data.data));
        setCoins(data.data);
      });
  }, [dispatch]);

  useInterval(() => {
    getCoins()
      .then((data: any) => {
        dispatch(PortfolioAC.setCoins(data.data));
        setCoins(data.data);
      });
  }, 15000);

  const sum = walletSum(coins, portfolio);

  return (
    <div className="finance">
      <div className="finance__content">
        <div className="finance__info">
          <h1 className="finance__title">Dashboard</h1>
          <h2 className="finance__subtitle">
            An overview of cryptocurrencies and markets
          </h2>
        </div>

        {portfolio.length > 0 ? (
          <div className="finance__assets">
            <PortfolioInfo
              sum={sum}
              coins={coins}
              portfolio={portfolio}
            />
            <PortfolioList />
          </div>
        ) : (
          <div className="finance__empty">
            Your portfolio is empty
          </div>
        )}
      </div>

      <SelectCoin />

      <div className="finance-sidebar">
          <div className="finance-sidebar__tab">
            <Tabs />
          </div>
        </div>
    </div>
  );
};
