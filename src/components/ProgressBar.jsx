import { useState } from "react";

const CircularProgressBar = ({ percentage }) => {
  const radius = 50;
  const strokeWidth = 10;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex justify-center items-center">
      <svg
        className="transform text-green-400 -rotate-90"
        width="120"
        height="120"
        viewBox="0 0 120 120"
      >
        {/* Background Circle */}
        <circle
          cx="60"
          cy="60"
          r={radius}
          stroke="gray"
          strokeWidth={strokeWidth}
          fill="none"
        />
        {/* Progress Circle */}
        <circle
          cx="60"
          cy="60"
          r={radius}
          stroke="currentColor" // Using currentColor to make it dynamic
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          className="transition-all duration-1000"
        />
        {/* Center Text */}
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dy="0.3em"
          className="text-white text-xl font-semibold"
        >
          {percentage}%
        </text>
      </svg>
    </div>
  );
};

export default CircularProgressBar;
