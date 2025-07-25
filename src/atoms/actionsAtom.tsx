import { atom } from "recoil";

export const modalStateAtom = atom({
    key: "modalStateAtom",
    default: false
})

export const alertStateAtom = atom({
    key: "alertStateAtom",
    default: false
})