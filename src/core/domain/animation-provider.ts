import { IAnimationResult } from 'mz-math';

export const getAnimationProgressAngle = (
    progress: IAnimationResult,
    animationSourceDegrees: number,
    animationTargetDegrees: number
) => {
    let percent = progress.getPercent();

    if(percent < 0) {
        percent = 0;
    }

    if(percent > 100) {
        percent = 100;
    }

    const diff = animationTargetDegrees - animationSourceDegrees;
    const degrees = percent * diff / 100;

    return animationSourceDegrees + degrees;
};