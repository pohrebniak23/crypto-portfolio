import classNames from "classnames";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { BaseEditing, Coins } from "../../redux/reducers/portfolio/selectors";
import { CoinItem } from "./CoinItem";
import "./selectCoin.sass";

export const SelectCoin: React.FC = () => {
  const coins = useSelector(Coins);
  const baseEditing = useSelector(BaseEditing);
  const [search, setSearch] = useState("");

  const searchHandle = (value: string) => {
    setSearch(value);
  };

  const filteredCoins = coins.filter((coin) =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div
      className={classNames(
        'finance-search',
        { 'finance-search_open': baseEditing },
      )}
    >
      <h1>Select coin</h1>
      <input
        className="finance-search__input"
        type="text"
        onChange={(e) => searchHandle(e.target.value)}
      />
      <button
        type="button"
        // onClick={() => setSelectOpen(false)}
      >
        Close
      </button>
      <div className="finance-search__list">
        {filteredCoins.map((coin) => {
          return (
            <CoinItem
              // key={coin.id}
              coin={coin}
            />
          );
        })}
      </div>
    </div>
  );
};
