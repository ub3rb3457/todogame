export const capitalize = (s) => { return (typeof s !== 'string') ? '' : s.charAt(0).toUpperCase() + s.slice(1) }
export const eBrake = (e) => {
    e.preventDefault()
    e.stopPropagation()
}
//predicates for filtering
export const isDone = (task) => { return task.done === true }
//export const 