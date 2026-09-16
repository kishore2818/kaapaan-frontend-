

// // // import React from 'react';
// // // import { Routes, Route } from 'react-router-dom';
// // // import HomePage from './pages/HomePage.jsx';
// // // import AboutPage from './pages/AboutPage.jsx';
// // // import ContactPage from './pages/ContactPage.jsx';
// // // import SettingsPage from './pages/SettingsPage.jsx';
// // // import AccountPage from './pages/AccountPage.jsx';
// // // import Photos from './dashboard/Photos.jsx';
// // // import Videos from './dashboard/videos.jsx';
// // // import Statistics from './dashboard/statstics.jsx';
// // // import Reports from './dashboard/report.jsx';
// // // import History from './dashboard/history.jsx';
// // // import LoginPage from './pages/LoginPage.jsx'; 

// // // function App() {
// // //   return (
// // //     <Routes>
// // //       <Route path="/home" element={<HomePage />} />
// // //       <Route path="/" element={<LoginPage />} /> 
// // //       <Route path="/about" element={<AboutPage />} />
// // //       <Route path="/contact" element={<ContactPage />} />
// // //       <Route path="/settings" element={<SettingsPage />} />
// // //       <Route path="/account" element={<AccountPage />} />
// // //       <Route path="/dashboard/photos" element={<Photos />} />
// // //       <Route path="/dashboard/videos" element={<Videos />} />
// // //       <Route path="/statistics" element={<Statistics />} />
// // //       <Route path="/reports" element={<Reports />} />
// // //       <Route path="/history" element={<History />} />
// // //     </Routes>
// // //   );
// // // }

// // // export default App;





// // import React, { useState } from 'react';
// // import { Routes, Route, Navigate } from 'react-router-dom';
// // import HomePage from './pages/HomePage.jsx';
// // import AboutPage from './pages/AboutPage.jsx';
// // // import ContactPage from './pages/ContactPage.jsx';
// // // import SettingsPage from './pages/SettingsPage.jsx';
// // import AccountPage from './pages/AccountPage.jsx';
// // import Photos from './dashboard/Photos.jsx';
// // import Videos from './dashboard/videos.jsx';
// // import Statistics from './dashboard/statstics.jsx';
// // import Reports from './dashboard/report.jsx';
// // import History from './dashboard/history.jsx';
// // import LoginPage from './pages/LoginPage.jsx'; 

// // // PrivateRoute component checks isLoggedIn, else redirects to login
// // const PrivateRoute = ({ isLoggedIn, children }) => {
// //   return isLoggedIn ? children : <Navigate to="/" />;
// // };

// // function App() {
// //   const [isLoggedIn, setIsLoggedIn] = useState(false);

// //   return (
// //     <Routes>
// //       {/* Public route */}
// //       <Route path="/" element={<LoginPage setIsLoggedIn={setIsLoggedIn} />} />

// //       {/* Protected routes */}
// //       <Route path="/home" element={
// //         <PrivateRoute isLoggedIn={isLoggedIn}>
// //           <HomePage />
// //         </PrivateRoute>
// //       } />

// //       <Route path="/about" element={
// //         <PrivateRoute isLoggedIn={isLoggedIn}>
// //           <AboutPage />
// //         </PrivateRoute>
// //       } />

// //       {/* <Route path="/contact" element={
// //         <PrivateRoute isLoggedIn={isLoggedIn}>
// //           <ContactPage />
// //         </PrivateRoute>
// //       } />

// //       <Route path="/settings" element={
// //         <PrivateRoute isLoggedIn={isLoggedIn}>
// //           <SettingsPage />
// //         </PrivateRoute>
// //       } /> */}

// //       <Route path="/account" element={
// //         <PrivateRoute isLoggedIn={isLoggedIn}>
// //           <AccountPage />
// //         </PrivateRoute>
// //       } />

// //       <Route path="/photos" element={
// //         <PrivateRoute isLoggedIn={isLoggedIn}>
// //           <Photos />
// //         </PrivateRoute>
// //       } />

// //       <Route path="/videos" element={
// //         <PrivateRoute isLoggedIn={isLoggedIn}>
// //           <Videos />
// //         </PrivateRoute>
// //       } />

