import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div>
            <h2>
                메인 페이지
            </h2>
            <Link to="/login"> 로그인 </Link>
            <br/>
            <Link to="/join"> 회원가입 </Link>
            <br/>
            <Link to="/gmap"> 소상공인 위치 </Link>
            <br/>
            <h2>
                개발 중
            </h2>
            <Link to="/crud2"> CRUD2 </Link>
        </div>
    );
};

export default Home;