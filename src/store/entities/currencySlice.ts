import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import {
  CurrencyResponse,
  EstimatedExchangeAmountResponse,
  MinExchangeAmountResponse,
} from 'services/currency/currency.model';
import {
  getEstimatedExchangeAmount,
  getListAvailableCurrencies,
  getMinExchangeAmount,
} from 'store/action-creators/currency';

export interface CryptoExchangeState {
  status: 'loading' | 'success' | 'error';
  listAvailableCurrencies: CurrencyResponse[];
  currencyFrom: CurrencyResponse;
  currencyTo: CurrencyResponse;
  minExchangeAmount: number | null;
  estimatedExchangeAmount: number | null;
  errorMessage: string;
}

const initialState: CryptoExchangeState = {
  status: 'loading',
  listAvailableCurrencies: [],
  currencyFrom: {
    featured: true,
    hasExternalId: false,
    image: 'https://content-api.changenow.io/uploads/btc_1_527dc9ec3c.svg',
    isFiat: false,
    isStable: false,
    name: 'Bitcoin',
    supportsFixedRate: true,
    ticker: 'btc',
  },
  currencyTo: {
    featured: true,
    hasExternalId: false,
    image: 'https://content-api.changenow.io/uploads/eth_f4ebb54ec0.svg',
    isFiat: false,
    isStable: false,
    name: 'Ethereum',
    supportsFixedRate: true,
    ticker: 'eth',
  },
  minExchangeAmount: 0,
  estimatedExchangeAmount: null,
  errorMessage: '',
};

export const currencySlice = createSlice({
  name: 'currency',
  initialState,
  reducers: {
    setCurrencyFrom(state, action: PayloadAction<CurrencyResponse>) {
      state.currencyFrom = action.payload;
    },
    setCurrencyTo(state, action: PayloadAction<CurrencyResponse>) {
      state.currencyTo = action.payload;
    },
    setMinExchangeAmount(state, action: PayloadAction<number>) {
      state.minExchangeAmount = action.payload;
    },
  },
  extraReducers: (builder) => {
    // List of available currencies
    builder.addCase(getListAvailableCurrencies.fulfilled, (state, action: PayloadAction<CurrencyResponse[]>) => {
      state.status = 'success';
      state.listAvailableCurrencies = action.payload;
    });
    builder.addCase(getListAvailableCurrencies.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(getListAvailableCurrencies.rejected, (state, action: PayloadAction<any>) => {
      state.status = 'error';
    });

    // Minimal exchange amount
    builder.addCase(getMinExchangeAmount.fulfilled, (state, action: PayloadAction<MinExchangeAmountResponse>) => {
      state.status = 'success';
      if (action.payload.minAmount === null) {
        state.errorMessage = 'This pair is disabled now';
        state.minExchangeAmount = null;
      } else {
        state.minExchangeAmount = action.payload.minAmount;
      }
    });
    builder.addCase(getMinExchangeAmount.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(getMinExchangeAmount.rejected, (state, action: PayloadAction<any>) => {
      state.status = 'error';
      state.estimatedExchangeAmount = null;
      state.errorMessage = action.payload.message || action.payload.error;
    });

    // Estimated exchange amount
    builder.addCase(
      getEstimatedExchangeAmount.fulfilled,
      (state, action: PayloadAction<EstimatedExchangeAmountResponse>) => {
        state.status = 'success';
        if (action.payload.estimatedAmount === null) {
          state.errorMessage = 'This pair is disabled now';
          state.estimatedExchangeAmount = null;
        } else {
          state.estimatedExchangeAmount = action.payload.estimatedAmount;
          state.errorMessage = '';
        }
      }
    );
    builder.addCase(getEstimatedExchangeAmount.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(getEstimatedExchangeAmount.rejected, (state, action: PayloadAction<any>) => {
      state.status = 'error';
      state.errorMessage = action.payload.message || action.payload.error;
      state.estimatedExchangeAmount = null;
    });
  },
});
export const { setCurrencyFrom, setCurrencyTo, setMinExchangeAmount } = currencySlice.actions;
export default currencySlice.reducer;
