import React, { lazy, Suspense, useEffect, useRef, useState } from "react";
import { Routes, Route, Navigate, useNavigate, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import { wsUrl } from "./lib/api";

// ================= LAZY LOADED PAGES =================
const LoginPage = lazy(() => import("./pages/LoginPage.jsx"));
const HomePage = lazy(() => import("./pages/HomePage.jsx"));
const AboutPage = lazy(() => import("./pages/AboutPage.jsx"));
const AccountPage = lazy(() => import("./pages/AccountPage.jsx"));
const Photos = lazy(() => import("./dashboard/Photos.jsx"));
const Videos = lazy(() => import("./dashboard/videos.jsx"));
const Statistics = lazy(() => import("./dashboard/statstics.jsx"));
const Reports = lazy(() => import("./dashboard/report.jsx"));
const History = lazy(() => import("./dashboard/history.jsx"));
const CriminalPage = lazy(() => import("./dashboard/criminal.jsx"));

// ================= LOADING SPINNER =================
const LoadingSpinner = () => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "calc(100vh - 64px)",
      gap: "16px",
      background: "#0f172a",
    }}
  >
    <div
      style={{
        width: "48px",
        height: "48px",
        border: "4px solid rgba(255,255,255,0.1)",
        borderTop: "4px solid #3b82f6",
        borderRadius: "50%",
        animation: "spin 0.8s linear infinite",
      }}
    />
    <p style={{ color: "#94a3b8", fontSize: "14px", margin: 0 }}>Loading...</p>
    <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
  </div>
);

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
        console.error("WebSocket message error:", err);
      }
    };

    wsRef.current.onclose = () => {
      console.log("❌ WebSocket disconnected");
      if (isLoggedIn && !reconnectIntervalRef.current) {
        reconnectIntervalRef.current = setInterval(connectWebSocket, 5000);
      }
    };

    wsRef.current.onerror = () => {
      wsRef.current?.close();
    };
  };

  useEffect(() => {
    if (isLoggedIn) {
      connectWebSocket();
    }
    return () => {
      if (wsRef.current) wsRef.current.close();
      if (reconnectIntervalRef.current) clearInterval(reconnectIntervalRef.current);
    };
  }, [isLoggedIn]);

  // ================= ALERT ROTATION =================
  useEffect(() => {
    if (alerts.length <= 1) return;
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

      <Suspense fallback={<LoadingSpinner />}>
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
      </Suspense>
    </>
  );
}

export default App;
