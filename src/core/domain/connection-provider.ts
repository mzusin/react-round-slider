import { IPointers } from './pointers-provider';
import { getAnglesDistance } from './circle-provider';

export interface IConnection {
    radius: number;
    cx: number;
    cy: number;

    // calculated properties ---------
    startAngleDeg: number;
    endAngleDeg: number;
    strokeDasharray: number[];
    strokeOffset: number;
}

export const getConnection = (
    pointers: IPointers,
    radius: number,
    cx: number,
    cy: number,
    pathStartAngle: number,
    pathEndAngle: number,
) : IConnection => {

    if(!pointers.pointers || pointers.pointers.length <= 0) return null;

    const result : IConnection = {
        radius,
        cx,
        cy,

        // calculated properties ---------
        startAngleDeg: pathStartAngle,
        endAngleDeg: pathStartAngle,
        strokeDasharray: [0, 0],
        strokeOffset: 0,
    };

    // Define start/end angles.
    if(pointers.pointers.length === 1) {
        result.startAngleDeg = pathStartAngle;
        result.endAngleDeg = pointers.pointers[0].angleDeg;
    }
    else{
        result.startAngleDeg = pointers.pointers[0].angleDeg;
        result.endAngleDeg = pointers.pointers[pointers.pointers.length - 1].angleDeg;

        /*const minMaxResult = getMinMaxDistancePointers(pointers.pointers, pathStartAngle);
        if(!minMaxResult) return null;

        const [ minPointer, maxPointer ] = minMaxResult;

        result.startAngleDeg = minPointer.angleDeg;
        result.endAngleDeg = maxPointer.angleDeg;*/
    }

    const pathAnglesDistance = getAnglesDistance(pathStartAngle, pathEndAngle);

    if(result.startAngleDeg > result.endAngleDeg) {
        result.endAngleDeg += 360;
    }

    let angleDistance = getAnglesDistance(result.startAngleDeg, result.endAngleDeg);

    const shouldSwitch = angleDistance > pathAnglesDistance;

    if(shouldSwitch) {
        angleDistance = 360 - angleDistance;
        [result.startAngleDeg, result.endAngleDeg] = [result.endAngleDeg, result.startAngleDeg];
    }

    const circumference = 2 * Math.PI * radius;
    const strokeOffset = -(result.startAngleDeg / 360) * circumference;
    const strokeDasharray = (angleDistance / 360) * circumference;
    const complement = circumference - strokeDasharray;

    result.strokeDasharray = [ strokeDasharray, complement ];
    result.strokeOffset = strokeOffset;

    return result;
};