import {create} from "zustand"

const useInputState = create((set) => ({
    aaa: '',
    bbb: '',
    updateAaa: (value: string) => set(() => ({aaa: value})),
    updateBbb: (value: string) => set(() => ({bbb: value})),
}))

export const InputItemView = () => {
    
}