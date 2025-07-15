// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { Lock, User, Shield, Eye, EyeOff, AlertCircle } from 'react-feather';
// import { motion } from 'framer-motion';

// const LoginPage = ({ setIsLoggedIn }) => {
//   const [credentials, setCredentials] = useState({ username: '', password: '' });
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const [focusedInput, setFocusedInput] = useState(null);
//   const navigate = useNavigate();

//   const theme = {
//     systemName: 'TRAFFISCAN',
//     tagline: 'Traffic Violation Management System',
//     logoIcon: <Shield size={32} color="white" />,
//     primaryColor: '#1a365d',
//     primaryHoverColor: '#2c5282',
//     accentColor: '#e53e3e',
//     borderColor: '#e2e8f0',
//     lightText: '#718096',
//     darkText: '#2d3748',
//     quote: '"To Protect and Serve with Integrity"'
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setCredentials(prev => ({ ...prev, [name]: value }));
//     setError('');
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);

//     try {
//       const response = await axios.post('http://localhost:5000/api/login', credentials);

//       if (response.status === 200) {
//         setIsLoggedIn(true);
//         navigate('/home');
//       } else {
//         setError('Invalid credentials. Access denied.');
//       }
//     } catch (error) {
//       setError('Invalid username or password. Try again.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div style={styles.pageContainer}>
//       <motion.div 
//         style={styles.loginBox}
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//       >
//         <div style={styles.logoHeader}>
//           <div style={styles.badgeIcon}>
//             {theme.logoIcon}
//           </div>
//           <h1 style={styles.systemTitle}>{theme.systemName}</h1>
//           <p style={styles.tagline}>{theme.tagline}</p>
//         </div>

//         <form onSubmit={handleSubmit}>
//           <div style={styles.inputContainer}>
//             <User style={styles.inputIcon} size={18} />
//             <input
//               type="text"
//               name="username"
//               value={credentials.username}
//               onChange={handleInputChange}
//               placeholder="Username"
//               required
//               style={{
//                 ...styles.formInput,
//                 ...(focusedInput === 'username' ? styles.formInputFocus : {})
//               }}
//               onFocus={() => setFocusedInput('username')}
//               onBlur={() => setFocusedInput(null)}
//             />
//           </div>

//           <div style={styles.inputContainer}>
//             <Lock style={styles.inputIcon} size={18} />
//             <input
//               type={showPassword ? "text" : "password"}
//               name="password"
//               value={credentials.password}
//               onChange={handleInputChange}
//               placeholder="Password"
//               required
//               style={{
//                 ...styles.formInput,
//                 ...(focusedInput === 'password' ? styles.formInputFocus : {})
//               }}
//               onFocus={() => setFocusedInput('password')}
//               onBlur={() => setFocusedInput(null)}
//             />
//             <button 
//               type="button" 
//               style={styles.passwordToggle}
//               aria-label="Toggle password visibility"
//               onClick={() => setShowPassword(!showPassword)}
//             >
//               {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
//             </button>
//           </div>

//           {error && (
//             <motion.div 
//               style={styles.errorMessage}
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//             >
//               <AlertCircle size={16} style={{ marginRight: '6px' }} />
//               {error}
//             </motion.div>
//           )}

//           <motion.button
//             type="submit"
//             disabled={isLoading}
//             style={{
//               ...styles.submitButton,
//               backgroundColor: isLoading ? theme.primaryHoverColor : theme.primaryColor
//             }}
//             whileHover={{ scale: 1.02 }}
//             whileTap={{ scale: 0.98 }}
//           >
//             {isLoading ? 'Authenticating...' : 'Access Control Room'}
//           </motion.button>
//         </form>

//         <p style={styles.quoteText}>{theme.quote}</p>

