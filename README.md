## Table of Contents
- [Install](#install)
- [Usage](#basic-usage)
- [API](#api)

## Install

```sh
$ npm install --save @jessemc98/simple-store
```

Then with a module bundler like [rollup](http://rollupjs.org/) or [webpack](https://webpack.js.org/), use as you would anything else:

```javascript
// using ES6 modules
import createStore from '@jessemc98/simple-store'

// using CommonJS modules
var createStore = require('@jessemc98/simple-store')
```

## Basic Usage

```js
function numberReducer(state, event) {
  switch (event.type) {
    case "increment":
      return state + 1
    case "decrement":
      return state - 1
    default:
      return state
  }
}
const subscribers = { number: numberReducer }
const initialState = { number: 10 }

const store = createStore(subscribers, initialState)

store.emit({type: "increment"})
// expect(store.getState().number).toEqual(11)
store.emit({type: "decrement"})
// expect(store.getState().number).toEqual(10)
```

## API

### createStore

**simple-store** is an experimental way to deal with state in javascript, inspired by redux.

Returns **simple-store**

**Parameters**

-   `reducers` **Object** Required. Object full of **[Reducer](#reducer-function)** functions.
-   `initialState` **Object** Object with the same shape as reducers parameter with initial values to set to state.

#### emit

Calls all [reducers](#Reducer) in store with `event` and current state and sets the new state to the value returned by the reducers.

**Parameters**

-   `event` **[Custom event object](#custom-event-object)** Required. An event object to emit.

#### getState

Returns the current state of the store. Do not mutate any values of the returned object directly, emit events whenever you want to cause a state change otherwise subscribers will not fire.

#### subscribe

Subscribe to a given `key` in state.

**Parameters**

-   `key` **String** Required. Key in state to watch for changes.
-   `callback` **Function** Handler function to call with new value of `state[key]` whenever its value changes.

#### unsubscribe

Unsubscribe previously added **[subscriber](#subscribe)** from `key` in state.

**Parameters**

-   `key` **String** Required. Key in state to remove `callback` from.
-   `callback` **Function** Handler function to remove from any subscribers of `state[key]`.

#### Custom event object

Object you need to pass to `emit` method. The only limitation is the `type` property is required and must be a **String** but otherwise it can be any javascript object with any properties.

**Properties**

-   `type` **String** Required. Type of event to emit.

#### Reducer function

A js function which is called with `state` and `event` every time an event is emitted. State is set to the return value when a reducer is called.

If state is mutated but the same object is returned subscribers will not be called so if state changes the function should return a new object.

**Injected parameters**

-   `state` **any js value** Current state.
-   `event` **[Custom event Object](#custom-event-object)** The `event` which was emitted that caused reducers to be called.
