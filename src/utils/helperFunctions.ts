import {ChangeEvent} from "react";

export const regexInput = (e: ChangeEvent<HTMLInputElement>) => {
    let [_, sign, integer, decimals]: any = e.target.value
        .replace(/[^\d\.\-]/g, '')
        .replace(/(\..*?)\./g, '$1')
        .replace(/(.+)-/g, '$1')
        .match(/^(-?)(.*?)((?:\.\d*)?)$/)

    let pos: number = Number(e.target.selectionStart) - 1
    if (!integer && decimals) pos += 2

    if (integer || decimals) {
        integer = +integer
    }

    const formatted = sign + integer + decimals

    if (formatted !== e.target.value) {
        e.target.value = formatted
        e.target.setSelectionRange(pos, pos)
    }
}