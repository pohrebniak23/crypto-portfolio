import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDatabase, ref, set } from "firebase/database";

import { PortfolioAC } from "../../redux/reducers/portfolio/action-creators";
import { BaseCurr, Coins, PortfolioData, QuoteCurr } from "../../redux/reducers/portfolio/selectors";
import { Coin } from "../../types/Coin";
import { userData } from "../../redux/reducers/auth/selectors";


enum changedCurr {
  BASE = 'BASE',
  QUOTE = 'QUOTE',
}

export const BuyCrypto: React.FC = () => {
  const dispatch = useDispatch();
  const user = useSelector(userData);
  const data = useSelector(PortfolioData);

  const coins = useSelector(Coins);
  const baseCurr = useSelector(BaseCurr);
  const quoteCurr = useSelector(QuoteCurr);

  const [buyCount, setBuyCount] = useState<number>(1);
  const [price, setPrice] = useState<number>(1);
  const [isCustomPrice, setIsCustomPrice] = useState<boolean>(false);

  const [baseObj, setBaseOjb] = useState<Coin | null>(null);
  const [quoteObj, setQuoteOjb] = useState<Coin | null>(null);

  useEffect(() => {
    const base = coins.find(coin => coin.id === baseCurr) || null;
    const quote = coins.find(coin => coin.id === quoteCurr) || null

    setBaseOjb(base);
    setQuoteOjb(quote);
  }, [coins, baseCurr, quoteCurr]);

  useEffect(() => {
    if (baseObj && quoteObj) {
      setPrice(+(buyCount * baseObj.current_price).toFixed(3))
    }
  }, [baseObj, quoteObj, buyCount, isCustomPrice]);

  useEffect(() => {
    if (user && data.length > 0) {
      const db = getDatabase();
      set(ref(db, `users/${user.id}`), {data});
    }
  }, [data])

  const selectNewCoin = (changed: changedCurr) => {
    if (changed === changedCurr.BASE) {
      dispatch(PortfolioAC.editingBase(true))
    }

    if (changed === changedCurr.QUOTE) {
      dispatch(PortfolioAC.editingQuote(true))
    }
  };

  const addToPortfolio = () => {
    if (baseObj && quoteObj) {
      const addedObj = {
        id: baseObj.id,
        buyPrice: !isCustomPrice ? +baseObj.current_price : +price,
        coinCount: buyCount,
      }

      dispatch(PortfolioAC.addToPortfolio(addedObj))
    }
  };

  return (
    <div className="tabcontent__item">
      {coins.length > 0 && (
        <div className="transaction__block">

          {baseObj !== null && quoteObj !== null && (
            <div className="transaction__price">
              <label htmlFor="quantity" className="transaction__label">
                {`${baseObj.name} price`}
              </label>
              <div className="transaction__priceValue">
                {`$${baseObj.current_price}`}
              </div>
            </div>
          )}
          
          {baseObj !== null && (
            <>
              <label htmlFor="quantity" className="transaction__label">
                Quantity
              </label>
              <div className="transaction__row transaction__buy-line">
                <input
                  id="quantity"
                  type="text"
                  className="transaction__input"
                  value={buyCount}
                  onChange={(e: any) => setBuyCount(e.target.value)}
                />
                <button
                  type="button"
                  className="transaction__coin"
                  onClick={() => selectNewCoin(changedCurr.BASE)}
                >
                  <img
                    src={baseObj.image}
                    alt=""
                    className="transaction__image"
                  />
                  <div className="transaction__name">
                    {baseObj.symbol.toUpperCase()}
                  </div>
                </button>
              </div>
            </>
          )}

          {quoteObj !== null && (
            <>
              <label htmlFor="quantity" className="transaction__label">
                Total spent
              </label>
              <div className="transaction__row" >
                <input
                  id="price"
                  type="text"
                  className="transaction__input"
                  disabled={!isCustomPrice}
                  value={price}
                  onChange={(e) => setPrice(+e.target.value)}
                />
                <div className="transaction__coin">
                  <img
                    src={quoteObj.image}
                    alt=""
                    className="transaction__image"
                  />
                  <div className="transaction__name">
                    {quoteObj.symbol.toUpperCase()}
                  </div>
                </div>
              </div>

              <div className="transaction__switch">
                <label htmlFor="check" className="transaction__switch-label">Custom price</label>
                <label className="transaction__switch-block">
                  <input type="checkbox" checked={isCustomPrice} onChange={() => setIsCustomPrice(!isCustomPrice)}/>
                </label>
              </div>
            </>
          )}

          <button
            type="button"
            className="transaction__add"
            onClick={addToPortfolio}
          >
            Add to portfolio
          </button>
        </div>
      )}
    </div>
  );
};
