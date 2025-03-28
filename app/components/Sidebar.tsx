"use client";
import React, { useState } from "react";
import styles from "./Sidebar.module.css";
import { useDrag } from "react-dnd";
import DragBox from "../DraggableBox/DragBox";
import { useRef } from "react";
import LineCharto from "../components/LineCharto";
import DraggableWidget from "./DraggableWidget";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import {
  Home,
  LayoutDashboard,
  Users,
  Settings,
  Info,
  Menu,
  X,
} from "lucide-react";

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(true);

  return (
    <div className="flex w-full h-screen">
      {/* Sidebar */}
      <div
        className={`transition-all duration-300 shadow-lg bg-gray-900 text-white ${
          isOpen ? "w-64" : "w-16"
        } flex flex-col h-full`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <h1
            className={`text-xl font-bold transition-opacity ${
              isOpen ? "opacity-100" : "opacity-0 hidden"
            }`}
          >
            Dashboard
          </h1>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white focus:outline-none"
          >
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Sidebar Navigation */}
        <nav className="mt-4 space-y-2">
          <SidebarItem icon={<Home />} label="Home" isOpen={isOpen} />
          <SidebarItem
            icon={<LayoutDashboard />}
            label="Dashboard"
            isOpen={isOpen}
          />
          <SidebarItem icon={<Users />} label="Users" isOpen={isOpen} />
          <SidebarItem icon={<Settings />} label="Settings" isOpen={isOpen} />
          <SidebarItem icon={<Info />} label="About" isOpen={isOpen} />
        </nav>
        {/* ... 
        <DndProvider backend={HTML5Backend}>
           Draggable Widgets 
          <div className="mt-6 p-4 border-t border-gray-700">
            <h3 className="text-lg font-semibold mb-4">Widgets</h3>
            <div className="space-y-2">
              <DraggableWidget label="Line Chart" type="lineChart" />
              <DraggableWidget label="Bar Graph" type="barGraph" />
              <DraggableWidget label="Scatter Graph" type="scatterGraph" />
              <DraggableWidget label="Circle Graph" type="circleGraph" />
            </div>
          </div>
        </DndProvider>
        */}
      </div>
      {/* Contenu principal */}
      <div className="flex-1 h-full w-full bg-gray-100 p-8 overflow-auto">
        <DragBox />
      </div>
    </div>
  );
};

// Composant pour les éléments de la sidebar
const SidebarItem: React.FC<{
  icon: React.ReactNode;
  label: string;
  isOpen: boolean;
}> = ({ icon, label, isOpen }) => (
  <div className="flex items-center p-3 rounded-lg hover:bg-gray-700 cursor-pointer">
    {icon}
    {isOpen && <span className="ml-4">{label}</span>}
  </div>
);

export default Sidebar;
