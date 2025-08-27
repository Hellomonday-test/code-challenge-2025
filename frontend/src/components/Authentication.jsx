import React, { useState } from 'react';
import axios from 'axios';
import './Authentication.css';

const Authentication = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState({ firstName: '', lastName: '' });
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({ email: '', password: '', login: '' });
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginData(prev => ({ ...prev, [name]: value }));
    
    // Clear errors when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
    if (errors.login) {
      setErrors(prev => ({ ...prev, login: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!loginData.email) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(loginData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!loginData.password) {
      newErrors.password = 'Password is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    try {
      const response = await axios.post('/login', {
        email: loginData.email,
        password: loginData.password
      });
      
      if (response.data.success) {
        sessionStorage.setItem('userEmail', loginData.email);
      } else {
        setErrors({ ...errors, login: response.data.message });
      }
    } catch (error) {
      setErrors({ ...errors, login: 'Login failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('userEmail');
    setIsLoggedIn(false);
    setUserInfo({ firstName: '', lastName: '' });
    setLoginData({ email: '', password: '' });
    setErrors({ email: '', password: '', login: '' });
  };

  if (isLoggedIn) {
    return (
      <div className="welcome-container">
        <div className="welcome-content">
          <h1>Welcome to Hellomonday - {userInfo.firstName} {userInfo.lastName}</h1>
          <button onClick={handleLogout} className="logout-button">
            Logout
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="login-container">
      <div className="login-left">
        <div className="logo-section">
          <div className="logo">
            <img src="/assets/images/hello_monday_logo.svg" alt="HelloMonday" className="logo-img" />
            <span className="logo-text">hellomonday</span>
          </div>
        </div>
        
        <div className="login-form-section">
          <h1 className="login-title">Log in</h1>
          
          <form onSubmit={handleLogin} className="login-form">
            <div className="form-group">
              <input
                type="email"
                id="email"
                name="email"
                value={loginData.email}
                onChange={handleInputChange}
                className={`form-input ${errors.email ? 'error' : ''}`}
                placeholder="Email address"
              />
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>
            
            <div className="form-group">
              <input
                type="password"
                id="password"
                name="password"
                value={loginData.password}
                onChange={handleInputChange}
                className={`form-input ${errors.password ? 'error' : ''}`}
                placeholder="Password"
              />
              {errors.password && <span className="error-message">{errors.password}</span>}
            </div>
            
            <div className="forgot-password">
              <a href="#" className="forgot-link">Forgot Password?</a>
            </div>
            
            {errors.login && <div className="login-error">{errors.login}</div>}
            
            <button 
              type="submit" 
              className="login-button"
              disabled={isLoading}
            >
              {isLoading ? 'Logging in...' : 'Log in'}
            </button>
          </form>
        </div>
        
        <div className="login-footer">
          <div className="legal-text">
            By accessing this service you are agree to the <a href="#" className="legal-link">Terms of Use</a> and to the collection, use and disclosure of your information in accordance with our <a href="#" className="legal-link">Privacy Policy</a>.
          </div>
          <div className="powered-by">
            <span>powered by</span>
            <div className="hudson-logo">Hudson</div>
          </div>
        </div>
      </div>
      
      <div className="login-right">
        <div className="hero-image"></div>
      </div>
    </div>
  );
};

export default Authentication;