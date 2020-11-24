import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default class Register extends Component {

    constructor(props) {
        super(props);
        console.log("constructor");
        this.state = {
            type: 0
        };
    

      }

    handleSubmit = e => {
        e.preventDefault();
        console.log(this.type);
        let data = {
            
            email: this.email,
            password: this.password,
            type: this.type
           
        }
        console.log(this.type);
        console.log(this.email);
        axios.post('api/users/register', data)
            .then(
                res => {
                    console.log("join_sucess");
                }
            )
            .catch(
                err => {
                    console.log(err);
                    alert("회원가입에 실패하였습니다.");
                }
            )
    }//handleSubmit 

    handleChange = e => {
        
        console.log("handleChange:"+e.target.value);
        this.type=e.target.value;
        this.setState({type:e.target.value});
        console.log("handleChange!!:"+this.type);

      }//handleChange

//onSubmit이랑 onChange는 원래 있는 속성임
    render() {
        console.log("render");
        return (
            <div className="auth-inner" >
                <form onSubmit={this.handleSubmit}>
                    <h3>Sign up</h3>
                    
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
                    <div className="form-group">
                    <label>회원구분</label>
                        <select className="form-control"  onChange={this.handleChange}>
                
                            <option value="0">고객회원</option>
                            <option value="1">상인회원</option>
                            
                        </select>
                    </div>
                
                    <button className="btn btn-success btn-block">Sign Up</button>
                </form>
                <br />
                <Link to="/"> 홈으로 </Link>
            </div>
        );
    }
}