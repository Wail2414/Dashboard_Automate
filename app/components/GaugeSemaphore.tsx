"use client";
import { useState, useEffect } from "react";

interface Range {
  min: number;
  max: number;
  color: string;
}

interface Action {
  type: "hide" | "show" | "blink"; // Limite les valeurs acceptées
  range: {
    min: number;
    max: number;
  };
}

interface GaugeSemaphoreProps {
  value: number;
  ranges: Range[];
  actions?: Action[];
  size?: number;
}

const GaugeSemaphore: React.FC<GaugeSemaphoreProps> = ({
  value,
  ranges,
  actions = [],
  size = 100,
}) => {
  const [color, setColor] = useState("#ccc");
  const [visible, setVisible] = useState(true);
  const [blinking, setBlinking] = useState(false);

  useEffect(() => {
    let newColor = "#ccc";
    ranges.forEach((range) => {
      if (value >= range.min && value <= range.max) {
        newColor = range.color;
      }
    });
    setColor(newColor);

    actions.forEach((action) => {
      const inRange = value >= action.range.min && value <= action.range.max;
      //if (action.type === "hide") setVisible(!inRange);
      if (action.type === "show") setVisible(inRange);
      //if (action.type === "blink") setBlinking(inRange);
    });
  }, [value, ranges, actions]);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (blinking) {
      interval = setInterval(() => {
        setVisible((prev) => !prev);
      }, 500);
    } else {
      setVisible(true);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [blinking]);

  return visible ? (
    <svg width={size} height={size} viewBox="0 0 100 100">
      <circle
        cx="50"
        cy="50"
        r="40"
        fill={color}
        stroke="#333"
        strokeWidth="3"
      />
    </svg>
  ) : null;
};

export default GaugeSemaphore;
