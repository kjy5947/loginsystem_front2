import React, { Component } from "react"
import { Link } from 'react-router-dom';
export default class Nav extends Component {

    // handleLogout=()=>{
    //     console.log("logout!!");
    //     localStorage.clear();
    //     this.props.setUser("noo");
        
    // };

    render() {
        let buttons;

        if(this.props.user){
            buttons=(
                <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <Link to={'/login'} onClick={function(e){
                                localStorage.clear();
                                this.props.setUser(null);
                            }.bind(this)} className="nav-link text-white">Logout</Link>
                        </li>
                        
                </ul>
        )
        }else if(this.props.user==null){
            buttons=(
                    <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <Link to={'/login'} className="nav-link text-white">Login</Link>
                            </li>
                            <li className="nav-item">
                                <Link to={'/register'} className="nav-link text-white">Sign up</Link>
                            </li>
                    </ul>
            )
        }


        return (
            <nav className="navbar navbar-expand navbar-light fixed-top">
                <div className="container">
                    <Link className="navbar-brand text-white" to={'/'}> Home </Link>
                    <Link className="navbar-brand text-white" to={'/gmap'}> 소상공인 </Link>
                    <Link className="navbar-brand text-white" to={'/gmap2'}> 버스킹,팝스토어 </Link>
                    <Link className="navbar-brand text-white" to={'/test'}> Test </Link>
                    <Link className="navbar-brand text-white" to={'/add'}>상점등록</Link>
                    <div className="collapse navbar-collapse">
                        {buttons}
                    </div>
                </div>
            </nav>
        );
    }
}