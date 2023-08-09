import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

const CryptoConvert = require("crypto-convert").default;

export const convert = new CryptoConvert({
    cryptoInterval: 20000, //Crypto prices update interval in ms (default 5 seconds on Node.js & 15 seconds on Browsers)
    fiatInterval: (60 * 1e3 * 60), //Fiat prices update interval (default every 1 hour)
    calculateAverage: true, //Calculate the average crypto price from exchanges
    binance: true, //Use binance rates
    bitfinex: true, //Use bitfinex rates
    coinbase: true, //Use coinbase rates
    kraken: true, //Use kraken rates
    HTTPAgent: null //HTTP Agent for server-side proxies (Node.js only)
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
const queryClient = new QueryClient()
root.render(
    <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
