import {task} from "../../App.tsx";
import {TimingTask} from "./TimingTask.tsx";
import {AccumulationTask} from "./AccumulationTask.tsx";

export const Task = ({task, index}: { task: task, index: number }) => {
    return (<div style={{display: 'flex', alignItems: 'center', margin: 10}}>
        {task.type === 'timing' ? <TimingTask task={task} index={index}/> : task.type === 'accumulation' ? <AccumulationTask task={task} index={index}/> : null}
    </div>)
}