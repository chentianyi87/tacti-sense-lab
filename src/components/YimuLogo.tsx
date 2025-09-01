import React from 'react';

interface YimuLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const YimuLogo: React.FC<YimuLogoProps> = ({ className = '', size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  return (
    <div className={`${sizeClasses[size]} ${className} relative`}>
      {/* YIMU geometric logo - pixelated/blocky design */}
      <svg viewBox="0 0 32 32" className="w-full h-full">
        {/* Main geometric pattern */}
        <rect x="0" y="0" width="4" height="4" fill="currentColor" />
        <rect x="4" y="0" width="4" height="4" fill="currentColor" />
        <rect x="8" y="0" width="4" height="4" fill="currentColor" />
        <rect x="12" y="0" width="4" height="4" fill="currentColor" />
        <rect x="16" y="0" width="4" height="4" fill="currentColor" />
        <rect x="20" y="0" width="4" height="4" fill="currentColor" />
        <rect x="24" y="0" width="4" height="4" fill="currentColor" />
        <rect x="28" y="0" width="4" height="4" fill="currentColor" />
        
        {/* Second row */}
        <rect x="0" y="4" width="4" height="4" fill="currentColor" />
        <rect x="4" y="4" width="4" height="4" fill="currentColor" opacity="0.8" />
        <rect x="8" y="4" width="4" height="4" fill="currentColor" opacity="0.6" />
        <rect x="12" y="4" width="4" height="4" fill="currentColor" opacity="0.4" />
        <rect x="16" y="4" width="4" height="4" fill="currentColor" opacity="0.4" />
        <rect x="20" y="4" width="4" height="4" fill="currentColor" opacity="0.6" />
        <rect x="24" y="4" width="4" height="4" fill="currentColor" opacity="0.8" />
        <rect x="28" y="4" width="4" height="4" fill="currentColor" />
        
        {/* Third row */}
        <rect x="0" y="8" width="4" height="4" fill="currentColor" />
        <rect x="4" y="8" width="4" height="4" fill="currentColor" opacity="0.6" />
        <rect x="8" y="8" width="4" height="4" fill="currentColor" opacity="0.3" />
        <rect x="12" y="8" width="4" height="4" fill="currentColor" opacity="0.2" />
        <rect x="16" y="8" width="4" height="4" fill="currentColor" opacity="0.2" />
        <rect x="20" y="8" width="4" height="4" fill="currentColor" opacity="0.3" />
        <rect x="24" y="8" width="4" height="4" fill="currentColor" opacity="0.6" />
        <rect x="28" y="8" width="4" height="4" fill="currentColor" />
        
        {/* Fourth row - center focus */}
        <rect x="0" y="12" width="4" height="4" fill="currentColor" />
        <rect x="4" y="12" width="4" height="4" fill="currentColor" opacity="0.4" />
        <rect x="8" y="12" width="4" height="4" fill="currentColor" opacity="0.2" />
        <rect x="12" y="12" width="4" height="4" fill="currentColor" />
        <rect x="16" y="12" width="4" height="4" fill="currentColor" />
        <rect x="20" y="12" width="4" height="4" fill="currentColor" opacity="0.2" />
        <rect x="24" y="12" width="4" height="4" fill="currentColor" opacity="0.4" />
        <rect x="28" y="12" width="4" height="4" fill="currentColor" />
        
        {/* Fifth row - center focus */}
        <rect x="0" y="16" width="4" height="4" fill="currentColor" />
        <rect x="4" y="16" width="4" height="4" fill="currentColor" opacity="0.4" />
        <rect x="8" y="16" width="4" height="4" fill="currentColor" opacity="0.2" />
        <rect x="12" y="16" width="4" height="4" fill="currentColor" />
        <rect x="16" y="16" width="4" height="4" fill="currentColor" />
        <rect x="20" y="16" width="4" height="4" fill="currentColor" opacity="0.2" />
        <rect x="24" y="16" width="4" height="4" fill="currentColor" opacity="0.4" />
        <rect x="28" y="16" width="4" height="4" fill="currentColor" />
        
        {/* Sixth row */}
        <rect x="0" y="20" width="4" height="4" fill="currentColor" />
        <rect x="4" y="20" width="4" height="4" fill="currentColor" opacity="0.6" />
        <rect x="8" y="20" width="4" height="4" fill="currentColor" opacity="0.3" />
        <rect x="12" y="20" width="4" height="4" fill="currentColor" opacity="0.2" />
        <rect x="16" y="20" width="4" height="4" fill="currentColor" opacity="0.2" />
        <rect x="20" y="20" width="4" height="4" fill="currentColor" opacity="0.3" />
        <rect x="24" y="20" width="4" height="4" fill="currentColor" opacity="0.6" />
        <rect x="28" y="20" width="4" height="4" fill="currentColor" />
        
        {/* Seventh row */}
        <rect x="0" y="24" width="4" height="4" fill="currentColor" />
        <rect x="4" y="24" width="4" height="4" fill="currentColor" opacity="0.8" />
        <rect x="8" y="24" width="4" height="4" fill="currentColor" opacity="0.6" />
        <rect x="12" y="24" width="4" height="4" fill="currentColor" opacity="0.4" />
        <rect x="16" y="24" width="4" height="4" fill="currentColor" opacity="0.4" />
        <rect x="20" y="24" width="4" height="4" fill="currentColor" opacity="0.6" />
        <rect x="24" y="24" width="4" height="4" fill="currentColor" opacity="0.8" />
        <rect x="28" y="24" width="4" height="4" fill="currentColor" />
        
        {/* Bottom row */}
        <rect x="0" y="28" width="4" height="4" fill="currentColor" />
        <rect x="4" y="28" width="4" height="4" fill="currentColor" />
        <rect x="8" y="28" width="4" height="4" fill="currentColor" />
        <rect x="12" y="28" width="4" height="4" fill="currentColor" />
        <rect x="16" y="28" width="4" height="4" fill="currentColor" />
        <rect x="20" y="28" width="4" height="4" fill="currentColor" />
        <rect x="24" y="28" width="4" height="4" fill="currentColor" />
        <rect x="28" y="28" width="4" height="4" fill="currentColor" />
      </svg>
    </div>
  );
};