// //       <Route path="/statistics" element={
// //         <PrivateRoute isLoggedIn={isLoggedIn}>
// //           <Statistics />
// //         </PrivateRoute>
// //       } />

// //       <Route path="/reports" element={
// //         <PrivateRoute isLoggedIn={isLoggedIn}>
// //           <Reports />
// //         </PrivateRoute>
// //       } />

// //       <Route path="/history" element={
// //         <PrivateRoute isLoggedIn={isLoggedIn}>
// //           <History />
// //         </PrivateRoute>
// //       } />
// //     </Routes>
// //   );
// // }

// // export default App;









// import React, { useState } from 'react';
// import { Routes, Route, Navigate } from 'react-router-dom';
// import HomePage from './pages/HomePage.jsx';
// import AboutPage from './pages/AboutPage.jsx';
// import AccountPage from './pages/AccountPage.jsx';
// import Photos from './dashboard/Photos.jsx';
// import Videos from './dashboard/videos.jsx';
// import Statistics from './dashboard/statstics.jsx';
// import Reports from './dashboard/report.jsx';
// import History from './dashboard/history.jsx';
// import LoginPage from './pages/LoginPage.jsx';
// import CriminalPage from './dashboard/criminal.jsx'; // Add CriminalPage import

// // PrivateRoute component checks isLoggedIn, else redirects to login
// const PrivateRoute = ({ isLoggedIn, children }) => {
//   return isLoggedIn ? children : <Navigate to="/" />;
// };

// function App() {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   // Logout handler function
//   const handleLogout = () => {
//     setIsLoggedIn(false);
//   };

//   return (
//     <Routes>
//       {/* Public route */}
//       <Route 
//         path="/" 
//         element={<LoginPage setIsLoggedIn={setIsLoggedIn} />} 
//       />

//       {/* Protected routes */}
//       <Route 
//         path="/home" 
//         element={
//           <PrivateRoute isLoggedIn={isLoggedIn}>
//             <HomePage onLogout={handleLogout} />
//           </PrivateRoute>
//         } 
//       />

//       <Route 
//         path="/about" 
//         element={
//           <PrivateRoute isLoggedIn={isLoggedIn}>
//             <AboutPage onLogout={handleLogout} />
//           </PrivateRoute>
//         } 
//       />

//       <Route 
//         path="/account" 
//         element={
//           <PrivateRoute isLoggedIn={isLoggedIn}>
//             <AccountPage onLogout={handleLogout} />
//           </PrivateRoute>
//         } 
//       />

//       {/* Dashboard routes */}
//       <Route 
//         path="/photos" 
//         element={
//           <PrivateRoute isLoggedIn={isLoggedIn}>
//             <Photos onLogout={handleLogout} />
//           </PrivateRoute>
//         } 
//       />

//       <Route 
//         path="/videos" 
//         element={
//           <PrivateRoute isLoggedIn={isLoggedIn}>
//             <Videos onLogout={handleLogout} />
//           </PrivateRoute>
//         } 
//       />

//       <Route 
//         path="/statistics" 
//         element={
//           <PrivateRoute isLoggedIn={isLoggedIn}>
//             <Statistics onLogout={handleLogout} />
//           </PrivateRoute>
//         } 
//       />

//       <Route 
//         path="/reports" 
//         element={
//           <PrivateRoute isLoggedIn={isLoggedIn}>
//             <Reports onLogout={handleLogout} />
//           </PrivateRoute>
//         } 
//       />

//       <Route 
//         path="/history" 
//         element={
//           <PrivateRoute isLoggedIn={isLoggedIn}>
//             <History onLogout={handleLogout} />
//           </PrivateRoute>
//         } 
//       />

//       {/* New Criminal Database route */}
//       <Route 
//         path="/criminal" 
//         element={
//           <PrivateRoute isLoggedIn={isLoggedIn}>
//             <CriminalPage onLogout={handleLogout} />
//           </PrivateRoute>
//         } 
//       />

//       {/* Optional: Add a default redirect after login */}
//       <Route 
//         path="/dashboard" 
//         element={
//           <PrivateRoute isLoggedIn={isLoggedIn}>
//             <Navigate to="/criminal" replace />
//           </PrivateRoute>
//         } 
//       />

