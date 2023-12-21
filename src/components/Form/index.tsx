import React, { useEffect } from 'react';

import { Button } from 'components/ui/Button';
import { Input } from 'components/ui/Input';
import { Select } from 'components/ui/Select';
import { CurrencyResponse } from 'services/currency/currency.model';
import { MinExchangeAmountParams, EstimatedExchangeAmountParams } from 'services/currency/currency.service';
import {
  getListAvailableCurrencies,
  getMinExchangeAmount,
  getEstimatedExchangeAmount,
} from 'store/action-creators/currency';
import { setCurrencyFrom, setCurrencyTo } from 'store/entities/currencySlice';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { ReactComponent as SwapIcon } from '../../assets/icons/swap.svg';

import styles from './Form.module.scss';
import { Loader } from 'components/ui/Loader';

export const Form = () => {
  const dispatch = useAppDispatch();
  const {
    listAvailableCurrencies,
    currencyFrom,
    currencyTo,
    minExchangeAmount,
    estimatedExchangeAmount,
    errorMessage,
    status,
  } = useAppSelector((state) => state.currency);

  const setExchangeFrom = (value: CurrencyResponse) => {
    dispatch(setCurrencyFrom(value));
  };

  const setExchangeTo = (value: CurrencyResponse) => {
    dispatch(setCurrencyTo(value));
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    console.log('sending...');
  };

  const handleSwap = () => {
    const currencyFromTemp = currencyFrom;
    const currencyToTemp = currencyTo;

    dispatch(setCurrencyFrom(currencyToTemp));
    dispatch(setCurrencyTo(currencyFromTemp));
  };

  useEffect(() => {
    dispatch(getListAvailableCurrencies());
  }, []);

  useEffect(() => {
    const params: MinExchangeAmountParams = {
      from: currencyFrom.ticker,
      to: currencyTo.ticker,
    };
    dispatch(getMinExchangeAmount(params));
  }, [currencyFrom, currencyTo]);

  useEffect(() => {
    if (minExchangeAmount) {
      const params: EstimatedExchangeAmountParams = {
        from: currencyFrom.ticker,
        to: currencyTo.ticker,
        amount: minExchangeAmount,
      };

      dispatch(getEstimatedExchangeAmount(params));
    }
  }, [minExchangeAmount]);

  return (
    <form>
      <div className={styles.selectors}>
        <Select
          options={listAvailableCurrencies}
          amountExchange={minExchangeAmount}
          defaultCurrency={currencyFrom}
          setValue={setExchangeFrom}
          isDisabled={false}
          type="number"
        />

        {status === 'loading' ? (
          <Loader />
        ) : (
          <button className={styles.swapIcon} onClick={handleSwap} type="button">
            <SwapIcon width={24} height={24} />
          </button>
        )}

        <Select
          options={listAvailableCurrencies}
          amountExchange={estimatedExchangeAmount}
          defaultCurrency={currencyTo}
          setValue={setExchangeTo}
          isDisabled
          type="text"
        />
      </div>
      <div className={styles.sending}>
        <Input label="Your Ethereum address" />
        <Button onClick={(e) => handleSubmit(e)} disabled={!!errorMessage} type="submit">
          Exchange
        </Button>

        {errorMessage && <span className={styles.error}>{errorMessage}</span>}
      </div>
    </form>
  );
};
