export interface CurrencyResponse {
  ticker: string;
  name: string;
  image: string;
  hasExternalId: boolean;
  isFiat: boolean;
  featured: boolean;
  isStable: boolean;
  supportsFixedRate: boolean;
}

export interface MinExchangeAmountResponse {
  minAmount: number | null;
}

export interface EstimatedExchangeAmountResponse {
  estimatedAmount: number | null;
  transactionSpeedForecast: string;
  warningMessage: string | null;
}