//       {/* Fallback route */}
//       <Route 
//         path="*" 
//         element={
//           <PrivateRoute isLoggedIn={isLoggedIn}>
//             <Navigate to="/criminal" replace />
//           </PrivateRoute>
//         } 
//       />
//     </Routes>
//   );
// }

// export default App;









// import React, { useEffect, useRef, useState } from "react";
// import { Routes, Route, Navigate } from "react-router-dom";
// import axios from "axios";

// import HomePage from "./pages/HomePage.jsx";
// import AboutPage from "./pages/AboutPage.jsx";
// import AccountPage from "./pages/AccountPage.jsx";
// import Photos from "./dashboard/Photos.jsx";
// import Videos from "./dashboard/videos.jsx";
// import Statistics from "./dashboard/statstics.jsx";
// import Reports from "./dashboard/report.jsx";
// import History from "./dashboard/history.jsx";
// import LoginPage from "./pages/LoginPage.jsx";
// import CriminalPage from "./dashboard/criminal.jsx";

// // ================= ALERT COMPONENT =================
// const AlertPopup = ({ alert, onClose, onViewDetails }) => {
//   if (!alert) return null;

//   return (
//     <div style={{
//       position: "fixed",
//       top: "20px",
//       right: "20px",
//       zIndex: 9999,
//       backgroundColor: "#ff4444",
//       color: "white",
//       padding: "15px",
//       borderRadius: "8px",
//       boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
//       minWidth: "300px",
//       maxWidth: "400px",
//       animation: "slideIn 0.3s ease-out"
//     }}>
//       <div style={{ display: "flex", alignItems: "flex-start", gap: "15px" }}>
//         {alert.imageUrl && (
//           <img 
//             src={alert.imageUrl} 
//             alt="Detection" 
//             style={{ 
//               width: "80px", 
//               height: "80px", 
//               borderRadius: "6px",
//               objectFit: "cover" 
//             }} 
//           />
//         )}
//         <div style={{ flex: 1 }}>
//           <div style={{ 
//             display: "flex", 
//             justifyContent: "space-between", 
//             alignItems: "center",
//             marginBottom: "8px" 
//           }}>
//             <h3 style={{ margin: 0, fontSize: "16px" }}>{alert.title}</h3>
//             <button 
//               onClick={onClose}
//               style={{
//                 background: "none",
//                 border: "none",
//                 color: "white",
//                 fontSize: "18px",
//                 cursor: "pointer",
//                 padding: "0"
//               }}
//             >
//               ×
//             </button>
//           </div>
//           <p style={{ margin: "5px 0", fontSize: "14px" }}>
//             <strong>Name:</strong> {alert.criminal_name || "Unknown"}
//           </p>
//           <p style={{ margin: "5px 0", fontSize: "14px" }}>
//             <strong>Camera:</strong> {alert.camera_no || "N/A"}
//           </p>
//           <p style={{ margin: "5px 0", fontSize: "14px" }}>
//             <strong>Time:</strong> {new Date(alert.timestamp).toLocaleTimeString()}
//           </p>
//           <div style={{ marginTop: "10px", display: "flex", gap: "10px" }}>
//             <button 
//               onClick={onViewDetails}
//               style={{
//                 backgroundColor: "white",
//                 color: "#ff4444",
//                 border: "none",
//                 padding: "6px 12px",
//                 borderRadius: "4px",
//                 cursor: "pointer",
//                 fontSize: "14px",
//                 fontWeight: "bold"
//               }}
//             >
//               View Details
//             </button>
//             <button 
//               onClick={onClose}
//               style={{
//                 backgroundColor: "transparent",
//                 color: "white",
//                 border: "1px solid white",
//                 padding: "6px 12px",
//                 borderRadius: "4px",
//                 cursor: "pointer",
//                 fontSize: "14px"
//               }}
//             >
//               Dismiss
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// // ================= PRIVATE ROUTE =================
// const PrivateRoute = ({ isLoggedIn, children }) => {
//   return isLoggedIn ? children : <Navigate to="/" />;
// };