//         <div style={styles.footer}>
//           <div style={styles.securityInfo}>
//             <Shield size={14} style={{ marginRight: '4px' }} />
//             Secure Authentication
//           </div>
//           <div style={styles.copyright}>
//             &copy; {new Date().getFullYear()} {theme.systemName}.<br />
//             Restricted access for authorized personnel only.
//           </div>
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// const styles = {
//   pageContainer: {
//     background: 'linear-gradient(135deg, #1a365d 0%, #153e75 100%)',
//     height: '100vh',
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//     fontFamily: "'Inter', sans-serif"
//   },
//   loginBox: {
//     backgroundColor: 'white',
//     padding: '2.5rem',
//     borderRadius: '12px',
//     width: '420px',
//     maxWidth: '90%',
//     boxShadow: '0 15px 35px rgba(0, 0, 0, 0.2)'
//   },
//   logoHeader: {
//     textAlign: 'center',
//     marginBottom: '2rem'
//   },
//   badgeIcon: {
//     backgroundColor: '#1a365d',
//     width: '80px',
//     height: '80px',
//     borderRadius: '50%',
//     display: 'inline-flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: '1.5rem',
//     border: '4px solid white',
//     boxShadow: '0 4px 15px rgba(26, 54, 93, 0.3)'
//   },
//   systemTitle: {
//     color: '#1a365d',
//     fontSize: '1.8rem',
//     fontWeight: '800',
//     letterSpacing: '0.5px',
//     margin: '0.5rem 0'
//   },
//   tagline: {
//     color: '#718096',
//     fontSize: '0.9rem',
//     margin: 0,
//     fontWeight: '500'
//   },
//   inputContainer: {
//     position: 'relative',
//     marginBottom: '1.5rem'
//   },
//   inputIcon: {
//     position: 'absolute',
//     left: '14px',
//     top: '50%',
//     transform: 'translateY(-50%)',
//     color: '#a0aec0'
//   },
//   formInput: {
//     width: '100%',
//     padding: '0.85rem 1rem 0.85rem 42px',
//     border: '1px solid #e2e8f0',
//     borderRadius: '8px',
//     fontSize: '0.95rem',
//     transition: 'all 0.2s ease',
//     color: '#2d3748'
//   },
//   formInputFocus: {
//     borderColor: '#1a365d',
//     boxShadow: '0 0 0 3px rgba(26, 86, 219, 0.1)',
//     outline: 'none'
//   },
//   passwordToggle: {
//     position: 'absolute',
//     right: '12px',
//     top: '50%',
//     transform: 'translateY(-50%)',
//     background: 'none',
//     border: 'none',
//     color: '#a0aec0',
//     cursor: 'pointer',
//     padding: '4px'
//   },
//   submitButton: {
//     width: '100%',
//     padding: '0.9rem',
//     color: 'white',
//     border: 'none',
//     borderRadius: '8px',
//     fontSize: '1rem',
//     fontWeight: '600',
//     cursor: 'pointer',
//     transition: 'all 0.2s ease'
//   },
//   errorMessage: {
//     color: '#e53e3e',
//     fontSize: '0.875rem',
//     marginBottom: '1.2rem',
//     padding: '0.5rem',
//     backgroundColor: '#fff5f5',
//     borderRadius: '6px',
//     display: 'flex',
//     alignItems: 'center'
//   },
//   quoteText: {
//     color: '#4a5568',
//     fontStyle: 'italic',
//     textAlign: 'center',
//     margin: '1.8rem 0 1.5rem',
//     fontWeight: '500'
//   },
//   footer: {
//     textAlign: 'center',
//     color: '#718096',
//     fontSize: '0.75rem',
//     borderTop: '1px solid #edf2f7',
//     paddingTop: '1.2rem'
//   },
//   securityInfo: {
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     color: '#4a5568',
//     fontSize: '0.7rem',
//     fontWeight: '500',
//     marginBottom: '0.5rem'
//   },
//   copyright: {
//     fontSize: '0.7rem'
//   }
// };

// export default LoginPage;





import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Lock, User, Eye, EyeOff, AlertCircle } from 'react-feather';
import { motion } from 'framer-motion';

