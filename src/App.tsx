import React, {ChangeEvent, useEffect, useRef, useState} from 'react';
import './App.scss';
import arrowSwap from '../src/assets/images/arrow-right-left.svg'
import btc from '../src/assets/images/btc.svg'
import usdt from '../src/assets/images/usdt.svg'
import eth from '../src/assets/images/eth.svg'
import useOnClickOutside from './hooks/useOnClickOutside';
import {SecondValuationItem} from './Components/SecondValutionItem/SecondValutionItem';
import {FirstValuationItem} from './Components/FirstValutionItem/FirstValutionItem';
import {convert} from '.';
import {IValutions} from './models/IValutions';

function App() {

  const valuations: IValutions[] = [
    {
      title: 'EUR',
      img: btc
    },
    {
      title: 'USD',
      img: usdt
    },
    {
      title: 'RUB',
      img: eth
    },
  ]

  const ref = useRef<HTMLDivElement>(null);

  const [firstValue, setFirstValue] = useState<number>(0)
  const [secondValue, setSecondValue] = useState<number>(0)
  const [firstValuation, setFirstValuation] = useState<IValutions>(valuations[0])
  const [secondValuation, setSecondValuation] = useState<IValutions>(valuations[1])
  const [showFirstValuation, setShowFirstValuation] = useState<boolean>()
  const [showSecondValuation, setShowSecondValuation] = useState<boolean>()
  const [isSwap, setSwap] = useState(false)


  const handlerInputOne = (e: ChangeEvent<HTMLInputElement>) => {
    setFirstValue(+e.target.value)
    getSecondValuation(+e.target.value)
  }

  const handlerInputTwo = (e: ChangeEvent<HTMLInputElement>) => {
    setSecondValue(+e.target.value)
    getFirstValuation(+e.target.value)
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
    if(isSwap){
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
        { }
        <div className="converter__row converter__row_border">
          <input className='converter__input' min={0} type="number" value={firstValue} onChange={handlerInputOne} />
          <span className='converter__crypto-name' onClick={openFirstListValuation}>
            <img src={firstValuation.img} alt="" />
            {firstValuation.title}

          </span>
          {showFirstValuation && <div className='converter__popup popup-converter' ref={ref}>
            {valuations.map((item, index) =>
              <FirstValuationItem
                key={index}
                item={item}
                firstValuation={firstValuation.title}
                setSecondValuation={setSecondValuation}
                secondValuation={secondValuation.title}
                setFirstValuation={setFirstValuation}
              />)}

          </div>
          }
        </div>
        <div className="converter__row">
          <img className='converter__arrow' src={arrowSwap} alt="" onClick={swap} />
        </div>
        <div className="converter__row converter__row_border">
          <input className='converter__input' min={0} type="number" value={secondValue} onChange={handlerInputTwo} />
          <span className='converter__crypto-name' onClick={openSecondListValuation}>
            <img src={secondValuation.img} alt="" />
            {secondValuation.title}
          </span>
          {showSecondValuation && <div className='converter__popup popup-converter' ref={ref}>
            {valuations.map((item, index) =>
              <SecondValuationItem
                key={index}
                item={item}
                firstValuation={firstValuation.title}
                setSecondValuation={setSecondValuation}
                secondValuation={secondValuation.title}
                setFirstValuation={setFirstValuation}
              />)}
          </div>
          }
        </div>
      </div>
      <footer className="converter__footer">
       <b>{(firstValue || 0) + ' ' + firstValuation.title + ' = ' + (secondValue || 0) + ' ' + secondValuation.title}</b>  <br />
        Данные носят ознакомительный характер {'\t'}
        <b>
          {
            new Date(convert.lastUpdated).toLocaleDateString() + ' ' +
            new Date(convert.lastUpdated).getHours() + ':' +
            new Date(convert.lastUpdated).getMinutes()
          }
        </b>
      </footer>      
    </div>
  );
}

export default App;

