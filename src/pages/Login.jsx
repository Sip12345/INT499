import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();

  const handleLoginSuccess = (credentialResponse) => {
    console.log('Google login success', credentialResponse);
    localStorage.setItem('loggedIn', 'true');
    navigate('/');
  };

  const handleLoginFailure = () => {
    console.error('Google login failed');
  };

  return (
    <div className="login-page">
      <h1>Login to StreamList</h1>
      <GoogleLogin onSuccess={handleLoginSuccess} onError={handleLoginFailure} />
    </div>
  );
}
