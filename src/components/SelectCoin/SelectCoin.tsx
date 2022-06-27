import classNames from "classnames";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BaseEditing, Coins } from "../../redux/reducers/portfolio/selectors";
import { CoinItem } from "./CoinItem";
import { PortfolioAC } from '../../redux/reducers/portfolio/action-creators';
import "./selectCoin.sass";

export const SelectCoin: React.FC = () => {
  const dispatch = useDispatch();
  const coins = useSelector(Coins);
  const baseEditing = useSelector(BaseEditing);
  const [search, setSearch] = useState("");

  const searchHandle = (value: string) => {
    setSearch(value);
  };

  const filteredCoins = coins.filter((coin) =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );

  const closeSarch = () => {
    dispatch(PortfolioAC.editingBase(false));
    dispatch(PortfolioAC.editingQuote(false));
  };

  return (
    <button
      type="button"
      className={classNames(
        'coin-search',
        { 'coin-search_open': baseEditing },
      )}
      onClick={closeSarch}
    >
      <div className="coin-search__block">
        <h1 className="coin-search__title">Select coin</h1>
        <input
          className="coin-search__input"
          type="text"
          placeholder="Search"
          onChange={(e) => searchHandle(e.target.value)}
        />
        <div className="coin-search__list">
          {filteredCoins.map((coin) => (
            <CoinItem
              key={coin.id}
              coin={coin}
            />
          ))}
        </div>
      </div>
    </button>
  );
};
