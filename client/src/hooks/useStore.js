import create from 'zustand'
import produce from 'immer'
const useStore = create((set,get) => ({
    tasks: [],
    hasTasks: () => { return (get().tasks.length>0) ? true : false },
    set: fn => set(produce(fn)) 
}))
export default useStore