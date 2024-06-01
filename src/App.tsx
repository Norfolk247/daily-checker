import {createContext, Dispatch, SetStateAction, useEffect, useState} from "react";
import {Task} from "./components/Tasks/Task.tsx";

export type task = {
    name: string,
    start: Date,
} & ({
    type: 'timing',
    reset: number, //seconds
    done: boolean
} | {
    type: 'accumulation',
    value: number,
    accumulateTime: number, // value + 1 per accumulateTime in seconds,
    maximum?: number
})

/*const testData: task[] = [
    {name: 'генш обновление недели', start: new Date(1710126000000), type: 'timing', reset: 7*24*60*60, done: true},
    {name: 'генш дейлики', start: new Date(1710385200000), type: 'timing', reset: 24*60*60, done: true},
    {name: 'генш смола', start: new Date(1710423180000), type: 'accumulation', maximum: 160, accumulateTime: 8*60, value: 18},
    {name: 'генш серебро в хате ', start: new Date(1710233340000), type: 'accumulation', maximum: 2400, accumulateTime: 60*60/26, value: 0},
    {name: 'хср дейлики', start: new Date(1710385200000), type: 'timing', reset: 24*60*60, done: true},
    {name: 'хср смола', start: new Date(1710412380000), type: 'accumulation', maximum: 240, accumulateTime: 6*60, value: 32},
    {name: 'хср обновление недели', start: new Date(1710126000000), type: 'timing', reset: 7*24*60*60, done: true},
    {name: 'убраться в хате', start: new Date(1710054000000), type: 'timing', reset: 7*24*60*60, done: true},
]*/

export const CurrentTimeContext = createContext(Date.now())
export const DataContext = createContext<Dispatch<SetStateAction<task[]>>>(() => {
})

const localStorageKey = import.meta.env.KEY ?? 'data'
const rawStorageData = localStorage.getItem(localStorageKey) ?? '[]'
const storageData: task[] = JSON.parse(rawStorageData).map((task: task)=>({...task,start: new Date(task.start)}))

export const App = () => {
    const [time, setTime] = useState(Date.now())
    const [data, setData] = useState(storageData)
    useEffect(() => {
        const interval = setInterval(() => setTime(time => time + 1000), 1000)
        const setStorageHandler = (e: BeforeUnloadEvent) => {
            e.preventDefault()
            localStorage.setItem(localStorageKey, JSON.stringify(data))
        }
        window.addEventListener('beforeunload', setStorageHandler)
        return () => {
            clearInterval(interval)
            window.removeEventListener('beforeunload', setStorageHandler)
        }
    }, [data])

    return (
        <CurrentTimeContext.Provider value={time}>
            <DataContext.Provider value={setData}>
                <input type='datetime-local' onChange={e=>console.log(new Date(e.target.value).getTime())}/>
                <div>
                    {data.map((task, index) => <Task task={task} key={index} index={index}/>)}
                </div>
            </DataContext.Provider>
        </CurrentTimeContext.Provider>
    )
}