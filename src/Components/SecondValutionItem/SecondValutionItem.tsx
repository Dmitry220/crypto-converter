import { Dispatch, FC, MouseEvent } from "react"
import { IListValuationsName } from "../../models/IListValutionsName"


export const SecondValuationItem: FC<IListValuationsName> = ({
	item,
	firstValuation,
	secondValuation,
	setFirstValuation,
	setSecondValuation
}
) => {

	return (
		<button type='button'
			className={secondValuation != item.title ? 'popup-converter__button' : 'popup-converter__button popup-converter__button_active'}
			value={item.title} onClick={(e: MouseEvent<HTMLButtonElement>) => {			
				setSecondValuation({
					img: item.img,
					title: e.currentTarget.value
				})

			}}>{item.title}</button>
	)
}
