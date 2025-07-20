

// // import React, { useState } from 'react';
// // import { Link, useLocation } from 'react-router-dom';
// // import { Menu, X, User } from 'lucide-react';

// // function Navbar() {
// //   const [isMenuOpen, setIsMenuOpen] = useState(false);
// //   const location = useLocation();

// //   const isDashboard = location.pathname === '/trafficviolationDashboard';
// //   const navBgClass = isDashboard ? 'bg-blue-900' : 'bg-blue-900';

// //   return (
// //     <nav
// //       style={{ boxShadow: '0 4px 12px rgba(240, 234, 234, 0.98)' }}
// //       className={`${navBgClass} bg-opacity-100 backdrop-blur-sm py-4 shadow-md`}
// //     >
// //       <div className="w-full px-4">
// //         <div className="flex justify-between items-center">

// //           {/* Logo and Title */}
// //           <div className="flex items-center">
// //             <Link to="/home" className="flex items-center space-x-2">
// //               <img
// //                 src="/traffic-light.svg"
// //                 alt="Traffiscan Logo"
// //                 className="h-8 w-auto animate-spin"
// //               />
// //               <span className="text-white text-3xl font-bold tracking-wide drop-shadow-lg transition transform hover:scale-105 active:scale-95">
// //                 KAAPAAN
// //               </span>
// //             </Link>
// //           </div>

// //           {/* Right: Desktop Navigation */}
// //           <div className="hidden md:flex items-center space-x-8 ml-auto">
// //             <Link to="/account" className="text-gray-200 hover:text-red-500">
// //               <User size={24} />
// //             </Link>
// //           </div>

// //           {/* Mobile Menu Button */}
// //           <button 
// //             className="md:hidden text-white"
// //             onClick={() => setIsMenuOpen(!isMenuOpen)}
// //           >
// //             {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
// //           </button>
// //         </div>

// //         {/* Mobile Navigation: Only Account */}
// //         {isMenuOpen && (
// //           <div className="md:hidden mt-4 bg-white bg-opacity-90 rounded-lg p-4 backdrop-blur-md">
// //             <div className="flex flex-col space-y-4">
// //               <Link
// //                 to="/account"
// //                 className="text-gray-800 hover:text-yellow-600 flex items-center space-x-2"
// //                 onClick={() => setIsMenuOpen(false)}
// //               >
// //                 <User size={20} />
// //                 <span>Account</span>
// //               </Link>
// //             </div>
// //           </div>
// //         )}
// //       </div>
// //     </nav>
// //   );
// // }

// // export default Navbar;



// import React, { useState, useEffect } from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import { Menu, X, User } from 'lucide-react';

// function Navbar() {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [isMobile, setIsMobile] = useState(window.innerWidth < 960); // 960px breakpoint
//   const location = useLocation();

//   const isDashboard = location.pathname === '/trafficviolationDashboard';
//   const navBgClass = isDashboard ? 'bg-blue-900' : 'bg-blue-900';

//   // Update isMobile when window resizes
//   useEffect(() => {
//     const handleResize = () => {
//       setIsMobile(window.innerWidth < 960);
//     };

//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   return (
//     <nav
//       style={{ boxShadow: '0 4px 12px rgba(240, 234, 234, 0.98)' }}
//       className={`${navBgClass} bg-opacity-100 backdrop-blur-sm py-4 shadow-md`}
//     >
//       <div className="w-full px-4">
//         <div className="flex justify-between items-center">

//           {/* Logo and Title */}
//           <div className="flex items-center">
//             <Link to="/home" className="flex items-center space-x-2">
//               <img
//                 src="/traffic-light.svg"
//                 alt="Traffiscan Logo"
//                 className="h-8 w-auto animate-spin"
//               />
//               <span className="text-white text-3xl font-bold tracking-wide drop-shadow-lg transition transform hover:scale-105 active:scale-95">
//                 KAAPAAN
//               </span>
//             </Link>
//           </div>

//           {/* Right: Desktop Navigation */}
//           {!isMobile && (
//             <div className="flex items-center space-x-8 ml-auto">
//               <Link to="/account" className="text-gray-200 hover:text-red-500">
//                 <User size={24} />
//               </Link>
//             </div>
//           )}

//           {/* Mobile Menu Button */}
//           {isMobile && (
//             <button 
//               className="text-white"
//               onClick={() => setIsMenuOpen(!isMenuOpen)}
//             >
//               {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
//             </button>
//           )}
//         </div>

//         {/* Mobile Navigation: Only Account */}
//         {isMobile && isMenuOpen && (
//           <div className="mt-4 bg-white bg-opacity-90 rounded-lg p-4 backdrop-blur-md">
//             <div className="flex flex-col space-y-4">
//               <Link
//                 to="/account"
//                 className="text-gray-800 hover:text-yellow-600 flex items-center space-x-2"
//                 onClick={() => setIsMenuOpen(false)}
//               >
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




import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { User } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();
  const isDashboard = location.pathname === '/trafficviolationDashboard';
  const navBgClass = isDashboard ? 'bg-blue-900' : 'bg-blue-900';

  return (
    <nav
      style={{ boxShadow: '0 4px 12px rgba(240, 234, 234, 0.98)' }}
      className={`${navBgClass} bg-opacity-100 backdrop-blur-sm py-4 shadow-md`}
    >
      <div className="w-full px-4">
        <div className="flex justify-between items-center">

          {/* Logo and Title */}
          <div className="flex items-center">
            <Link to="/home" className="flex items-center space-x-2">
              <img
                src="/traffic-light.svg"
                alt="Traffiscan Logo"
                className="h-8 w-auto animate-spin"
              />
              <span className="text-white text-3xl font-bold tracking-wide drop-shadow-lg transition transform hover:scale-105 active:scale-95">
                KAAPAAN
              </span>
            </Link>
          </div>

          {/* Account Icon (always visible) */}
          <Link to="/account" className="text-gray-200 hover:text-red-500">
            <User size={24} />
          </Link>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;
