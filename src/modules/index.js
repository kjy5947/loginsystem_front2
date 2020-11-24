import { combineReducers }from 'redux'
import menu from './_menu'
import token from './_token'

const rootReducer = combineReducers({
    token,
    menu
})

export default rootReducer