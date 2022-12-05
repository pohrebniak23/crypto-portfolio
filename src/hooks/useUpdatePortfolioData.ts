import { getUserData } from 'entity/User/model/selectors/getUserData';
import { getDatabase, ref, set } from 'firebase/database';
import { useEffect } from 'react';
import { useAppSelector } from './redux';

export const useUpdatePortfolioData = () => {
  const portfolio = useAppSelector((state) => state.portfolio.portfolio);
  const transactions = useAppSelector((state) => state.portfolio.transactions);

  const user = useAppSelector(getUserData);

  useEffect(() => {
    if (user && portfolio.length > 0) {
      const db = getDatabase();

      set(ref(db, `users/${user.id}/portfolio`), { ...portfolio });
      set(ref(db, `users/${user.id}/transactions`), { ...transactions.list });
    }
  }, [portfolio, user, transactions.list]);
};
