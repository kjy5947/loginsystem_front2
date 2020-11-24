import React from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';

class Login extends React.Component {

    login() {
        var request = {
            "email": document.getElementById("email").value.toString(),
            "password": document.getElementById("password").value.toString()
        }
        var a = JSON.stringify(request)
        var headers = {
            'Content-Type':'application/json'
        }
        
        Axios.post("api/users/login", a , { headers } )
            .then(res => {
            console.log(res);
            console.log(res.data);
            this.props.history.push('/');
        })
    }
    
    render() {
        return (
        <div>
            <h2>
            로그인 창
            </h2>
            <input id="email" placeholder="이메일을 입력하세요"></input>
            <input id="password" placeholder="비밀번호를 입력하세요"></input>
            <button onClick={ this.login }> 로그인 </button>
            <br/>
            <br/>
            <Link to="/"> 홈으로 </Link>
        </div>
        );
    }
}

export default Login;