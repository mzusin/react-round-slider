import { Vector2 } from 'mz-math';

// --------------------------- USER PROVIDED SETTINGS ------------------------------------

export type TStep = ((value: number | string, percent: number) => number) | number | undefined | null;
export type TData = (string | number)[] | undefined;

export interface IUserSettingsPointer {
    rx?: number;
    ry?: number;
    value?: number | string;
}

export interface IUserSettings {
    min?: number | string;
    max?: number | string;
    step?: TStep;
    data?: TData;

    pointers?: IUserSettingsPointer[];

    // svg look & feel properties ----------
    rx?: number;
    ry?: number;
    strokeWidth?: number;
    bgColor?: string;
    startAngleDegrees?: number;
    endAngleDegrees?: number;
}

// --------------------------- STATE ------------------------------------

export interface IStatePointer {
    pointerRadii: Vector2;
}

export interface IState {

    // svg look & feel properties ---------
    svgRadii: Vector2;
    angles: Vector2; // start and end angle of the SVG ellipse / circle
    strokeWidth: number;
    bgColor: string;

    pointers: IStatePointer[],

    // calculated properties ----------------------------
    svgSize:  Vector2;
    svgCenter: Vector2;

    sliderStartPoint: Vector2;
    sliderEndPoint: Vector2;
    largeArcFlag: number;
}

// --------------------------- COMPONENTS ------------------------------------

export interface IPointer {
    center: Vector2;
    pointerRadii: Vector2;
}

export interface IPanelFill {

}




