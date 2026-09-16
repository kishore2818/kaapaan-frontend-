import React from 'react';
import { Link } from 'react-router-dom';
import { User } from 'lucide-react';

const Navbar = () => {
  return (
    <header className="z-50 w-full bg-[#1a365d] shadow-md">
      <div className="flex h-16 items-center justify-between px-6 md:px-10">
        {/* Logo & Product Name */}
        <Link to="/home" className="flex items-center gap-3 transition-opacity hover:opacity-90">
          <img
            src="/image.png"
            alt="KAAPAAN"
            className="h-12 w-auto object-contain"
          />
          <h1 className="text-xl font-black tracking-wider text-white md:text-2xl">
            KAAPAAN
          </h1>
        </Link>

        {/* Account Icon */}
        <Link
          to="/account"
          aria-label="Account"
          className="flex h-10 w-10 items-center justify-center text-white transition hover:scale-110 active:scale-95"
        >
          <User className="h-6 w-6" />
        </Link>
      </div>
    </header>
  );
};

export default Navbar;


