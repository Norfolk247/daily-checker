import {task} from "../../App.tsx";
import {useContext, useEffect, useState} from "react";
import {CurrentTimeContext, DataContext} from "../../App.tsx";
import {timingTaskChecker, timingTaskShiftDate} from "../../utils/checker.ts";
import {timeBeforeReset} from "../../utils/converter.ts";

export const TimingTask = ({task, index}: { task: task & { type: 'timing' }, index: number }) => {
    const currentTime = useContext(CurrentTimeContext)
    const setData = useContext(DataContext)

    const [done, setDone] = useState(task.done)
    useEffect(() => {
        setData(data => data.map((task, i) => {
            // @ts-expect-error current task always will have reset
            if (index == i) return {...task, start: timingTaskShiftDate(task.start, task.reset, currentTime), done}
            return task
        }))
    }, [done])

    useEffect(() => {
        if (timingTaskChecker(task.start, task.reset, currentTime)) {
            setData(data => data.map((task, i) => {
                if (index == i) return {
                    ...task,
                    // @ts-expect-error current task always will have reset
                    start: timingTaskShiftDate(task.start, task.reset, currentTime),
                    done: false
                }
                return task
            }))
            //setDone(false)
        }
    }, [currentTime])

    return (<>
        <input type='checkbox' checked={task.done} onChange={() => setDone(prev => !prev)}/>
        <span
            style={task.done ? {color: 'gray'} : {color: 'red'}}>{task.name} до следующего сброса {timeBeforeReset(task.start, task.reset, currentTime)}</span>
    </>)
}