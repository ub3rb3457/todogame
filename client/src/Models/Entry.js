import _ from 'lodash'
import { action } from 'easy-peasy' 
const EntryModel = {
    entries: [{
        "id": 1,
        "title": "testing 1 2 3",
        "body":` Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce luctus lacus eget enim finibus porttitor. Nunc tempor augue nunc, a finibus tellus ultricies ut. Vivamus vitae ante purus. Donec porta sodales nisl, non egestas tellus ornare nec. Suspendisse ante mauris, euismod eu sagittis id, bibendum ut lorem. Donec facilisis ipsum enim, et dapibus erat iaculis et. Mauris luctus lorem risus, posuere vulputate nunc ultricies eget. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla egestas odio velit, vitae tincidunt elit malesuada sit amet. Sed eget lectus mi. Cras egestas efficitur diam eget bibendum.
        Proin eget sagittis nunc. Sed et orci semper, dignissim sapien nec, dignissim nunc. Praesent euismod auctor felis. In volutpat risus vitae faucibus dignissim. Cras non tempus enim. Nam hendrerit enim in tristique maximus. Aenean euismod turpis vitae nunc sodales, sit amet ornare sapien pharetra. Praesent ex leo, suscipit vitae nunc vitae, tempus ornare enim. Phasellus ut nisl sit amet lacus fringilla congue. Maecenas convallis est risus, ut finibus velit aliquam tempus. Fusce non justo pulvinar, tincidunt lorem id, fringilla magna. Nulla eget mauris at ligula consequat vulputate. Pellentesque eget velit eu dui laoreet lacinia a sit amet diam. Duis efficitur dolor et hendrerit accumsan. `,
        "published": false,
        "created": "2021-04-29T17:16:11.819Z"
    },{

    }],
    tally: 1,
    now: () => new Date().toISOString(),
    addEntry: action((state, payload) => {
        state.tasks.push(payload)
    }),
    onAddEntry: actionOn(
        actions => actions.addTodo,
        (state, target) => {
            //
        }
    ),
    updateEntry: action((state,payload) => {
        console.log(payload)
        //let task = _.find(state.tasks,{'id':payload.id})
        //_.assign(task,)
    }),
    removeEntry: action((state,payload) => {
        _.pull(state.tasks, payload )
    }),
    onRemoveEntry: actionOn(
        actions => actions.addTodo,
        (state, target) => {
            //
        }
    ),

}
export default EntryModel