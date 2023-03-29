import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import useCurrentUser from '../../stores/actions/useCurrentUser';
import { selectCurrentUser } from '../../stores/user.reducer';
import './login.scss';
import { useNavigate } from 'react-router-dom';


function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  // const currentUser= useSelector(selectCurrentUser)
  const {startLogin, loading,error, data}= useCurrentUser()

  useEffect(() => {
    const accessToken=localStorage.getItem('accessToken')
    if(accessToken)  navigate("/");
  }, [data])

  if (error) {
    console.log({error});
  }

  if(loading){
    return <>
   loading
    </>
  }
  if(data){
    localStorage.setItem('accessToken', data.login.accessToken);
    localStorage.setItem('user',JSON.stringify(data.login.user));
    window.location.reload();
  }



  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(`Email: ${email}, Password: ${password}`);
    startLogin({
      variables:{
        data:{
          email,
          password
        }
      }
    })
  }

  return (
    <div className="login-container">
      <div className="form-container">
        <h1 className="title">Login Page</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-container">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" value={email} onChange={handleEmailChange} />
          </div>
          <div className="input-container">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" value={password} onChange={handlePasswordChange} />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
