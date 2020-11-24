export const MENU_ON = 'menu/MENU_ON'
export const MENU_OFF = 'menu/MENU_OFF'

export const menuOn = () => ({ type: MENU_ON })
export const menuOff = () => ({ type: MENU_OFF })

const initialState = {
    onoff: false
}

export default function menuReducer(state = initialState, action) {
    switch (action.type){
        case MENU_ON:
            return {
                ...state,
                onoff: true
            };
        case MENU_OFF:
            return {
                ...state,
                onoff: false
            }
        default:
            return state
    }
}