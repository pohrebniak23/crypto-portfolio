import { getDatabase, ref, get, child } from 'firebase/database';
import { useEffect } from "react";
import { loadPortfolio, loadTransactions } from '../redux/reducers/Portfolio/PortfolioSlice';
import { useAppDispatch, useAppSelector } from "./redux";

export const useLoadPortfolioData = () => {
  const dispatch = useAppDispatch();
  const portfolio = useAppSelector((state) => state.portfolio.portfolio);

  const { user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      const dbRef = ref(getDatabase());
      get(child(dbRef, `users/${user.id}`))
        .then((snapshot) => {
          if (snapshot.exists()) {
            const data = snapshot.val();

            if (data.portfolio && portfolio.length === 0) {
              dispatch(loadPortfolio(data.portfolio));
            }

            if (data.transactions) {
              dispatch(loadTransactions(data.transactions));
            }
          }
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.error(error);
        });
    }
  }, [user, portfolio.length, dispatch]);
}