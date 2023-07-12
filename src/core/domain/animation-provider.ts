import { convertRange, IAnimationResult, mod } from 'mz-math';

export const getAnimationProgressAngle = (
    progress: IAnimationResult,
    animationSourceDegrees: number,
    animationTargetDegrees: number
) => {
    return convertRange(progress.getPercent(), 0, 100, mod(animationSourceDegrees, 360), mod(animationTargetDegrees, 360));
};