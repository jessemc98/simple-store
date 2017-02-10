export function createStore(reducers, initialState = {}){
  const state = initialState
  const subscribers = {}
  const INIT_EVENT = {type: '__STORE_INIT__'}
  const publicApi = {
    emit,
    getState,
    subscribe,
    unsubscribe
  }

  // emit empty event to cause reducers to be called initialy
  emit(INIT_EVENT)

  function callSubscribersWithState(subscribers, state) {
    subscribers &&
    subscribers
      .forEach(subscriber => subscriber(state))
  }

  function emit(event) {
    // for each key in reducers
    Object
      .keys(reducers)
      .forEach(key => {
        if (!Array.isArray(reducers[key])){
          // if not array must be a reducer
          return setReducerToState(key, reducers[key], event)
        }
        reducers[key]
          .forEach(reducer =>
            setReducerToState(key, reducer, event)
          )
      })
  }

  function getState(){
    return state
  }

  function setReducerToState(key, reducer, event) {
    const newState = reducer(state[key], event)

    if (state[key] !== newState) {
      callSubscribersWithState(
        subscribers[key],
        newState
      )
    }

    state[key] = newState
  }

  function subscribe(key, callback) {
    if (!subscribers[key]) { subscribers[key] = [] }

    subscribers[key].push(callback)
  }

  function unsubscribe(key, cb) {
    subscribers[key] &&
    subscribers[key]
      .every((func, i) => {
        if (cb === func) {
          return subscribers[key].splice(i, 1)
        }
      })
  }

  return publicApi
}
