import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PortfolioInfo } from "../../components/PortfolioInfo/PortfolioInfo";
import { PortfolioList } from "../../components/PortfolioList/PortfolioList";
import { SelectCoin } from "../../components/SelectCoin/SelectCoin";
import { Tabs } from "../../components/Tabs/Tabs";
import { getCoins } from "../../helpers/portfolio";
import { walletSum } from "../../helpers/portfolioInfo";
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

  const sum = walletSum(coins, portfolio);

  return (
    <div className="finance">
      <div className="finance__content">
        <div className="finance__info">
          <h1 className="finance__title">Portfolio</h1>

          {portfolio.length > 0 && (
            <div className="finance__sum">
              {`Tatal portfolio value: ${sum}`}
            </div>
          )}
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
