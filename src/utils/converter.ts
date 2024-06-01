const fromMsToHoursMinutesSeconds = (ms: number) => {
    const hours = Math.floor(ms/3600000)
    ms -= hours*3600000
    const minutes = Math.floor(ms/60000)
    ms -= minutes*60000
    const seconds = Math.floor(ms/1000)
    if (!hours) return `${`${minutes}`.padStart(2,'0')}:${`${seconds}`.padStart(2,'0')}`
    return `${`${hours}`.padStart(2,'0')}:${`${minutes}`.padStart(2,'0')}:${`${seconds}`.padStart(2,'0')}`
}
export const timeBeforeReset = (start: Date,reset: number, currentTime: number) => {
    return fromMsToHoursMinutesSeconds(start.getTime()+reset*1000-currentTime)
}