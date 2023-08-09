import {IValutions} from "../models/IValutions";
import btc from "../assets/images/btc.svg";
import usdt from "../assets/images/usdt.svg";
import eth from "../assets/images/eth.svg";

export const valuations: IValutions[] = [
    {
        title: 'BTC',
        img: btc,
        alt: 'Bitcoin'
    },
    {
        title: 'USDT',
        img: usdt,
        alt: 'Tether'
    },
    {
        title: 'ETH',
        img: eth,
        alt: 'Ethereum'
    }
]