// function App() {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [alerts, setAlerts] = useState([]);
//   const [currentAlertIndex, setCurrentAlertIndex] = useState(0);
//   const wsRef = useRef(null);
//   const reconnectIntervalRef = useRef(null);

//   // 🔹 Store known detection IDs (to avoid duplicate alerts)
//   const knownDetectionIds = useRef(new Set());

//   // ================= LOGOUT =================
//   const handleLogout = () => {
//     setIsLoggedIn(false);
//     // Close WebSocket on logout
//     if (wsRef.current) {
//       wsRef.current.close();
//       wsRef.current = null;
//     }
//   };

//   // ================= FETCH EXISTING DETECTIONS =================
//   const fetchInitialDetections = async () => {
//     try {
//       const res = await axios.get("/api/detections");

//       if (res.data?.success && Array.isArray(res.data.data)) {
//         res.data.data.forEach((d) => knownDetectionIds.current.add(d._id));
//       }
//     } catch (err) {
//       console.error("❌ Failed to fetch detections", err);
//     }
//   };

//   // ================= WEBSOCKET CONNECTION =================
//   const connectWebSocket = () => {
//     // Only connect if logged in
//     if (!isLoggedIn) return;

//     // Close existing connection if any
//     if (wsRef.current) {
//       wsRef.current.close();
//     }

//     try {
//       wsRef.current = new WebSocket("ws://98.94.85.231/ws");

//       wsRef.current.onopen = () => {
//         console.log("✅ WebSocket connected (detections)");
//         // Clear reconnect interval on successful connection
//         if (reconnectIntervalRef.current) {
//           clearInterval(reconnectIntervalRef.current);
//           reconnectIntervalRef.current = null;
//         }
//       };

//       wsRef.current.onmessage = (event) => {
//         try {
//           const msg = JSON.parse(event.data);

//           // 🔥 ONLY listen for detections
//           if (msg.type !== "NEW_DETECTION") return;

//           const detection = msg.data;
//           if (!detection?._id) return;

//           // ❌ Prevent duplicate alerts
//           if (knownDetectionIds.current.has(detection._id)) return;

//           knownDetectionIds.current.add(detection._id);

//           // Create alert object
//           const alertData = {
//             id: detection._id,
//             title: detection.status?.toLowerCase().includes("criminal") 
//               ? "🚨 Criminal Detected!" 
//               : detection.status?.toLowerCase().includes("missing")
//               ? "🧍 Missing Person Detected!"
//               : "⚠️ New Detection",
//             criminal_name: detection.criminal_name,
//             camera_no: detection.camera_no,
//             imageUrl: detection.imageUrl,
//             timestamp: detection.timestamp,
//             type: detection.status || detection.type || detection.label || "detection"
//           };

//           // Add to alerts array
//           setAlerts(prev => [...prev, alertData]);
          
//         } catch (err) {
//           console.error("WebSocket message error", err);
//         }
//       };

//       wsRef.current.onerror = (err) => {
//         console.error("❌ WebSocket error", err);
//       };

//       wsRef.current.onclose = () => {
//         console.log("🔌 WebSocket disconnected");
        
//         // Try to reconnect after 3 seconds if still logged in
//         if (isLoggedIn && !reconnectIntervalRef.current) {
//           reconnectIntervalRef.current = setInterval(() => {
//             console.log("🔄 Attempting to reconnect WebSocket...");
//             connectWebSocket();
//           }, 3000);
//         }
//       };
//     } catch (err) {
//       console.error("Failed to create WebSocket:", err);
//     }
//   };

//   // ================= EFFECTS =================
//   useEffect(() => {
//     if (isLoggedIn) {
//       fetchInitialDetections();
//       connectWebSocket();
//     } else {
//       // Cleanup when logged out
//       if (wsRef.current) {
//         wsRef.current.close();
//         wsRef.current = null;
//       }
//       if (reconnectIntervalRef.current) {
//         clearInterval(reconnectIntervalRef.current);
//         reconnectIntervalRef.current = null;
//       }
//     }

//     return () => {
//       // Cleanup on unmount
//       if (wsRef.current) {
//         wsRef.current.close();
//       }
//       if (reconnectIntervalRef.current) {
//         clearInterval(reconnectIntervalRef.current);
//       }
//     };
//   }, [isLoggedIn]);

