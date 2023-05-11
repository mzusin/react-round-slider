import { isNumber } from 'mz-math';

export const getNumber = (value: number|undefined|null, defaultValue: number) : number => {
    return isNumber(value) ? Number(value) : defaultValue;
};

export const getString = (value: string|undefined|null, defaultValue: string) : string => {
    return value === undefined || value === null ? defaultValue : value;
};