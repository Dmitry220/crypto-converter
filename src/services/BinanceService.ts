import { $api } from "../http"
import { IResponseBihanse, ISymbols } from "../models/IValutions"

export default class BinanceService {
	static getTickerPriceOfSymbol() {
		return $api.get<IResponseBihanse>(
		  `fapi/v1/ticker/price?symbols=["BTCUSDT","ETHUSDT","ETHBTC"]`
		)
	 }
 }