//   // ================= AUTO-ADVANCE ALERTS =================
//   useEffect(() => {
//     if (alerts.length === 0) return;

//     const interval = setInterval(() => {
//       setCurrentAlertIndex(prev => {
//         if (prev >= alerts.length - 1) {
//           // Remove current alert and reset to 0
//           removeAlert(prev);
//           return 0;
//         }
//         return prev + 1;
//       });
//     }, 5000); // Change alert every 5 seconds

//     return () => clearInterval(interval);
//   }, [alerts]);

//   // ================= ALERT HANDLERS =================
//   const removeAlert = (index) => {
//     setAlerts(prev => prev.filter((_, i) => i !== index));
//     if (currentAlertIndex >= alerts.length - 1 && alerts.length > 1) {
//       setCurrentAlertIndex(0);
//     }
//   };

//   const handleCloseAlert = () => {
//     removeAlert(currentAlertIndex);
//   };

//   const handleViewDetails = () => {
//     // Navigate to criminal page or show details
//     window.location.href = "/criminal";
//   };

//   // ================= ROUTES =================
//   return (
//     <>
//       {/* Alert Popup - Only show when logged in */}
//       {isLoggedIn && alerts.length > 0 && alerts[currentAlertIndex] && (
//         <AlertPopup
//           alert={alerts[currentAlertIndex]}
//           onClose={handleCloseAlert}
//           onViewDetails={handleViewDetails}
//         />
//       )}

//       {/* Add CSS for animation */}
//       <style>
//         {`
//           @keyframes slideIn {
//             from {
//               transform: translateX(100%);
//               opacity: 0;
//             }
//             to {
//               transform: translateX(0);
//               opacity: 1;
//             }
//           }
//         `}
//       </style>

//       <Routes>
//         {/* Public */}
//         <Route
//           path="/"
//           element={<LoginPage setIsLoggedIn={setIsLoggedIn} />}
//         />

//         {/* Protected Pages */}
//         <Route
//           path="/home"
//           element={
//             <PrivateRoute isLoggedIn={isLoggedIn}>
//               <HomePage onLogout={handleLogout} />
//             </PrivateRoute>
//           }
//         />

//         <Route
//           path="/about"
//           element={
//             <PrivateRoute isLoggedIn={isLoggedIn}>
//               <AboutPage onLogout={handleLogout} />
//             </PrivateRoute>
//           }
//         />

//         <Route
//           path="/account"
//           element={
//             <PrivateRoute isLoggedIn={isLoggedIn}>
//               <AccountPage onLogout={handleLogout} />
//             </PrivateRoute>
//           }
//         />

//         {/* Dashboard */}
//         <Route
//           path="/photos"
//           element={
//             <PrivateRoute isLoggedIn={isLoggedIn}>
//               <Photos onLogout={handleLogout} />
//             </PrivateRoute>
//           }
//         />

//         <Route
//           path="/videos"
//           element={
//             <PrivateRoute isLoggedIn={isLoggedIn}>
//               <Videos onLogout={handleLogout} />
//             </PrivateRoute>
//           }
//         />

//         <Route
//           path="/statistics"
//           element={
//             <PrivateRoute isLoggedIn={isLoggedIn}>
//               <Statistics onLogout={handleLogout} />
//             </PrivateRoute>
//           }
//         />

//         <Route
//           path="/reports"
//           element={
//             <PrivateRoute isLoggedIn={isLoggedIn}>
//               <Reports onLogout={handleLogout} />
//             </PrivateRoute>
//           }
//         />

//         <Route
//           path="/history"
//           element={
//             <PrivateRoute isLoggedIn={isLoggedIn}>
//               <History onLogout={handleLogout} />
//             </PrivateRoute>
//           }
//         />

//         <Route
//           path="/criminal"
//           element={
//             <PrivateRoute isLoggedIn={isLoggedIn}>
//               <CriminalPage onLogout={handleLogout} />
//             </PrivateRoute>
//           }
//         />

//         {/* Default redirects */}
//         <Route
//           path="/dashboard"
//           element={
//             <PrivateRoute isLoggedIn={isLoggedIn}>
//               <Navigate to="/criminal" replace />
//             </PrivateRoute>
//           }
//         />

