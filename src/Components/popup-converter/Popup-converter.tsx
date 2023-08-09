import {Dispatch, FC, MouseEvent} from "react"
import {IListValuationsName} from "../../models/IListValutionsName"
import './Popup-converter.scss'


export const PopupConverter: FC<IListValuationsName> = (
    {
        item,
        valuation,
        setValuation,
    }
) => {

    const setActiveValuation = (e: MouseEvent<HTMLDivElement>) => {
        setValuation({
            img: item.img,
            title: item.title
        })
    }

    return (
        <div className={'popup-converter__container'}  onClick={setActiveValuation}>
            <div className={'popup-converter__check'}>
                {valuation === item.title &&
                <svg focusable="false" xmlns="http://www.w3.org/2000/svg" width="16" height="10">
                   <path d="M7.207 7.506L3.629 3.81 2.343 4.939l4.841 5.002 8.462-8.428L14.382.362z"/>
                </svg>}
            </div>
            <div className={'popup-converter__body'}>
                <img className={'popup-converter__img'} src={item.img} alt="icon"/>
                <button type='button'
                        className={'popup-converter__button'}
                        value={item.title}
                       >{item.title} <span>{item.alt}</span></button>

            </div>

        </div>

    )
}

