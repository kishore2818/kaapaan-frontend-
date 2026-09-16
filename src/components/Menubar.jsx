import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

function Menubar() {
  const location = useLocation();

  const menuItems = [
    { path: '/criminal', label: 'Police Records', icon: '👤' },
    { path: '/statistics', label: 'Gov Analytics', icon: '📊' },
    { path: '/photos', label: 'Evidence Gallery', icon: '📸' },
    { path: '/history', label: 'Surveillance History', icon: '⏱' },
    { path: '/videos', label: 'Officer Review Desk', icon: '🎥' },
    { path: '/reports', label: 'Official Reports', icon: '📑' },
  ];

  return (
    <>
      <div className="fixed left-4 top-40 z-50 hidden flex-col gap-2 pt-20 md:flex">
        {menuItems.map((item, index) => (
          <motion.div
            key={item.path}
            initial={{ x: -30, opacity: 0 }}
            animate={{
              x: 0,
              opacity: 1,
              transition: {
                delay: index * 0.08,
                type: 'spring',
                stiffness: 300,
                damping: 20,
              },
            }}
            whileHover={{ x: 5 }}
          >
            <Link
              to={item.path}
              className={`
                relative flex items-center
                h-12 w-56
                pl-6 pr-10 py-2
                bg-gradient-to-r from-slate-100/95 to-slate-200/95
                text-sm font-semibold text-slate-900
                shadow-lg transition-all duration-200
                clip-arrow-right group
                border-l-4 ${
                  location.pathname === item.path
                    ? 'border-[#0f2745] bg-gradient-to-r from-white to-slate-200'
                    : 'border-transparent hover:border-[#0f2745] hover:from-white hover:to-slate-300'
                }
              `}
            >
              <span className="mr-3 text-lg">{item.icon}</span>
              <span className="group-hover:text-slate-950">{item.label}</span>
            </Link>
          </motion.div>
        ))}
      </div>

      <style jsx>{`
        .clip-arrow-right {
          clip-path: polygon(0% 0%, 88% 0%, 100% 50%, 88% 100%, 0% 100%);
          transition: clip-path 0.3s ease;
        }
        .clip-arrow-right:hover {
          clip-path: polygon(0% 0%, 92% 0%, 100% 50%, 92% 100%, 0% 100%);
        }
      `}</style>
    </>
  );
}

export default Menubar;