const LoginPage = ({ setIsLoggedIn }) => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [focusedInput, setFocusedInput] = useState(null);
  const navigate = useNavigate();

  const theme = {
    systemName: 'KAAPAAN',
    tagline: 'Traffic Violation Management System',
    logoPath: '/kaapaan1.png', // Path to your logo image in public folder
    primaryColor: '#1a365d',
    primaryHoverColor: '#2c5282',
    accentColor: '#e53e3e',
    borderColor: '#e2e8f0',
    lightText: '#718096',
    darkText: '#2d3748',
    quote: '"To Protect and Serve with Integrity"'
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // const response = await axios.post('http://localhost:5000/api/login', credentials);
            const response = await axios.post('https://kaapaan-backend.onrender.com/api/login', credentials);



      if (response.status === 200) {
        setIsLoggedIn(true);
        navigate('/home');
      } else {
        setError('Invalid credentials. Access denied.');
      }
    } catch (error) {
      setError('Invalid username or password. Try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={styles.pageContainer}>
      <motion.div 
        style={styles.loginBox}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div style={styles.logoHeader}>
          <div style={styles.logoContainer}>
            <img 
              src={theme.logoPath} 
              alt="TraffiScan Logo" 
              style={styles.logoImage}
            />
          </div>
          <h1 style={styles.systemTitle}>{theme.systemName}</h1>
          <p style={styles.tagline}>{theme.tagline}</p>
        </div>

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
              type={showPassword ? "text" : "password"}
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
              aria-label="Toggle password visibility"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {error && (
            <motion.div 
              style={styles.errorMessage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <AlertCircle size={16} style={{ marginRight: '6px' }} />
              {error}
            </motion.div>
          )}

          <motion.button
            type="submit"
            disabled={isLoading}
            style={{
              ...styles.submitButton,
              backgroundColor: isLoading ? theme.primaryHoverColor : theme.primaryColor
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {isLoading ? 'Authenticating...' : 'Access Control Room'}
          </motion.button>
        </form>

        <p style={styles.quoteText}>{theme.quote}</p>

        <div style={styles.footer}>
          <div style={styles.securityInfo}>
            <img src="/kaapaan.png" alt="Security" style={styles.securityIcon} />
            Secure Authentication
          </div>
          <div style={styles.copyright}>
            &copy; {new Date().getFullYear()} {theme.systemName}.<br />
            Restricted access for authorized personnel only.
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
    borderRadius: '12px',
    width: '420px',
    maxWidth: '90%',
    boxShadow: '0 15px 35px rgba(0, 0, 0, 0.2)'
  },
  logoHeader: {
    textAlign: 'center',
    marginBottom: '2rem'
  },
  logoContainer: {
    width: '100px',
    height: '100px',
    borderRadius: '50%',
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '1.5rem',
    border: '4px solid white',
    boxShadow: '0 4px 15px rgba(26, 54, 93, 0.3)',
    overflow: 'hidden',
    backgroundColor: 'white'
  },
 

// logoContainer: {
//   width: '100px',
//   height: '100px',
//   borderRadius: '50%',
//   display: 'inline-flex',
//   justifyContent: 'center',
//   alignItems: 'center',
//   marginBottom: '1.5rem',
//   border: '4px solid white',
//   boxShadow: '0 4px 15px rgba(26, 54, 93, 0.3)',
//   overflow: 'hidden',
//   backgroundColor: 'white'
// },

  logoImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover', // Changed from 'contain' to 'cover' to fill the circle
    objectPosition: 'center' // Ensures the center of the image is always visible
  },
  systemTitle: {
    color: '#1a365d',
    fontSize: '1.8rem',
    fontWeight: '800',
    letterSpacing: '0.5px',
    margin: '0.5rem 0'
  },
  tagline: {
    color: '#718096',
    fontSize: '0.9rem',
    margin: 0,
    fontWeight: '500'
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
    borderRadius: '8px',
    fontSize: '0.95rem',
    transition: 'all 0.2s ease',
    color: '#2d3748'
  },
  formInputFocus: {
    borderColor: '#1a365d',
    boxShadow: '0 0 0 3px rgba(26, 86, 219, 0.1)',
    outline: 'none'
  },
  passwordToggle: {
    position: 'absolute',
    right: '12px',
    top: '50%',
    transform: 'translateY(-50%)',
    background: 'none',
    border: 'none',
    color: '#a0aec0',
    cursor: 'pointer',
    padding: '4px'
  },
  submitButton: {
    width: '100%',
    padding: '0.9rem',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s ease'
  },
  errorMessage: {
    color: '#e53e3e',
    fontSize: '0.875rem',
    marginBottom: '1.2rem',
    padding: '0.5rem',
    backgroundColor: '#fff5f5',
    borderRadius: '6px',
    display: 'flex',
    alignItems: 'center'
  },
  quoteText: {
    color: '#4a5568',
    fontStyle: 'italic',
    textAlign: 'center',
    margin: '1.8rem 0 1.5rem',
    fontWeight: '500'
  },
  footer: {
    textAlign: 'center',
    color: '#718096',
    fontSize: '0.75rem',
    borderTop: '1px solid #edf2f7',
    paddingTop: '1.2rem'
  },
  securityInfo: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#4a5568',
    fontSize: '0.7rem',
    fontWeight: '500',
    marginBottom: '0.5rem'
  },
  securityIcon: {
    width: '14px',
    height: '14px',
    marginRight: '4px'
  },
  copyright: {
    fontSize: '0.7rem'
  }
};

export default LoginPage;