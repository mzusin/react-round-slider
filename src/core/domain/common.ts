import { isNumber } from 'mz-math';

export const getNumber = (value: number|string|undefined|null, defaultValue: number) : number => {
    return isNumber(value) ? Number(value) : defaultValue;
};

export const getString = (value: string|undefined|null, defaultValue: string) : string => {
    return value === undefined || value === null ? defaultValue : value;
};

export const getBoolean = (value: boolean|undefined|null, defaultValue: boolean) : boolean => {
    return value === undefined || value === null ? defaultValue : value;
};