import { mod } from 'mz-math';

export interface ICircle {
    strokeDasharray: string;
    strokeOffset: number;
}

export const isAngleInArc = (startAngleDeg: number, endAngleDeg: number, currentDegrees: number) : boolean => {
    if(startAngleDeg > endAngleDeg) {
        endAngleDeg += 360;
    }

    return (currentDegrees >= startAngleDeg && currentDegrees <= endAngleDeg) ||
        ((currentDegrees + 360) >= startAngleDeg && (currentDegrees + 360) <= endAngleDeg);
};

export const getAnglesDistance = (startAngle: number, endAngle: number) => {
    if(endAngle < startAngle) {
        endAngle += 360;
    }

    const diff = endAngle - startAngle;
    const diffMod = mod(diff, 360);

    return diffMod === 0 && diff > 0 ? 360 : diffMod;
};

export const getCircle = (
    startAngleDeg: number,
    endAngleDeg: number,
    radius: number,
) : ICircle => {

    if(startAngleDeg > endAngleDeg) {
        endAngleDeg += 360;
    }

    const circumference = 2 * Math.PI * radius;
    const angleDiff = endAngleDeg - startAngleDeg;
    const strokeOffset = -(startAngleDeg / 360) * circumference;
    const strokeDasharray = (angleDiff / 360) * circumference;
    const complement = circumference - strokeDasharray;

    return {
        strokeDasharray: [ strokeDasharray, complement ].join(' '),
        strokeOffset,
    } as ICircle;
};