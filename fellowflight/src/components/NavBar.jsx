import React from 'react';

// For the logo, you can use a component from a library like Lucide React,
// or a simple SVG placeholder like this one.
const AppLogo = () => (
    <svg className="h-8 w-8 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21.2 16.2a1 1 0 01-1.4 0L12 8.4l-7.8 7.8a1 1 0 01-1.4-1.4l8.5-8.5a1 1 0 011.4 0l8.5 8.5a1 1 0 010 1.4z"/>
    </svg>
);

export default function Navbar() {
  return (
    <nav className="bg-white p-4 shadow-sm">
      <div className="container mx-auto flex items-center justify-between">
        
        {/* Left side: Logo and App Name */}
        <div className="flex items-center space-x-2">
          {/* Logo (Placeholder or your own SVG/Image) */}
          <AppLogo />
          <span className="text-xl font-semibold text-primary-text">
            FellowFlightMatch
          </span>
        </div>
        
        {/* Right side: Creator Website */}

        <div className="flex gap-4">
          <a 
            href="https://abdullah.buzz"
            target="_blank"
            rel="noopener noreferrer"
            className="text-lg text-secondary-text text-green-500 font-normal hover:text-primary-text transition-colors duration-200"
          >
            matches
          </a>
          <a
            href="https://abdullah.buzz"
            target="_blank"
            rel="noopener noreferrer"
            className="text-lg text-secondary-text font-normal hover:text-primary-text transition-colors duration-200"
          >
            creator
          </a>
        </div>
        
      </div>
    </nav>
  );
}