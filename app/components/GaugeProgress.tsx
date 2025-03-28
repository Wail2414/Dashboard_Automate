"use client";
import { useState, useEffect } from "react";

interface GaugeProgressProps {
  value: number;
  min?: number;
  max?: number;
  color?: string;
}

const GaugeProgress: React.FC<GaugeProgressProps> = ({
  value,
  min = 0,
  max = 100,
  color = "#3F4964",
}) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const clampedValue = Math.min(max, Math.max(min, value));
    const percentage = ((clampedValue - min) / (max - min)) * 100;
    setProgress(percentage);
  }, [value, min, max]);

  return (
    <div className="relative w-16 h-40 border border-gray-500 rounded-lg overflow-hidden bg-gray-200">
      <div
        className="absolute bottom-0 w-full transition-all"
        style={{
          height: `${progress}%`,
          backgroundColor: color,
        }}
      ></div>
      <p className="absolute bottom-0 left-0 right-0 text-center text-xs text-gray-800">
        {value}
      </p>
      <p className="absolute top-0 left-0 right-0 text-center text-xs text-gray-800">
        {max}
      </p>
      <p className="absolute bottom-0 left-0 right-0 text-center text-xs text-gray-800">
        {min}
      </p>
    </div>
  );
};

export default GaugeProgress;
