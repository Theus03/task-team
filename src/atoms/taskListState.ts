import { atom } from "recoil";
import type { Task } from "../types/Task";

export const taskListState = atom<Task[]>({
    key: "taskListState",
    default: []
});