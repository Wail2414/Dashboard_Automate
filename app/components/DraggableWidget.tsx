"use client";
import { useDrag } from "react-dnd";
import { useRef } from "react";

const DraggableWidget: React.FC<{ label: string; type: string }> = ({
  label,
  type,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "WIDGET",
    item: { type },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  drag(ref);

  return (
    <div
      ref={ref}
      className={`p-2 bg-gray-700 text-white rounded cursor-pointer text-center ${
        isDragging ? "opacity-50" : "opacity-100"
      }`}
    >
      {label} {/* ✅ Seulement du texte */}
    </div>
  );
};

export default DraggableWidget;
