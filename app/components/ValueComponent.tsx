"use client";
import React, { useState, useEffect } from "react";

interface Range {
  min: number;
  max: number;
}

interface Action {
  type: "hide" | "show" | "blink";
  range: Range;
}

interface ValueComponentProps {
  value: number | string;
  unit?: string;
  decimalPlaces?: number;
  actions?: Action[];
}

const ValueComponent: React.FC<ValueComponentProps> = ({
  value,
  unit = "",
  decimalPlaces = 2,
  actions = [],
}) => {
  const [displayValue, setDisplayValue] = useState<string | number>(value);
  const [visible, setVisible] = useState(true);
  const [blinking, setBlinking] = useState(false);

  useEffect(() => {
    let formattedValue: string | number = value;

    // Formattage des nombres
    if (!isNaN(Number(value))) {
      formattedValue = Number(value).toFixed(decimalPlaces);
    }

    setDisplayValue(formattedValue);

    // Gestion des actions (hide, show, blink)
    actions.forEach((action) => {
      const numericValue = Number(value); // Conversion
      const inRange =
        !isNaN(numericValue) &&
        numericValue >= action.range.min &&
        numericValue <= action.range.max;

      if (action.type === "hide") setVisible(!inRange);
      if (action.type === "show") setVisible(inRange);
    });
  }, [value, decimalPlaces, actions]);

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
    <div className="text-xl font-bold p-2 border rounded bg-gray-100 shadow">
      {displayValue} {unit}
    </div>
  ) : null;
};

export default ValueComponent;
