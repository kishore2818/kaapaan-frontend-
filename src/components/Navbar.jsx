// import React, { useState } from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import { Menu, X, User } from 'lucide-react';

// function Navbar() {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const location = useLocation();

//   // Optional: Custom background only for certain routes
//   const isDashboard = location.pathname === '/trafficviolationDashboard';
//   const navBgClass = isDashboard ? 'bg-white' : 'bg-white';

//   return (
//     <nav
//     style={{ boxShadow: '0 4px 12px rgba(236, 226, 226, 0.92)' }}
//      className={`${navBgClass} bg-opacity-100 backdrop-blur-sm py-4 shadow-md`}>
//       <div className="w-full px-4">
//         <div className="flex justify-between items-center">

//           {/* Left: Logo and Title */}
//           <div className="flex items-center">
//             <Link to="/home" className="flex items-center space-x-2">
//               <img
//                 src="/traffic-light.svg"
//                 alt="Traffiscan Logo"
//                 className="h-8 w-auto animate-spin"
//               />
//               <span className="text-black text-3xl font-extrabold tracking-wide drop-shadow-lg transition transform hover:scale-105 active:scale-95">
//   Traffiscan
// </span>

//             </Link>
//           </div>

//           {/* Right: Desktop Navigation */}
//           <div className="hidden md:flex items-center space-x-8 ml-auto">
//             <Link to="/home" className="text-black hover:text-red-500">Home</Link>
//             <Link to="/about" className="text-black hover:text-red-500">About</Link>
//             <Link to="/contact" className="text-black hover:text-red-500">Contact us</Link>
//             <Link to="/settings" className="text-black hover:text-red-500">Settings</Link>
//             <Link to="/account" className="text-black hover:text-red-500">
//               <User size={24} />
//             </Link>
//           </div>

//           {/* Mobile Menu Button */}
//           <button 
//             className="md:hidden text-gray-800"
//             onClick={() => setIsMenuOpen(!isMenuOpen)}
//           >
//             {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
//           </button>
//         </div>

//         {/* Mobile Navigation */}
//         {isMenuOpen && (
//           <div className="md:hidden mt-4 bg-white bg-opacity-90 rounded-lg p-4 backdrop-blur-md">
//             <div className="flex flex-col space-y-4">
//               <Link to="/home" className="text-gray-800 hover:text-yellow-600" onClick={() => setIsMenuOpen(false)}>Home</Link>
//               <Link to="/about" className="text-gray-800 hover:text-yellow-600" onClick={() => setIsMenuOpen(false)}>About</Link>
//               <Link to="/contact" className="text-gray-800 hover:text-yellow-600" onClick={() => setIsMenuOpen(false)}>Contact us</Link>
//               <Link to="/settings" className="text-gray-800 hover:text-yellow-600" onClick={() => setIsMenuOpen(false)}>Settings</Link>
//               <Link to="/account" className="text-gray-800 hover:text-yellow-600 flex items-center space-x-2" onClick={() => setIsMenuOpen(false)}>
//                 <User size={20} />
//                 <span>Account</span>
//               </Link>
//             </div>
//           </div>
//         )}
//       </div>
//     </nav>
//   );
// }

// export default Navbar;



import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, User } from 'lucide-react';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  // Optional: Custom background only for certain routes
  const isDashboard = location.pathname === '/trafficviolationDashboard';
  const navBgClass = isDashboard ? 'bg-blue-900' : 'bg-blue-900';

  return (
    <nav
    style={{ boxShadow: '0 4px 12px rgba(240, 234, 234, 0.98)' }}
     className={`${navBgClass} bg-opacity-100 backdrop-blur-sm py-4 shadow-md`}>
      <div className="w-full px-4">
        <div className="flex justify-between items-center">

          {/* Left: Logo and Title */}
          <div className="flex items-center">
            <Link to="/home" className="flex items-center space-x-2">
              <img
                src="/traffic-light.svg"
                // src="/kaapaan.png"

                alt="Traffiscan Logo"
                className="h-8 w-auto animate-spin"
              />
              <span className="text-white text-3xl font-bold tracking-wide drop-shadow-lg transition transform hover:scale-105 active:scale-95">
  KAAPAAN
</span>

            </Link>
          </div>

          {/* Right: Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8 ml-auto">
            {/* <Link to="/" className="text-gray-200 hover:text-red-500">Home</Link> */}
            {/* <Link to="/about" className="text-gray-200 hover:text-red-500">About</Link> */}
            {/* <Link to="/contact" className="text-gray-200 hover:text-red-500">Contact us</Link> */}
            {/* <Link to="/settings" className="text-gray-200 hover:text-red-500">Settings</Link> */}
            <Link to="/account" className="text-gray-200 hover:text-red-500">
              <User size={24} />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-gray-800"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 bg-white bg-opacity-90 rounded-lg p-4 backdrop-blur-md">
            <div className="flex flex-col space-y-4">
              <Link to="/" className="text-gray-800 hover:text-yellow-600" onClick={() => setIsMenuOpen(false)}>Home</Link>
              <Link to="/about" className="text-gray-800 hover:text-yellow-600" onClick={() => setIsMenuOpen(false)}>About</Link>
              <Link to="/contact" className="text-gray-800 hover:text-yellow-600" onClick={() => setIsMenuOpen(false)}>Contact us</Link>
              <Link to="/settings" className="text-gray-800 hover:text-yellow-600" onClick={() => setIsMenuOpen(false)}>Settings</Link>
              <Link to="/account" className="text-gray-800 hover:text-yellow-600 flex items-center space-x-2" onClick={() => setIsMenuOpen(false)}>
                <User size={20} />
                <span>Account</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;