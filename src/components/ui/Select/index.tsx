import React, { FC, useEffect, useRef, useState } from 'react';
import clsx from 'clsx';

import { CurrencyResponse } from 'services/currency/currency.model';
import { useAppDispatch } from 'store/hooks';
import { setMinExchangeAmount } from 'store/entities/currencySlice';
import { ReactComponent as CloseIcon } from '../../../assets/icons/close.svg';
import { useClickOutside } from 'hooks/useClickOutside';

import styles from './Select.module.scss';

interface SelectProps {
  options: CurrencyResponse[];
  amountExchange?: number | null;
  defaultCurrency?: CurrencyResponse;
  setValue: (x: CurrencyResponse) => void;
  isDisabled: boolean;
  type: 'text' | 'number';
}

export const Select: FC<SelectProps> = ({ options, amountExchange, defaultCurrency, setValue, isDisabled, type }) => {
  const [amount, setAmount] = useState<number | string>(amountExchange || 0);
  const [opened, setOpened] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState<CurrencyResponse | null>(defaultCurrency || null);
  const [query, setQuery] = useState('');
  const [filtered, setFiltered] = useState<CurrencyResponse[]>(options || []);
  const refSelector = useRef() as React.MutableRefObject<HTMLDivElement>;
  const dispatch = useAppDispatch();

  const handleAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(parseFloat(e.target.value));
  };

  const onBlurForAmount = () => {
    dispatch(setMinExchangeAmount(amount as number));
  };

  const onKeyDownForAmount = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      dispatch(setMinExchangeAmount(amount as number));
    }
  };

  const handleOpenedList = () => {
    setOpened((prev) => !prev);
  };

  const handleOption = (value: CurrencyResponse) => {
    setSelectedCurrency(value);
    setOpened(false);
  };

  const handleQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSearchClosing = () => {
    setQuery('');
  };

  useEffect(() => {
    if (defaultCurrency) {
      setSelectedCurrency(defaultCurrency);
    }
  }, [defaultCurrency]);

  useEffect(() => {
    if (selectedCurrency) {
      setValue(selectedCurrency);
    }
  }, [selectedCurrency]);

  useEffect(() => {
    if (amountExchange) {
      setAmount(amountExchange);
    }
    if (amountExchange === null) {
      setAmount('-');
    }
  }, [amountExchange]);

  useEffect(() => {
    if (query === '') {
      setFiltered(options);
    } else {
      setFiltered(
        options.filter(
          (item) =>
            item.name.toLowerCase().includes(query.toLowerCase()) ||
            item.ticker.toLowerCase().includes(query.toLowerCase())
        )
      );
    }
  }, [options, query]);

  useClickOutside(refSelector, setOpened);

  return (
    <article className={styles.selector} ref={refSelector}>
      <div className={clsx(styles.header, opened && styles.opened)}>
        <input
          className={styles.amount}
          onChange={(e) => handleAmount(e)}
          value={amount}
          disabled={isDisabled}
          type={type}
          onBlur={onBlurForAmount}
          onKeyDown={onKeyDownForAmount}
        />
        <div className={styles.value} onClick={handleOpenedList}>
          {selectedCurrency ? (
            <>
              <img src={selectedCurrency.image} width={20} height={20} alt={selectedCurrency.name} className={styles.icon} />
              <span className={styles.ticker}>{selectedCurrency?.ticker}</span>
            </>
          ) : (
            'Default currency'
          )}
          <span className={styles.arrow}></span>
        </div>
      </div>

      <div className={clsx(styles.search, opened && styles.opened)}>
        <input className={styles.inputSearch} value={query} onChange={handleQuery} placeholder="Search" />
        {query && (
          <button className={styles.close} onClick={handleSearchClosing}>
            <CloseIcon width={16} height={16} />
          </button>
        )}
      </div>

      {opened && (
        <div className={styles.options}>
          {filtered.length > 0 ? (
            <ul>
              {filtered.map((option) => (
                <li key={option.ticker} className={styles.option} onClick={() => handleOption(option)}>
                  <img src={option.image} width={20} height={20} alt={option.name} className={styles.icon} />
                  <span className={styles.ticker}>{option.ticker}</span>
                  <span className={styles.name}>{option.name}</span>
                </li>
              ))}
            </ul>
          ) : (
            <span className={styles.noData}>No data</span>
          )}
        </div>
      )}
    </article>
  );
};
