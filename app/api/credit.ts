import { Axios } from './axios';

const getCredit = async () => {
  const { data } = await Axios.get('/credit/get-credit');
  return data.credit;
};

const getFreeCredit = async () => {
  const { data } = await Axios.get('/credit/get-free-credit');
  return data;
};

const buyCredit = async (data: any) => {
  return await Axios.post('/credit/buy', data);
};

const getTransactionHistory = async () => {
  const { data } = await Axios.get('/credit/transaction-history');
  return data.transactions.docs;
};

export const credit = {
  buyCredit,
  getCredit,
  getFreeCredit,
  getTransactionHistory,
};
