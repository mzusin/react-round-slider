import { Vector2 } from 'mz-math';
import { ReactNode } from 'react';

export type TStep = ((value: number | string, percent: number) => number) | number | undefined | null;
export type TData = (string | number)[] | undefined;

// --------------------------- USER PROVIDED SETTINGS ------------------------------------

export interface IUserSettingsPointer {
    rx?: number;
    ry?: number;
    value?: number | string;
    bgColor?: string;
    pointerSVG?: ReactNode;
    disabled?: boolean;
}

export interface IUserSettings {
    min?: number | string;
    max?: number | string;
    step?: TStep;
    data?: TData;

    pointers?: IUserSettingsPointer[];
    pointersOverlap?: boolean;

    // svg look & feel properties ----------
    rx?: number;
    ry?: number;
    strokeWidth?: number;

    bgColor?: string;
    connectionBgColor?: string;
    pointerBgColor?: string;
    pointerSVG?: ReactNode;

    startAngleDegrees?: number;
    endAngleDegrees?: number;
}

// --------------------------- STATE ------------------------------------

export interface IStatePointer {
    pointerRadii: Vector2;
    percent: number;
    id: string;
    index: number;
    bgColor: string;
    pointerSVG?: ReactNode;
    disabled: boolean;
}

export interface IEllipse {
    start: Vector2;
    end: Vector2;
    largeArcFlag: number;
}


// --------------------------- COMPONENTS ------------------------------------

export interface IPointer {
    id: string;
    pointer: IStatePointer;
    startEndAngle: Vector2;
    svgRadii: Vector2;
    svgCenter: Vector2;
    pointerBgColor: string;
    pointerSVG?: ReactNode;
}

export interface IPanel {
    ellipse: IEllipse;
    strokeWidth: number;
    svgRadii: Vector2;
    bgColor: string;
}

export interface IConnection {
    pointers: IStatePointer[];
    ellipse: IEllipse;
    strokeWidth: number;
    svgRadii: Vector2;
    connectionBgColor: string;
    startEndAngle: Vector2;
    svgCenter: Vector2;
}
