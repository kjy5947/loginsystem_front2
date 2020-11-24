// import React from 'react';
// import Axios from 'axios';
// import { Link } from 'react-router-dom';

// class Join extends React.Component {

//     join() {
//         var request = {
//             email: document.getElementById("email").value.toString(),
//             password: document.getElementById("password").value.toString()
//         }

//         var a = JSON.stringify(request)
//         var headers = {
//             'Content-Type':'application/json'
//         }
//         Axios.post("http://18.234.107.127:8080/api/users/register", a, { headers })
//             .then(res => {
//                 console.log(res);
//                 console.log(res.data);
//             })
//     }
    
//     render() {
//         return (
//         <div>
//             <h2>
//             회원가입 창
//             </h2>
//             <input id="email" placeholder="이메일을 입력하세요"></input>
//             <input id="password" placeholder="비밀번호를 입력하세요"></input>
//             <input id="기업구분" placeholder="비밀번호를 입력하세요"></input>
//             <div>
//                 <button class="dropdwon-content">
//                     기업구분
//                 </button>
//                     <a href="#">link1</a>
//                     <a href="#">link2</a>
//             </div>
//             <button onClick={ this.join }> 회원가입 </button>
//             <br/>
//             <br/>
//             <Link to="/"> 홈으로 </Link>
//         </div>
//         );
//     }
// }

// export default Join;