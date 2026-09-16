import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Lock, User, Eye, EyeOff, AlertCircle } from 'react-feather';
import { motion } from 'framer-motion';
import { apiUrl } from '../lib/api';

const LoginPage = ({ setIsLoggedIn }) => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [focusedInput, setFocusedInput] = useState(null);
  const navigate = useNavigate();

  const theme = {
    systemName: 'K A A P A A N',
    tagline: 'AI-Enabled Government Traffic Intelligence Platform',
    logoPath: '/image.png', // must be inside public/
    primaryColor: '#1a365d',
    primaryHoverColor: '#2c5282',
    accentColor: '#e53e3e',
    quote: '"Secure technology for public safety, governance, and road intelligence."'
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      if (credentials.username === 'admin' && credentials.password === 'admin123') {
        setIsLoggedIn(true);
        navigate('/home');
      } else {
        setError('Invalid credentials. Access denied.');
      }
      setIsLoading(false);
    }, 500); // Simulate network delay
  };

  return (
    <div style={styles.pageContainer}>
      <motion.div
        style={styles.loginBox}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* LOGO HEADER */}
        <div style={styles.logoHeader}>
          <div style={styles.logoContainer}>
            <img
              src={theme.logoPath}
              alt="KAAPAAN Logo"
              style={styles.logoImage}
            />
          </div>
          <h1 style={styles.systemTitle}>{theme.systemName}</h1>
          <p style={styles.tagline}>{theme.tagline}</p>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit}>
          <div style={styles.inputContainer}>
            <User style={styles.inputIcon} size={18} />
            <input
              type="text"
              name="username"
              value={credentials.username}
              onChange={handleInputChange}
              placeholder="Username"
              required
              style={{
                ...styles.formInput,
                ...(focusedInput === 'username' ? styles.formInputFocus : {})
              }}
              onFocus={() => setFocusedInput('username')}
              onBlur={() => setFocusedInput(null)}
            />
          </div>

          <div style={styles.inputContainer}>
            <Lock style={styles.inputIcon} size={18} />
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={credentials.password}
              onChange={handleInputChange}
              placeholder="Password"
              required
              style={{
                ...styles.formInput,
                ...(focusedInput === 'password' ? styles.formInputFocus : {})
              }}
              onFocus={() => setFocusedInput('password')}
              onBlur={() => setFocusedInput(null)}
            />
            <button
              type="button"
              style={styles.passwordToggle}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {error && (
            <motion.div style={styles.errorMessage} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <AlertCircle size={16} style={{ marginRight: '6px' }} />
              {error}
            </motion.div>
          )}

          <motion.button
            type="submit"
            disabled={isLoading}
            style={{
              ...styles.submitButton,
              backgroundColor: isLoading
                ? theme.primaryHoverColor
                : theme.primaryColor
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {isLoading ? 'Authenticating...' : 'Access Government Console'}
          </motion.button>
        </form>

        <p style={styles.quoteText}>{theme.quote}</p>

        <div style={styles.footer}>
          <div style={styles.securityInfo}>
            <img src="/kaapaan.png" alt="Security" style={styles.securityIcon} />
            Secure GovTech Authentication
          </div>
          <div style={styles.copyright}>
            © {new Date().getFullYear()} KAAPAAN.<br />
            Authorized government and enforcement personnel only.
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const styles = {
  pageContainer: {
    background: 'linear-gradient(135deg, #1a365d 0%, #153e75 100%)',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: "'Inter', sans-serif"
  },
  loginBox: {
    backgroundColor: 'white',
    padding: '2.5rem',
    borderRadius: '14px',
    width: '420px',
    boxShadow: '0 15px 35px rgba(0,0,0,0.2)'
  },
  logoHeader: {
    textAlign: 'center',
    marginBottom: '2rem'
  },

  /* 🔥 PERFECT LOGO CIRCLE */
  logoContainer: {
    width: '110px',
    height: '110px',
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '0 auto 1.5rem',
    backgroundColor: '#ffffff',
    boxShadow: '0 6px 18px rgba(26, 54, 93, 0.35)',
    overflow: 'hidden'
  },
  logoImage: {
    width: '92%',
    height: '92%',
    objectFit: 'contain',
    objectPosition: 'center'
  },

  systemTitle: {
    color: '#1a365d',
    fontSize: '1.9rem',
    fontWeight: '800'
  },
  tagline: {
    color: '#718096',
    fontSize: '0.9rem'
  },
  inputContainer: {
    position: 'relative',
    marginBottom: '1.5rem'
  },
  inputIcon: {
    position: 'absolute',
    left: '14px',
    top: '50%',
    transform: 'translateY(-50%)',
    color: '#a0aec0'
  },
  formInput: {
    width: '100%',
    padding: '0.85rem 1rem 0.85rem 42px',
    border: '1px solid #e2e8f0',
    borderRadius: '8px'
  },
  formInputFocus: {
    borderColor: '#1a365d',
    boxShadow: '0 0 0 3px rgba(26, 54, 93, 0.15)',
    outline: 'none'
  },
  passwordToggle: {
    position: 'absolute',
    right: '12px',
    top: '50%',
    transform: 'translateY(-50%)',
    background: 'none',
    border: 'none',
    cursor: 'pointer'
  },
  submitButton: {
    width: '100%',
    padding: '0.9rem',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontWeight: '600'
  },
  errorMessage: {
    color: '#e53e3e',
    fontSize: '0.85rem',
    marginBottom: '1rem',
    display: 'flex',
    alignItems: 'center'
  },
  quoteText: {
    textAlign: 'center',
    fontStyle: 'italic',
    margin: '1.8rem 0'
  },
  footer: {
    textAlign: 'center',
    fontSize: '0.75rem',
    borderTop: '1px solid #edf2f7',
    paddingTop: '1rem'
  },
  securityInfo: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '6px'
  },
  securityIcon: {
    width: '14px',
    height: '14px'
  },
  copyright: {
    marginTop: '0.5rem'
  }
};

export default LoginPage;
