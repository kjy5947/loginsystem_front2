import React from 'react';
import { Link } from 'react-router-dom'

function Test({ token, login, logout }) {

    const testLogin = () => {
        login(document.getElementById("token"))
    }

    return (
        <div>
            <br />
            <br />
            <br />
            <h1> redux-router test [{token}]</h1>
            <br />
            <input id="token" />
            <button onClick={testLogin}> login </button>
            <button onClick={logout}> logout </button>
            <br />
            <Link to="/"> 홈으로 </Link>
        </div>
    )
}

export default Test;