//         <Route
//           path="*"
//           element={
//             <PrivateRoute isLoggedIn={isLoggedIn}>
//               <Navigate to="/criminal" replace />
//             </PrivateRoute>
//           }
//         />
//       </Routes>
//     </>
//   );
// }

// export default App;











import React, { useEffect, useRef, useState } from "react";
import { Routes, Route, Navigate, useNavigate, useLocation } from "react-router-dom";

import HomePage from "./pages/HomePage.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import AccountPage from "./pages/AccountPage.jsx";
import Photos from "./dashboard/Photos.jsx";
import Videos from "./dashboard/videos.jsx";
import Statistics from "./dashboard/statstics.jsx";
import Reports from "./dashboard/report.jsx";
import History from "./dashboard/history.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import CriminalPage from "./dashboard/criminal.jsx";
import Navbar from "./components/Navbar";
import { wsUrl } from "./lib/api";

// ================= ALERT POPUP (CRIMINAL ONLY) =================
const AlertPopup = ({ alert, onClose, onViewDetails }) => {
  if (!alert) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: "20px",
        right: "20px",
        zIndex: 9999,
        backgroundColor: "#ff1e1e",
        color: "white",
        padding: "15px",
        borderRadius: "8px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
        minWidth: "320px",
        maxWidth: "420px",
        animation: "slideIn 0.3s ease-out",
      }}
    >
      <div style={{ display: "flex", gap: "15px" }}>
        {alert.imageUrl && (
          <img
            src={alert.imageUrl}
            alt="Criminal Detection"
            style={{
              width: "80px",
              height: "80px",
              borderRadius: "6px",
              objectFit: "cover",
            }}
          />
        )}

        <div style={{ flex: 1 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "8px",
            }}
          >
            <h3 style={{ margin: 0, fontSize: "16px" }}>
              🚨 Criminal Detected!
            </h3>
            <button
              onClick={onClose}
              style={{
                background: "none",
                border: "none",
                color: "white",
                fontSize: "18px",
                cursor: "pointer",
              }}
            >
              ×
            </button>
          </div>

          <p style={{ margin: "5px 0", fontSize: "14px" }}>
            <strong>Name:</strong> {alert.criminal_name || "Unknown"}
          </p>

          <p style={{ margin: "5px 0", fontSize: "14px" }}>
            <strong>Time:</strong>{" "}
            {new Date(alert.timestamp).toLocaleTimeString()}
          </p>

          <div style={{ marginTop: "10px", display: "flex", gap: "10px" }}>
            <button
              onClick={onViewDetails}
              style={{
                backgroundColor: "white",
                color: "#ff1e1e",
                border: "none",
                padding: "6px 12px",
                borderRadius: "4px",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              View Details
            </button>

            <button
              onClick={onClose}
              style={{
                backgroundColor: "transparent",
                color: "white",
                border: "1px solid white",
                padding: "6px 12px",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Dismiss
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ================= PRIVATE ROUTE =================
const PrivateRoute = ({ isLoggedIn, children }) => {
  return isLoggedIn ? children : <Navigate to="/" replace />;
};

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [alerts, setAlerts] = useState([]);
  const [currentAlertIndex, setCurrentAlertIndex] = useState(0);

  const wsRef = useRef(null);
  const reconnectIntervalRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const showNavbar = location.pathname !== "/";

  // ================= LOGOUT =================
  const handleLogout = () => {
    setIsLoggedIn(false);
    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
    }
  };

  // ================= WEBSOCKET =================
  const connectWebSocket = () => {
    if (!isLoggedIn) return;

    if (wsRef.current) wsRef.current.close();

    wsRef.current = new WebSocket(wsUrl());

    wsRef.current.onopen = () => {
      console.log("✅ WebSocket connected (criminal alerts)");
      if (reconnectIntervalRef.current) {
        clearInterval(reconnectIntervalRef.current);
        reconnectIntervalRef.current = null;
      }
    };

    wsRef.current.onmessage = (event) => {
      try {
        const msg = JSON.parse(event.data);

        // 🔥 ONLY CRIMINAL DETECTIONS
        if (msg.type !== "CRIMINAL_DETECTED") return;

        const alertData = {
          id: Date.now() + Math.random(),
          criminal_name: msg.name,
          imageUrl: msg.imageUrl,
          timestamp: msg.timestamp,
        };

        setAlerts((prev) => [...prev, alertData]);
      } catch (err) {
        console.error("WebSocket message error", err);
      }
    };

    wsRef.current.onclose = () => {
      console.log("🔌 WebSocket disconnected");
      if (isLoggedIn && !reconnectIntervalRef.current) {
        reconnectIntervalRef.current = setInterval(connectWebSocket, 3000);
      }
    };
  };

  // ================= EFFECT =================
  useEffect(() => {
    if (isLoggedIn) connectWebSocket();

    return () => {
      if (wsRef.current) wsRef.current.close();
      if (reconnectIntervalRef.current)
        clearInterval(reconnectIntervalRef.current);
    };
  }, [isLoggedIn]);

  // ================= AUTO ROTATE ALERTS =================
  useEffect(() => {
    if (alerts.length === 0) return;

    const interval = setInterval(() => {
      setCurrentAlertIndex((prev) =>
        prev >= alerts.length - 1 ? 0 : prev + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [alerts]);

  const handleCloseAlert = () => {
    setAlerts((prev) => prev.filter((_, i) => i !== currentAlertIndex));
    setCurrentAlertIndex(0);
  };

  const handleViewDetails = () => {
    navigate("/criminal");
  };

  // ================= ROUTES =================
  return (
    <>
      {showNavbar && <Navbar />}
      {/* Criminal Popup */}
      {isLoggedIn && alerts[currentAlertIndex] && (
        <AlertPopup
          alert={alerts[currentAlertIndex]}
          onClose={handleCloseAlert}
          onViewDetails={handleViewDetails}
        />
      )}

      {/* Animation */}
      <style>
        {`
          @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
          }
        `}
      </style>

      <Routes>
        {/* Public */}
        <Route path="/" element={<LoginPage setIsLoggedIn={setIsLoggedIn} />} />

        {/* Protected Pages */}
        <Route
          path="/home"
          element={
            <PrivateRoute isLoggedIn={isLoggedIn}>
              <HomePage onLogout={handleLogout} />
            </PrivateRoute>
          }
        />

        <Route
          path="/about"
          element={
            <PrivateRoute isLoggedIn={isLoggedIn}>
              <AboutPage onLogout={handleLogout} />
            </PrivateRoute>
          }
        />

        <Route
          path="/account"
          element={
            <PrivateRoute isLoggedIn={isLoggedIn}>
              <AccountPage onLogout={handleLogout} />
            </PrivateRoute>
          }
        />

        <Route
          path="/photos"
          element={
            <PrivateRoute isLoggedIn={isLoggedIn}>
              <Photos onLogout={handleLogout} />
            </PrivateRoute>
          }
        />

        <Route
          path="/videos"
          element={
            <PrivateRoute isLoggedIn={isLoggedIn}>
              <Videos onLogout={handleLogout} />
            </PrivateRoute>
          }
        />

        <Route
          path="/statistics"
          element={
            <PrivateRoute isLoggedIn={isLoggedIn}>
              <Statistics onLogout={handleLogout} />
            </PrivateRoute>
          }
        />

        <Route
          path="/reports"
          element={
            <PrivateRoute isLoggedIn={isLoggedIn}>
              <Reports onLogout={handleLogout} />
            </PrivateRoute>
          }
        />

        <Route
          path="/history"
          element={
            <PrivateRoute isLoggedIn={isLoggedIn}>
              <History onLogout={handleLogout} />
            </PrivateRoute>
          }
        />

        <Route
          path="/criminal"
          element={
            <PrivateRoute isLoggedIn={isLoggedIn}>
              <CriminalPage onLogout={handleLogout} />
            </PrivateRoute>
          }
        />

        {/* Default */}
        <Route
          path="/dashboard"
          element={<Navigate to="/criminal" replace />}
        />

        <Route
          path="*"
          element={<Navigate to={isLoggedIn ? "/criminal" : "/"} replace />}
        />
      </Routes>
    </>
  );
}

export default App;
