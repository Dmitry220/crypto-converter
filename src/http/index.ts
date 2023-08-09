import axios from 'axios'

export const API_URL = 'https://testnet.binancefuture.com'

export const $api = axios.create({ baseURL: API_URL })
