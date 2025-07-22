import { useRecoilState } from "recoil";
import { taskListState } from "../atoms/taskListState";
import type { Task } from "../types/Task";

export function useTaskCRUD() {
    const [tasks, setTasks] = useRecoilState(taskListState);

    const allTasks = () => {
        console.log(tasks);
        return tasks;
    }

    const addTask = (task: Task) => {
        setTasks((old) => [...old, task]);
    }

    const updateTask = (updated: Task) => {
        setTasks((old) => old.map(t => (t.id === updated.id ? updated : t)));
    }

    const deleteTask = (id: number) => {
        setTasks((old) => old.filter(t => t.id !== id));
    }

    return { allTasks, addTask, updateTask, deleteTask }
}