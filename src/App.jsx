// // import React from "react";
// // import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// // import LoginPage from "./user/loginpage";
// // import HomePage from "./user/homepage";
// // import VerifiedViolations from "./user/verifiedviolations"; // 👈 import the new page

// // function App() {
// //   return (
// //     <Router>
// //       <Routes>
// //         <Route path="/" element={<LoginPage />} />
// //         <Route path="/home" element={<HomePage />} />
// //         <Route path="/verified" element={<VerifiedViolations />} /> {/* ✅ new route */}
// //       </Routes>
// //     </Router>
// //   );
// // }

// // export default App;





// import React from 'react';
// import { Routes, Route } from 'react-router-dom';
// import HomePage from './pages/HomePage.jsx';
// import AboutPage from './pages/AboutPage.jsx';
// import ContactPage from './pages/ContactPage.jsx';
// import SettingsPage from './pages/SettingsPage.jsx';
// import AccountPage from './pages/AccountPage.jsx';
// import Photos from './dashboard/Photos.jsx';
// import Videos from './dashboard/videos.jsx';
// import Statistics from './dashboard/statstics.jsx';
// import Reports from './dashboard/report.jsx';
// import History from './dashboard/history.jsx';
// import LoginPage from './pages/LoginPage.jsx'; 

// function App() {
//   return (
//     <Routes>
//       <Route path="/home" element={<HomePage />} />
//       <Route path="/" element={<LoginPage />} /> 
//       <Route path="/about" element={<AboutPage />} />
//       <Route path="/contact" element={<ContactPage />} />
//       <Route path="/settings" element={<SettingsPage />} />
//       <Route path="/account" element={<AccountPage />} />
//       <Route path="/dashboard/photos" element={<Photos />} />
//       <Route path="/dashboard/videos" element={<Videos />} />
//       <Route path="/statistics" element={<Statistics />} />
//       <Route path="/reports" element={<Reports />} />
//       <Route path="/history" element={<History />} />
//     </Routes>
//   );
// }

// export default App;





import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage.jsx';
import AboutPage from './pages/AboutPage.jsx';
import ContactPage from './pages/ContactPage.jsx';
import SettingsPage from './pages/SettingsPage.jsx';
import AccountPage from './pages/AccountPage.jsx';
import Photos from './dashboard/Photos.jsx';
import Videos from './dashboard/videos.jsx';
import Statistics from './dashboard/statstics.jsx';
import Reports from './dashboard/report.jsx';
import History from './dashboard/history.jsx';
import LoginPage from './pages/LoginPage.jsx'; 

// PrivateRoute component checks isLoggedIn, else redirects to login
const PrivateRoute = ({ isLoggedIn, children }) => {
  return isLoggedIn ? children : <Navigate to="/" />;
};

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Routes>
      {/* Public route */}
      <Route path="/" element={<LoginPage setIsLoggedIn={setIsLoggedIn} />} />

      {/* Protected routes */}
      <Route path="/home" element={
        <PrivateRoute isLoggedIn={isLoggedIn}>
          <HomePage />
        </PrivateRoute>
      } />

      <Route path="/about" element={
        <PrivateRoute isLoggedIn={isLoggedIn}>
          <AboutPage />
        </PrivateRoute>
      } />

      <Route path="/contact" element={
        <PrivateRoute isLoggedIn={isLoggedIn}>
          <ContactPage />
        </PrivateRoute>
      } />

      <Route path="/settings" element={
        <PrivateRoute isLoggedIn={isLoggedIn}>
          <SettingsPage />
        </PrivateRoute>
      } />

      <Route path="/account" element={
        <PrivateRoute isLoggedIn={isLoggedIn}>
          <AccountPage />
        </PrivateRoute>
      } />

      <Route path="/photos" element={
        <PrivateRoute isLoggedIn={isLoggedIn}>
          <Photos />
        </PrivateRoute>
      } />

      <Route path="/videos" element={
        <PrivateRoute isLoggedIn={isLoggedIn}>
          <Videos />
        </PrivateRoute>
      } />

      <Route path="/statistics" element={
        <PrivateRoute isLoggedIn={isLoggedIn}>
          <Statistics />
        </PrivateRoute>
      } />

      <Route path="/reports" element={
        <PrivateRoute isLoggedIn={isLoggedIn}>
          <Reports />
        </PrivateRoute>
      } />

      <Route path="/history" element={
        <PrivateRoute isLoggedIn={isLoggedIn}>
          <History />
        </PrivateRoute>
      } />
    </Routes>
  );
}

export default App;
