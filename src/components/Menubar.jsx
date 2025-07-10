import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

function Menubar() {
  const [isOpen, setIsOpen] = useState(false);
  const [visibleItems, setVisibleItems] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const menuItems = [
    { path: "/statistics", label: "Statistics", icon: "📊" },
    { path: "/photos", label: "Violation Clips", icon: "📸" },
    { path: "/history", label: "Detection History", icon: "⏱" },
    { path: "/videos", label: "Verified Status", icon: "🎥" },
    { path: "/reports", label: "Reports", icon: "📑" },
  ];

  const toggleMenu = () => {
    const newState = !isOpen;
    setIsOpen(newState);
    if (newState) {
      setCurrentIndex(0);
      setVisibleItems([]);
    }
  };

  useEffect(() => {
    if (!isOpen) return;

    const timer = setInterval(() => {
      if (currentIndex < menuItems.length) {
        setVisibleItems(prev => [...prev, menuItems[currentIndex]]);
        setCurrentIndex(prev => prev + 1);
      } else {
        clearInterval(timer);
      }
    }, 120);

    return () => clearInterval(timer);
  }, [isOpen, currentIndex]);

  return (
    <>
      {/* Menu Icon Trigger */}
      <div
        onClick={toggleMenu}
        className="fixed top-28 left-6 z-50 p-1 rounded-full bg-gray-200 shadow-md hover:shadow-lg cursor-pointer transition"
      >
        <img
  src="menu.png"
  alt="menu"
  className={`w-10 h-10 rounded-full ${isOpen ? 'rotate-180' : ''} transition-transform`}
/>

      </div>

      {/* Amber Arrow Buttons */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed top-20 left-0 h-[calc(100%-5rem)] z-40 pl-4">
            <div className="flex flex-col gap-1 pt-40">
              {visibleItems.map((item, index) => (
                <motion.div
                  key={item.path}
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ 
                    x: 0, 
                    opacity: 1,
                    transition: { 
                      type: "spring", 
                      stiffness: 400,
                      damping: 25,
                      delay: index * 0.08 
                    }
                  }}
                  exit={{ x: -50, opacity: 0 }}
                  whileHover={{ x: 5 }}
                >
                  <Link
  to={item.path}
  className={`
    relative
    flex items-center
    pl-6 pr-10 py-2
    h-12
    bg-gradient-to-r from-gray-200/90 to-gray-300/90
    hover:from-gray-100 hover:to-blue-900
    text-gray-900
    text-sm font-semibold
    shadow-lg
    hover:shadow-xl
    transition-all
    duration-200
    w-45
    clip-arrow-right
    group
    border-l-4 border-blue-900
    hover:border-blue-900
  `}
  onClick={() => setIsOpen(false)}
>
  <span className="text-lg mr-3 text-gray-800">{item.icon}</span>
  <span className="text-gray-900 group-hover:text-gray-800">{item.label}</span>
</Link>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* CSS for arrow shape */}
      <style jsx>{`
        .clip-arrow-right {
          clip-path: polygon(
            0% 0%,
            88% 0%,
            100% 50%,
            88% 100%,
            0% 100%
          );
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .clip-arrow-right:hover {
          clip-path: polygon(
            0% 0%,
            92% 0%,
            100% 50%,
            92% 100%,
            0% 100%
          );
        }
      `}</style>
    </>
  );
}

export default Menubar;