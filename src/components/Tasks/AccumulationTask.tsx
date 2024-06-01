import {task} from "../../App.tsx";
import {useContext, useEffect, KeyboardEvent, useState, ChangeEvent} from "react";
import {CurrentTimeContext, DataContext} from "../../App.tsx";
import {accumulateShiftDate, accumulationTaskIncreaser} from "../../utils/checker.ts";

export const AccumulationTask = ({task, index}: {task: task & {type: 'accumulation'},index: number}) => {
    const currentTime = useContext(CurrentTimeContext)
    const setData = useContext(DataContext)

    useEffect(()=>{
        const diff = accumulationTaskIncreaser(task.start,task.accumulateTime,currentTime)
        if (task.maximum && task.value+diff >= task.maximum) {
            setData(data => data.map((task, i) => {
                // @ts-expect-error ???
                if (index == i) return {...task, value: task.maximum, start: new Date(currentTime)}
                return task
            }))
            return
        }
        if (task.maximum) {
            setData(data => data.map((task, i) => {
                // @ts-expect-error ???
                if (index == i) return {...task, value: task.value+diff, start: accumulateShiftDate(diff,task.start,task.accumulateTime)}
                return task
            }))
            return
        }
        if (diff>0) {
            setData(data => data.map((task, i) => {
                // @ts-expect-error ???
                if (index == i) return {...task, value: task.value+diff, start: accumulateShiftDate(diff,task.start,task.accumulateTime)}
                return task
            }))
            return
        }
    },[currentTime])

    const [value, setValue] = useState('')
    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value)
    }
    const onKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if ((event.key !== 'Enter')||(!event.currentTarget.value)) return
        setData(data => data.map((task, i) => {
            // @ts-expect-error ???
            if (index == i) return {...task, value: value-0, start: new Date(currentTime)}
            return task
        }))
        setValue('')
    }

    return (<>
        <span style={task.value == task.maximum ? {color: 'red'} : {color: 'black'}}>{task.name} накопилось {task.value} {task.maximum ? `из ${task.maximum}` : ''}</span>
        <input type='number' value={value} onChange={onChangeHandler} onKeyDown={onKeyDownHandler}/>
    </>)
}