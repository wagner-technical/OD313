import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import poles from './poles'
import menu from './menu'
import {loadState, saveState} from './localStorage'

const reducer = combineReducers({poles, user, menu})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)

const persistedState = loadState()
const store = createStore(reducer, persistedState, middleware)
store.subscribe( () => {
  saveState({
    poles: store.getState().poles,
    menu: store.getState().menu
  })
})

export default store
export * from './poles'
export * from './user'
export * from './menu'
