import React from "react";
import { allTimeProfit, GainerLooser, topGainerLooser } from "../../helpers/portfolioInfo";
import { Coin } from "../../types/Coin";
import { Portfolio } from "../../types/Portfolio";
import "./portfolioInfo.sass";

type Props = {
  sum: number | string;
  coins: Coin[] | null;
  portfolio: Portfolio[];
};

export const PortfolioInfo: React.FC<Props> = ({ sum, coins, portfolio }) => {
  const profit = allTimeProfit(coins, portfolio);
  const gainer: GainerLooser | null = topGainerLooser(coins, portfolio, 'gainer');
  const looser: GainerLooser | null = topGainerLooser(coins, portfolio, 'looser');

  console.log(gainer);

  return (
    <div className="portfolio-info">
      <div className="portfolio-info__block">
        <div className="portfolio-info__balance">
          <h3 className="portfolio-info__title">
            Сумма портфеля / изменения за 24ч.
          </h3>
          <div className={`portfolio-info__sum`}>{sum.toLocaleString()}$</div>
          <div
            className={
              profit > 0
                ? `portfolio-info__profit_right portfolio-info__profit_right_green`
                : `portfolio-info__profit_right portfolio-info__profit_right_red`
            }
          >
            <span className={"portfolio-info__profit_green"}>
              {profit.toFixed(2)}$
            </span>
            <span>{((profit * 100) / +sum).toFixed(2)}%</span>
          </div>
        </div>

        {gainer !== null && (
          <div className="portfolio-info__coins">
            <div className="portfolio-info__line">
              <h3 className="portfolio-info__title">Top gainer</h3>
              {/* <h3 className="portfolio-info__title">
                    Изменения за 24ч.
                  </h3> */}
            </div>
            <div className={`portfolio-info__line portfolio-info__gainer`}>
              <div className="portfolio-info__line-item">
                <img
                  className="portfolio-info__line-image"
                  src={gainer.coin.image}
                  alt=""
                />
                <div className="portfolio-info__line-column">
                  <div className="portfolio-info__line-ticker">
                    {gainer.coin.symbol.toUpperCase()}
                  </div>
                  <div className="portfolio-info__line-text">
                    {gainer.coin.name}
                  </div>
                </div>
              </div>
              <div className="portfolio-info__line-column portfolio-info__line-column-end portfolio-info__gainer_green">
                <span>{gainer.profit.toFixed(2)}$</span>
                <span className="portfolio-info__gainer_percent">
                  {gainer.percent.toFixed(2)}%
                </span>
              </div>
            </div>
          </div>
        )}

        {looser !== null && (
          <div className="portfolio-info__coins">
            <div className="portfolio-info__line">
              <h3 className="portfolio-info__title">Top looser</h3>
            </div>
            <div className={'portfolio-info__line portfolio-info__loser'} >
                  <div className="portfolio-info__line-item">
                    <img
                      className="portfolio-info__line-image"
                      src={looser.coin.image}
                      alt=""
                    />
                    <div className="portfolio-info__line-column">
                      <div className="portfolio-info__line-ticker">
                        {looser.coin.symbol.toUpperCase()}
                      </div>
                      <div className="portfolio-info__line-text">
                        {looser.coin.name}
                      </div>
                    </div>
                  </div>
                  <div className="portfolio-info__line-column portfolio-info__line-column-end portfolio-info__loser_red">
                    <span>{looser.profit.toFixed(2)}$</span>
                    <span className="portfolio-info__loser_percent">
                      {looser.percent.toFixed(2)}%
                    </span>
                  </div>
                </div>
          </div>
        )}
      </div>
    </div>
  );
};
