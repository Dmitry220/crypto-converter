import { Dispatch, FC, MouseEvent } from "react"
import { IListValuationsName } from "../../models/IListValutionsName"



export const FirstValuationItem: FC<IListValuationsName> = (
	{
		item,
		firstValuation,
		secondValuation,
		setFirstValuation,
		setSecondValuation
	}
) => {

	return (
		<button type='button'
			className={firstValuation != item.title ? 'popup-converter__button' : 'popup-converter__button popup-converter__button_active'}
			value={item.title}
			onClick={(e: MouseEvent<HTMLButtonElement>) => {
				setFirstValuation({
					img: item.img,
					title: e.currentTarget.value
				})
			}}>{item.title}</button>
	)
}

