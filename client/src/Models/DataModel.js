import { action } from 'easy-peasy'

const dataModel = (endpoint) => ({
    data: {},
    ids: selector(
      [state => state.data],
      (resolvedState) => {
        const [data] = resolvedState;
        return Object.keys(state.data)
      }
    ),
    fetched: action((state, items) => {
      items.forEach(item => {
        state.data[item.id] = item;
      });
    }),
    fetch: thunk(async (actions, payload) => {
      const data = await endpoint();
      actions.fetched(data);
    })
})
  