import React from 'react';

export const AnimatedDotsLoader: React.FC = () => {
  return (
    <div className="dots-loader">
      <span className="dot bg-green-500"></span>
      <span className="dot bg-red-500"></span>
      <span className="dot"></span>
    </div>
  );
};
