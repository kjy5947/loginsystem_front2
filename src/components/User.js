import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom';
import Add from './Add.css';

function User() {
    const [num, setNum] = useState(0)
    const [check, setCheck] = useState(0)
    const [email, setEmail] = useState("None")
    const [market, setMarket] = useState([])

    useEffect(() => {
        const a = localStorage.getItem('token')
        var headers = { 'X-AUTH-TOKEN': a }
        var data = { 'token': localStorage.getItem('token') }
        axios
            .post('http://18.234.107.127:8080/api/authapi', data, { headers })
            .then(
                res => {
                    setNum(1)
                    setEmail(res.data)
                },
                err => {
                    setNum(0)
                }
            ) //localStorage 로 대체해야 함
    })

    const delinfo = () => {
        var data = { owner: email }
        axios
            .post('http://18.234.107.127:8080/delinfo', data)
            .then(
                res => {
                    alert(res.data)
                },
                err => {
                }
            )
    }

    const onoff = () => {
        var data = { owner: email }
        axios
            .post('http://18.234.107.127:8080/onoff', data)
            .then(
                res => {
                    alert(res.data)
                },
                err => {
                }
            )
    }

    const postData = () => {
        var data = { owner: email }
        axios
            .post('http://18.234.107.127:8080/image', data)
            .then(
                res => {
                    setMarket(res.data)
                    setCheck(1)
                },
                err => {
                    setCheck(2)
                }
            )
        return
    }
    if (check == 0 && num == 1)
        postData()

    if (num == 0) {
        return (
            <div>
                <br />
                <br />
                <br />
                <h1> 로그인하세요 </h1>
                <Link to={'/login'} className="nav-link">Login</Link>
            </div>
        )
    }
    else if (num == 1 && market != []) {
        let state = " "
        if(market.onoff == 0)
            state = "닫힌"
        else
            state = "열린"

        return (
            <div>
                <br />
                <br />
                <br />
                <div className="part">
                    <h3> {email} 님 반갑습니다. </h3>
                    <p> 현재 {market.name} 라는 상점/버스킹을 운영 중입니다.</p>
                    <p> 현재 {state} 상태 입니다.</p>
                    <button onClick={onoff}> 상태 변경 </button>
                    <button onClick={delinfo}> 상점 삭제 </button>
                </div>

            </div>
        )
    }
    else if (num == 1 && market == [])
    {
        return(
            <div>
                <br />
                <br />
                <br />
                <div className="part">
                    <h3> {email} 님 반갑습니다. </h3>
                    <p> 상단의 [상점등록]을 눌러 당신의 상점을 등록하세요. </p>
                </div>

            </div>
        )
    }
    else 
    {
        return (
            <div>
                <br />
                <br />
                <br />
                <p> 정보를 가져오고 있습니다. </p>
            </div>
        )
    }
}

export default User
