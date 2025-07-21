import { useRecoilState } from "recoil";
import { taskListState } from "../atoms/taskListState";
import type { Task } from "../types/Task";

export function useTaskCRUD() {
    const [_, setTasks] = useRecoilState(taskListState);

    const addTask = (task: Task) => {
        setTasks((old) => [...old, task]);
    }

    const updateTask = (updated: Task) => {
        setTasks((old) => old.map(t => (t.id === updated.id ? updated : t)));
    }

    const deleteTask = (id: number) => {
        setTasks((old) => old.filter(t => t.id !== id));
    }

    return { addTask, updateTask, deleteTask }
}