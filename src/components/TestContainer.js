import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import Test from './Test'
import { tokenLogin, tokenLogout} from '../modules/_token'

function TestContainer() {
    const { token } = useSelector(state => ({
        token: state.token.token
    }))
    const dispatch = useDispatch();
    const login = token => dispatch(tokenLogin(token))
    const logout = () => dispatch(tokenLogout())

    return (
        <Test
            token={token}
            login={login}
            logout={logout}
        />
    )
}

export default TestContainer