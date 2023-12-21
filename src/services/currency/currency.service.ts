import axios from 'axios';

export interface MinExchangeAmountParams {
  from: string;
  to: string;
}

export interface EstimatedExchangeAmountParams {
  from: string;
  to: string;
  amount: number | null;
}

export const getListAvailableCurrenciesAPI = async () => {
  const response = await axios.get(
    `${process.env.REACT_APP_BASE_URL}/currencies?active=true&fixedRate=true&key=${process.env.REACT_APP_API_KEY}`
  );

  return response;
};

export const getMinExchangeAmountAPI = async (params: MinExchangeAmountParams) => {
  const response = await axios.get(
    `${process.env.REACT_APP_BASE_URL}/min-amount/${params.from}_${params.to}?api_key=${process.env.REACT_APP_API_KEY}`
  );

  return response;
};

export const getEstimatedExchangeAmountAPI = async (params: EstimatedExchangeAmountParams) => {
  const response = await axios.get(
    `${process.env.REACT_APP_BASE_URL}/exchange-amount/${params.amount}/${params.from}_${params.to}?api_key=${process.env.REACT_APP_API_KEY}`
  );

  return response;
};
