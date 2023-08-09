import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import './App.scss';
import btc from '../src/assets/images/btc.svg'
import usdt from '../src/assets/images/usdt.svg'
import eth from '../src/assets/images/eth.svg'
import useOnClickOutside from './hooks/useOnClickOutside';
import { PopupConverter } from './Components/popup-converter/Popup-converter';
import { convert } from '.';
import { IValutions } from './models/IValutions';

function App() {

    const valuations: IValutions[] = [
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
        },
    ]

    const ref = useRef<HTMLDivElement>(null);

    const [firstValue, setFirstValue] = useState<number>(1)
    const [secondValue, setSecondValue] = useState<number>(1)
    const [firstValuation, setFirstValuation] = useState<IValutions>(valuations[0])
    const [secondValuation, setSecondValuation] = useState<IValutions>(valuations[1])
    const [showFirstValuation, setShowFirstValuation] = useState<boolean>()
    const [showSecondValuation, setShowSecondValuation] = useState<boolean>()
    const [isSwap, setSwap] = useState(true)


    const handlerInputOne = (e: ChangeEvent<HTMLInputElement>) => {
        if (+e.target.value === 0) {
            return
        }
        setFirstValue(+e.target.value.replace(/^0+(?!\.|$)/, ''))
        getSecondValuation(+e.target.value.replace(/^0+(?!\.|$)/, ''))
    }

    const handlerInputTwo = (e: ChangeEvent<HTMLInputElement>) => {
        if (+e.target.value === 0) {
            return
        }
        setSecondValue(+e.target.value.replace(/^0+(?!\.|$)/, ''))
        getFirstValuation(+e.target.value.replace(/^0+(?!\.|$)/, ''))
    }

    const openFirstListValuation = () => setShowFirstValuation(true)

    const openSecondListValuation = () => setShowSecondValuation(true)

    const getSecondValuation = async (value: number) => {
        await convert.ready()
        setSecondValue(convert[firstValuation.title][secondValuation.title](value))

    }
    const getFirstValuation = async (value: number) => {
        await convert.ready()
        setFirstValue(convert[secondValuation.title][firstValuation.title](value))
    }

    const swap = () => {
        setSwap(true)
        setSecondValuation(firstValuation)
        setFirstValuation(secondValuation)
    }

    useOnClickOutside(ref, () => {
        setShowSecondValuation(false)
        setShowFirstValuation(false)
    });

    useEffect(() => {
        getSecondValuation(firstValue)
    }, [firstValuation])

    useEffect(() => {
        if (isSwap) {
            setSwap(false)
            return
        }
        getFirstValuation(secondValue)
    }, [secondValuation])


    return (
        <div className="converter">
            <div className="converter__head">
                Тестовое задание. React. Typescript
            </div>
            <div className="converter__body">
                <div className="converter__row converter__row_border">
                    <input className='converter__input' min={0} type="number" value={firstValue}
                        onChange={handlerInputOne} />
                    <span className='converter__crypto-name' onClick={openFirstListValuation}>
                        <div>
                            <svg focusable="false" xmlns="http://www.w3.org/2000/svg" width="8" height="14"><path
                                d="M4 0l4 6H0l4-6zm0 14l4-6H0l4 6z" /></svg>
                        </div>
                        <div className={'converter__crypto-name-title'}>
                            <img src={firstValuation.img} alt="" />
                            {firstValuation.title}
                        </div>
                    </span>
                    {showFirstValuation && <div className='converter__popup popup-converter' ref={ref}>
                        {valuations.map((item, index) =>
                            <PopupConverter
                                key={index}
                                item={item}
                                setValuation={setFirstValuation}
                                valuation={firstValuation.title}

                            />)}

                    </div>
                    }
                </div>
                <div className="converter__row">
                    <div className={'converter__arrow'} onClick={swap} />
                </div>
                <div className="converter__row converter__row_border">
                    <input className='converter__input' min={0} type="number" maxLength={20} value={secondValue}
                        onChange={handlerInputTwo} />
                    <span className='converter__crypto-name' onClick={openSecondListValuation}>
                        <div>
                            <svg focusable="false" xmlns="http://www.w3.org/2000/svg" width="8" height="14"><path
                                d="M4 0l4 6H0l4-6zm0 14l4-6H0l4 6z" /></svg>
                        </div>
                        <div className={'converter__crypto-name-title'}>
                            <img src={secondValuation.img} alt="" />
                            {secondValuation.title}
                        </div>

                    </span>
                    {showSecondValuation && <div className='converter__popup popup-converter' ref={ref}>
                        {valuations.map((item, index) =>
                            <PopupConverter
                                key={index}
                                item={item}
                                valuation={secondValuation.title}
                                setValuation={setSecondValuation}
                            />)}
                    </div>
                    }
                </div>
            </div>
            <footer className="converter__footer">
                <b>{(firstValue || 0) + ' ' + firstValuation.title + ' = ' + (secondValue || 0) + ' ' + secondValuation.title}</b>
                <br />
                Данные носят ознакомительный характер {'\t'}
                <b>
                    {
                        new Date(convert.lastUpdated).toLocaleDateString() + ' ' +
                        new Date(convert.lastUpdated).getHours() + ':' +
                        new Date(convert.lastUpdated).getMinutes().toString().padStart(2, '0')
                    }
                </b>
            </footer>
        </div>
    );
}

export default App;

