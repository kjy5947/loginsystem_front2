import React, { Component } from 'react';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';

export default class Login extends Component {

    state={}

    handleSubmit = e => {
        e.preventDefault();

        const data = {
            email: this.email,
            password: this.password
        }
        //

        axios.post('api/users/login', data)
            .then(res => {
               console.log(res.data);
                localStorage.setItem('token', res.data);
                localStorage.setItem('E-mail', this.email);

                this.setState({
                    loggedIn: true
                });
                console.log("Login_success");
                
              //this.props.history.push('/');
              this.props.setUser(res.data);//토큰값을 setUser속성값에 넣어줌.
            })
            .catch(err => {
                console.log(err)
            })
    };



    render() {
        //console.log("hello2");

        if(this.state.loggedIn){//이쪽으로 이동하면 로그인이 성공한거임.
            return <Redirect to={'/'} />;
        }

        return (
            <div className="auth-inner" >
                <form onSubmit={this.handleSubmit}>
                    <h3>Login</h3>

                    <div className="form-group">
                        <label>Email</label>
                        <input type="email" className="form-control" placeholder="Email"
                            onChange={e => this.email = e.target.value} />
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" className="form-control" placeholder="Password"
                            onChange={e => this.password = e.target.value} />
                    </div>

                    <button className="btn btn-success btn-block">Login</button>
                </form>
                <br />
                <Link to="/"> 홈으로 </Link>
            </div>
        );
    }
}