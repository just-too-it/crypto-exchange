import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  EstimatedExchangeAmountParams,
  MinExchangeAmountParams,
  getEstimatedExchangeAmountAPI,
  getListAvailableCurrenciesAPI,
  getMinExchangeAmountAPI,
} from '../../services/currency/currency.service';
import {
  CurrencyResponse,
  EstimatedExchangeAmountResponse,
  MinExchangeAmountResponse,
} from '../../services/currency/currency.model';

export const getListAvailableCurrencies = createAsyncThunk<CurrencyResponse[]>(
  'currency/getListAvailableCurrencies',
  async (_, thunkAPI) => {
    try {
      const response = await getListAvailableCurrenciesAPI();
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue((error as Error).message);
    }
  }
);

export const getMinExchangeAmount = createAsyncThunk<MinExchangeAmountResponse, MinExchangeAmountParams>(
  'currency/getMinExchangeAmount',
  async (params, thunkAPI) => {
    try {
      const response = await getMinExchangeAmountAPI(params);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const getEstimatedExchangeAmount = createAsyncThunk<
  EstimatedExchangeAmountResponse,
  EstimatedExchangeAmountParams
>('currency/getEstimatedExchangeAmount', async (params, thunkAPI) => {
  try {
    const response = await getEstimatedExchangeAmountAPI(params);
    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});
