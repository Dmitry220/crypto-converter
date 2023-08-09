import {PopupConverter} from "../popup-converter/Popup-converter";
import React, {ChangeEvent, Dispatch, FC, useRef, useState} from "react";
import arrowDoubleVertical from '../../../assets/images/arrow-double-vertical.svg'
import {IValutions} from "../../../models/IValutions";
import {valuations} from "../../../utils/Constants";
import useOnClickOutside from "../../../hooks/useOnClickOutside";
import {regexInput} from "../../../utils/helperFunctions";

interface IConverterInput {
    index: 1| 2,
    value: string,
    setValue: Dispatch<string>
    valuation: IValutions
    setValuation: Dispatch<IValutions>
    setFocus: Dispatch<1|2>

}

export const ConverterInput: FC<IConverterInput> = ({index,setValue,value,valuation,setValuation,setFocus}) => {

    const [showPopup, setShowPopup] = useState<boolean>()

    const ref = useRef<HTMLDivElement>(null)

    const handlerInput = (e: ChangeEvent<HTMLInputElement>) => {
        regexInput(e)
        setValue(e.target.value)
    }

    useOnClickOutside(ref, () => {
        setShowPopup(false)
    })

    return (
        <div className='converter__row converter__row_border'>
            <input
                className='converter__input'
                min={0}
                type='text'
                maxLength={20}
                value={value}
                onFocus={()=>setFocus(index)}
                onChange={handlerInput}
            />
            <span
                className='converter__crypto-name'
                onClick={()=>setShowPopup(prev=>!prev)}
            >
            <div className={'converter__crypto-name-title'}>
              <img src={valuation.img} alt='' className={'converter__crypto-icon'}/>
                {valuation.title}
            </div>
            <div>
              <img src={arrowDoubleVertical} alt="" className={'converter__crypto-name-arrow'}/>
            </div>
          </span>
            {showPopup && (
                <div className='converter__popup popup-converter' ref={ref}>
                    {valuations.map((item, index) => (
                        <PopupConverter
                            key={index}
                            item={item}
                            valuation={valuation}
                            setValuation={setValuation}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}