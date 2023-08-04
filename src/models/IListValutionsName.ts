import { Dispatch } from "react";
import { IValutions } from "./IValutions";

export interface IListValuationsName {
	item: IValutions,
	setFirstValuation: Dispatch<IValutions>,
	setSecondValuation: Dispatch<IValutions>,
	secondValuation: string,
	firstValuation: string
}