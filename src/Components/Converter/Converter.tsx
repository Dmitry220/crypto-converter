import React, {Dispatch, useEffect, useState} from 'react'
import {IValutions} from "../../models/IValutions";
import {valuations} from "../../utils/Constants";
import {convert} from "../../index";
import {ConverterInput} from "./Converter-input/ConverterInput";
import './Converter.scss'


export const Converter = () => {

    const [isFocus, setFocus] = useState<1 | 2>(1)
    const [firstValue, setFirstValue] = useState<string>('1')
    const [secondValue, setSecondValue] = useState<string>('1')
    const [firstValuation, setFirstValuation] = useState<IValutions>(valuations[0])
    const [secondValuation, setSecondValuation] = useState<IValutions>(valuations[1])

    const getRelationToCurrency = async (from: string, to: string, value: number, setValue: Dispatch<string>) => {
        await convert.ready()
        setValue(convert[from][to](value) || 0)
    }

    const swap = () => {
        setSecondValuation(firstValuation)
        setFirstValuation(secondValuation)
    }

    useEffect(() => {
        if (isFocus === 1) {
            getRelationToCurrency(firstValuation.title, secondValuation.title, +firstValue, setSecondValue)
        }
        if (isFocus === 2) {
            getRelationToCurrency(secondValuation.title, firstValuation.title, +secondValue, setFirstValue)
        }

    }, [firstValue, firstValuation, secondValue, secondValuation])


    useEffect(() => {
        const interval = setInterval(() => {
            getRelationToCurrency(firstValuation.title, secondValuation.title, +firstValue, setSecondValue)
        }, 25000)
        return () => clearInterval(interval)
    }, [])

    const outputResult = () =>
        `${firstValue || 0} ${firstValuation.title}  = ${secondValue || 0} ${
            secondValuation.title
        }`

    const actualDate = () => `
    ${new Date(convert.lastUpdated).toLocaleDateString()}
    ${new Date(convert.lastUpdated).getHours().toString().padStart(2, '0')}:${new Date(convert.lastUpdated).getMinutes().toString().padStart(2, '0')}
  `

    return (
        <div className='converter'>
            <div className='converter__body'>
                <ConverterInput
                    valuation={firstValuation}
                    value={firstValue}
                    setValuation={setFirstValuation}
                    setValue={setFirstValue}
                    index={1}
                    setFocus={setFocus}
                />
                <div className='converter__row'>
                    <div className={'converter__arrow'} onClick={swap}/>
                </div>
                <ConverterInput
                    valuation={secondValuation}
                    value={secondValue}
                    setValuation={setSecondValuation}
                    setValue={setSecondValue}
                    index={2}
                    setFocus={setFocus}
                />
            </div>
            <footer className='converter__footer'>
                <b>{outputResult()}</b><br/>
                Данные носят ознакомительный характер {'\t'}
                <b>{actualDate()}</b>
            </footer>
        </div>
    )
}


