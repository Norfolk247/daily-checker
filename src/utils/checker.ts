export const timingTaskChecker = (start: Date, reset: number, targetTime: number) => {
    return Math.floor((targetTime - start.getTime()) / 1000) > reset;
}
export const timingTaskShiftDate = (start: Date, reset: number, targetTime: number) => {
    let i = 1
    while (start.getTime() + reset * 1000 * i < targetTime) i += 1
    return new Date(start.getTime() + reset * 1000 * (i - 1))
}
export const accumulationTaskIncreaser = (start: Date, accumulateTime: number, targetTime: number) => {
    return Math.floor((targetTime - start.getTime()) / accumulateTime / 1000)
}
export const accumulateShiftDate = (valueDiff: number, start: Date, accumulateTime: number) => {
    return new Date(start.getTime() + valueDiff * 1000 * accumulateTime)
}