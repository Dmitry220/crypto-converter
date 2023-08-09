import { Dispatch } from 'react'
import { IValutions } from './IValutions'

export interface IListValuationsName {
  item: IValutions
  setValuation: Dispatch<IValutions>
  valuation: IValutions
}
