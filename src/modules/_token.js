//import { combineReducers } from 'redux'

export const TOKEN_LOGIN = 'token/TOKEN_LOGIN'
export const TOKEN_LOGOUT = 'token/TOKEN_LOGOUT'

export const tokenLogin = token => ({ type: TOKEN_LOGIN, token })
export const tokenLogout = () => ({ type: TOKEN_LOGOUT })

const initialState = {
    token: '123'
}

export default function tokenReducer(state = initialState, action){
    switch (action.type) {
        case TOKEN_LOGIN:
            return { 
                ...state,
                token: action.token
            };
        case TOKEN_LOGOUT:
            return {
                ...state,
                token: 'None'
            }
        default:
            return state
    }
}