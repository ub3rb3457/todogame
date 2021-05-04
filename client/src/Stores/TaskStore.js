import { action, createContextStore } from 'easy-peasy'
import _ from 'lodash'
const TaskStore = createContextStore({
    tasks: [
        {
            "name": "aha",
            "updated": "2021-05-01T01:10:16.586Z",
            "id": 0
        },
        {
            "name": "sdfsasdfa",
            "updated": "2021-05-01T00:09:27.585Z",
            "id": 1
        },
        {
            "name": "dsfsdf",
            "updated": "2021-04-30T20:18:54.134Z",
            "id": 3
        },
        {
            "id": 4,
            "name": "adfsdf",
            "done": false
        },
        {
            "id": 5,
            "done": false,
            "created": "2021-04-29T04:32:03.109Z"
        },
        {
            "id": 6,
            "done": false,
            "created": "2021-04-29T04:32:30.132Z"
        },
        {
            "id": 7,
            "done": false,
            "created": "2021-04-29T04:34:17.359Z"
        },
        {
            "id": 8,
            "name": "dfgdfg",
            "done": false,
            "created": "2021-04-29T04:36:03.399Z"
        },
        {
            "id": 9,
            "name": "boom",
            "done": false,
            "created": "2021-04-29T05:09:31.966Z"
        },
        {
            "name": "asdffffff",
            "updated": "2021-04-30T23:55:09.062Z",
            "id": 10
        },
        {
            "name": "sdfsdfsdf",
            "done": false,
            "created": "2021-04-29T11:47:57.120Z",
            "id": 11,
            "updated": "2021-04-30T23:47:02.592Z"
        },
        {
            "name": "whahamahamahey",
            "updated": "2021-04-30T23:48:41.038Z",
            "id": 12
        },
        {
            "name": "s",
            "done": false,
            "created": "2021-04-29T11:53:59.949Z",
            "id": 13,
            "updated": "2021-05-01T00:09:05.788Z"
        },
        {
            "name": "asd",
            "done": false,
            "created": "2021-04-29T11:54:07.266Z",
            "id": 14
        },
        {
            "name": "asdasdasd",
            "done": false,
            "created": "2021-04-29T12:35:26.689Z",
            "id": 15,
            "updated": "2021-04-30T23:40:48.744Z"
        },
        {
            "id": 16,
            "name": "sdfsdatisficing",
            "done": false,
            "created": "2021-04-29T12:35:51.722Z"
        },
        {
            "name": "asd",
            "done": false,
            "created": "2021-04-29T17:16:11.819Z",
            "id": 17
        }
    ],
    now: () => new Date().toISOString(),
    addTask: action((state, payload) => {
        state.tasks.push(payload)
    }),
    updateTask: action((state,payload) => {

    }),
    removeTask: action((state,payload) => {
        state.tasks = _.omitBy(state.tasks,)
    }),
    setItems: action((state,payload)=>{
        state.tasks = payload
    })

})
export default TaskStore