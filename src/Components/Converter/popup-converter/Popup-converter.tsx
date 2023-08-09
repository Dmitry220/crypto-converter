import React, {FC, MouseEvent} from 'react'
import {IListValuationsName} from '../../../models/IListValutionsName'
import checkIcon from "../../../assets/images/check.svg"
import './Popup-converter.scss'

export const PopupConverter: FC<IListValuationsName> = (
    {
        item,
        valuation,
        setValuation
    }) => {

    const setActiveValuation = (e: MouseEvent<HTMLDivElement>) => {
        setValuation({
            img: item.img,
            title: item.title
        })
    }

    return (
        <div className={'popup-converter__container'} onClick={setActiveValuation}>
            <div className={'popup-converter__check'}>
                {valuation.title === item.title && (
                    <img src={checkIcon} alt="check"/>
                )}
            </div>
            <div className={'popup-converter__body'}>
                <img src={item.img} alt='' className={'popup-converter__img'}/>
                <button
                    type='button'
                    className={'popup-converter__button'}
                    value={item.title}
                >
                    {item.title} <span>{item.alt}</span>
                </button>
            </div>
        </div>
    )
}
