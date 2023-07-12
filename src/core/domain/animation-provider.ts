import { IAnimationResult, mod } from 'mz-math';

export const getAnimationProgressAngle = (
    progress: IAnimationResult,
    animationSourceDegrees: number,
    animationTargetDegrees: number,
    startPathAngleDeg: number
) => {
    let percent = progress.getPercent();

    if(percent < 0) {
        percent = 0;
    }

    if(percent > 100) {
        percent = 100;
    }

    let angle1 = animationSourceDegrees % 360;
    let angle2 = animationTargetDegrees % 360;

    if(angle1 < startPathAngleDeg) {
        angle1 += 360;
    }

    if(angle2 < startPathAngleDeg) {
        angle2 += 360;
    }

    const isClockwise = angle2 > angle1;

    if(isClockwise) {
        const clockwiseDistance = (angle2 - angle1 + 360) % 360;
        return mod(animationSourceDegrees + (percent * clockwiseDistance / 100), 360);
    }
    else {
        const counterclockwiseDistance = (angle1 - angle2 + 360) % 360;
        return mod(animationSourceDegrees - (percent * counterclockwiseDistance / 100), 360);
    }
};