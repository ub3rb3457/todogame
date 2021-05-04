import create from 'zustand'
const useStore = create((set,get) => ({
    tasks: [],
    hasTasks: () => { return (get().tasks.length>0) ? true : false },
    setTasks: tasks => set({ tasks }) 
}))
export default useStore