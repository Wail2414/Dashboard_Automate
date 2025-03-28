"use client";
import React, { useState } from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import LineCharto from "../components/LineCharto";
import BarGraph from "../components/BarGraph";
import ScatterGraph from "../components/ScatterGraph";
import CircleGraph from "../components/CircleGraph";
import GaugeProgress from "../components/GaugeProgress";
import ValueComponent from "../components/ValueComponent";
import GaugeSemaphore from "../components/GaugeSemaphore";
import {
  Droplet,
  Thermometer,
  Circle,
  PieChart,
  Trash2,
  Lock,
  Unlock,
} from "lucide-react";

const ResponsiveGridLayout = WidthProvider(Responsive);

interface GridItem {
  i: string;
  x: number;
  y: number;
  w: number;
  h: number;
  type: string;
}
interface Action {
  type: "hide" | "show" | "blink";
  range: {
    min: number;
    max: number;
  };
}
const MAX_WIDGETS = 6;
const DragBox: React.FC = () => {
  const [draggable, setDraggable] = useState(true);
  const [draggable2, setDraggable2] = useState(true);
  const [lockedSubWidgets, setLockedSubWidgets] = useState<Set<string>>(
    new Set()
  );
  const [items, setItems] = useState<GridItem[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [value, setValue] = useState(50);
  const [values, setValues] = useState(50);
  const [valuesp, setValuesp] = useState(0);
  const handleRemove = (id: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.i !== id));
  };
  const [confirmId, setConfirmId] = useState<string | null>(null);

  const actions: Action[] = [
    { type: "hide", range: { min: 0, max: 10 } },
    { type: "show", range: { min: 11, max: 100 } },
    { type: "blink", range: { min: 80, max: 100 } },
  ] as const; // ✅ Fixe le type pour éviter l'erreur
  const ranges = [
    { min: 0, max: 30, color: "green" },
    { min: 31, max: 70, color: "yellow" },
    { min: 71, max: 100, color: "red" },
  ];
  const toggleSubWidgetLock = (id: string) => {
    setLockedSubWidgets((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };
  // Mapping des types de widgets vers leurs composants graphiques
  const widgetComponents: Record<
    string,
    React.FC<{ width: number; height: number }>
  > = {
    lineChart: ({ width, height }) => (
      <div
        style={{ width, height }}
        className="flex flex-col justify-center items-center  p-2"
      >
        <GaugeProgress value={value} min={0} max={100} color="blue" />
        {/* <input
          type="range"
          min="0"
          max="100"
          value={value}
          onChange={(e) => setValue(Number(e.target.value))}
          className="mt-4 w-64"
        />*/}
      </div>
    ),
    barGraph: ({ width, height }) => (
      <div
        style={{ width, height }}
        className="flex flex-col justify-center items-center  p-2"
      >
        <ValueComponent
          value={values}
          unit="°C"
          decimalPlaces={1}
          actions={actions}
        />

        <input
          type="range"
          min="0"
          max="100"
          value={values}
          onChange={(e) => setValues(Number(e.target.value))}
          className="mt-4 w-64 cursor-pointer"
        />
        <p className="text-gray-900 font-bold">Valeur actuelle : {values} °C</p>
      </div>
    ),
    scatterGraph: ({ width, height }) => (
      <div
        style={{ width, height }}
        className="flex flex-col justify-center items-center  p-2"
      >
        <GaugeSemaphore
          value={valuesp}
          ranges={ranges}
          actions={actions}
          size={150}
        />

        <input
          type="range"
          min="0"
          max="100"
          value={valuesp}
          onChange={(e) => setValuesp(Number(e.target.value))}
          className="mt-4 w-64"
        />
        <p>Valeur actuelle : {valuesp}</p>
      </div>
    ),
    circleGraph: CircleGraph,
  };

  // Fonction pour récupérer l'élément déposé et l'ajouter à la grille
  const onDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const widgetType = event.dataTransfer.getData("text"); // Récupère le type du widget

    if (!widgetType) return;

    if (items.length >= MAX_WIDGETS) {
      setErrorMessage("La limite de widgets a été atteinte !");
      return;
    }
    setErrorMessage(null);

    const newWidgetId = `widget-${items.length + 1}`;
    const newItem: GridItem = {
      i: newWidgetId,
      x: items.length % 12,
      y: Math.floor(items.length / 6),
      w: 4,
      h: 4,
      type: widgetType,
    };

    setItems((prevItems) => [...prevItems, newItem]);
  };

  return (
    <div className="flex flex-row w-full ">
      {/* Liste des Widgets en haut */}
      <div className="p-4 bg-gray-900 text-white flex flex-col space-y-2 ml-auto">
        <div
          draggable
          onDragStart={(e) => e.dataTransfer.setData("text", "lineChart")}
          className="w-10 h-10 flex items-center justify-center bg-blue-600 text-white cursor-pointer rounded-lg text-center shadow-md hover:bg-blue-700 transition "
        >
          {/* Drag Gauge Progress */}
          <Droplet size={24} />
        </div>

        <div
          draggable
          onDragStart={(e) => e.dataTransfer.setData("text", "barGraph")}
          className="w-10 h-10 flex items-center justify-center bg-green-600 text-white cursor-pointer rounded-lg text-center shadow-md hover:bg-green-700 transition "
        >
          {/*Drag Value Component*/}
          <Thermometer size={24} />
        </div>
        <div
          draggable
          onDragStart={(e) => e.dataTransfer.setData("text", "scatterGraph")}
          className="w-10 h-10 flex items-center justify-center bg-yellow-600 text-white cursor-pointer rounded-lg text-center shadow-md hover:bg-yellow-700 transition"
        >
          {/*Drag Scatter Graph*/}
          <Circle size={24} />
        </div>
        <div
          draggable
          onDragStart={(e) => e.dataTransfer.setData("text", "circleGraph")}
          className="w-10 h-10 flex items-center justify-center bg-red-600 text-white cursor-pointer rounded-lg text-center shadow-md hover:bg-red-700 transition"
        >
          {/*Drag Circle Graph*/}
          <PieChart size={24} />
        </div>
      </div>

      {/* Zone de drop */}
      <div
        onDrop={onDrop}
        onDragOver={(e) => e.preventDefault()} // Permet le drop
        className="flex-1 p-6 border-2 border-dashed border-gray-500"
      >
        {errorMessage && (
          <div className="mb-4 p-2 bg-red-500 text-white text-center rounded">
            {errorMessage}
          </div>
        )}

        {/* Affichage des widgets déposés */}
        <ResponsiveGridLayout
          className="layout border"
          layouts={{ lg: items }}
          breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
          cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
          rowHeight={100}
          isDraggable={!draggable}
          isResizable
          //draggableCancel=".no-drag"
          //draggableHandle=".drag-handle" //permet de bloquer ce qu'il y a autour sauf le composant nommé "drag-handle"
        >
          {items.map((item, index) => {
            const WidgetComponent = widgetComponents[item.type] || null;

            return (
              <div key={item.i} className="border rounded p-4 bg-gray-300">
                <button
                  onClick={() => setConfirmId(item.i)}
                  className="absolute top-1 right-1 p-1 rounded hover:bg-red-100 transition"
                  title="Supprimer"
                >
                  <Trash2
                    size={18}
                    className="text-red-600 hover:text-red-800"
                  />
                </button>
                {/*{WidgetComponent ? (
                  <WidgetComponent width={300} height={200} />
                ) : (
                  <p>{item.type}</p>
                )}*/}
                {index === 0 ? (
                  <ResponsiveGridLayout
                    className="layout "
                    layouts={{ lg: items }}
                    breakpoints={{
                      lg: 1200,
                      md: 996,
                      sm: 768,
                      xs: 480,
                      xxs: 0,
                    }}
                    cols={{ lg: 12, md: 8, sm: 6, xs: 4, xxs: 2 }}
                    rowHeight={10}
                    isDraggable={true}
                    draggableCancel=".lock-sub-widget"
                    //isResizable
                    //draggableHandle=".drag-handle"
                  >
                    {/* Premier sous-widget (Gauge) */}
                    <div
                      key={`${item.i}-gauge`}
                      data-grid={{
                        i: `${item.i}-gauge`,
                        x: 0.7,
                        y: 0,
                        w: 0.7,
                        h: 10,
                        isDraggable: !lockedSubWidgets.has(`${item.i}-gauge`),
                      }}
                      className="relative p-4 bg-gray-300 rounded"
                    >
                      <button
                        onClick={() => toggleSubWidgetLock(`${item.i}-gauge`)}
                        className="lock-sub-widget absolute top-1 right-1 p-1 bg-white rounded-full shadow hover:bg-gray-100 transition"
                        title={
                          lockedSubWidgets.has(`${item.i}-gauge`)
                            ? "Verrouiller"
                            : "déverrouiller"
                        }
                      >
                        {lockedSubWidgets.has(`${item.i}-gauge`) ? (
                          <Lock size={14} />
                        ) : (
                          <Unlock size={14} />
                        )}
                      </button>

                      <GaugeProgress
                        value={value}
                        min={0}
                        max={100}
                        color="blue"
                      />
                    </div>

                    <div
                      key={`${item.i}-slider`}
                      data-grid={{
                        i: `${item.i}-slider`,
                        x: 2,
                        y: 2,
                        w: 2,
                        h: 3,
                        isDraggable: !lockedSubWidgets.has(`${item.i}-slider`),
                      }}
                      className="relative p-4 bg-gray-300 rounded"
                    >
                      <button
                        onClick={() => toggleSubWidgetLock(`${item.i}-slider`)}
                        className="lock-sub-widget absolute top-1 right-1 p-1 bg-white rounded-full shadow hover:bg-gray-100 transition"
                        title={
                          lockedSubWidgets.has(`${item.i}-slider`)
                            ? "Verrouiller"
                            : "Déverrouiller"
                        }
                      >
                        {lockedSubWidgets.has(`${item.i}-slider`) ? (
                          <Lock size={14} />
                        ) : (
                          <Unlock size={14} />
                        )}
                      </button>

                      <input
                        type="range"
                        min={0}
                        max={100}
                        value={value}
                        onChange={(e) => setValue(Number(e.target.value))}
                        className="w-full"
                      />
                    </div>
                  </ResponsiveGridLayout>
                ) : index === 1 ? (
                  <ResponsiveGridLayout
                    className="layout "
                    layouts={{ lg: items }}
                    breakpoints={{
                      lg: 1200,
                      md: 996,
                      sm: 768,
                      xs: 480,
                      xxs: 0,
                    }}
                    cols={{ lg: 12, md: 8, sm: 6, xs: 4, xxs: 2 }}
                    rowHeight={10}
                    isDraggable={true}
                    draggableCancel=".lock-sub-widget"
                    //isResizable
                    //draggableHandle=".drag-handle"
                  >
                    {/* Premier sous-widget (Gauge) */}
                    <div
                      key={`${item.i}-values`}
                      data-grid={{
                        i: `${item.i}-values`,
                        x: 0.7,
                        y: 0,
                        w: 0.7,
                        h: 5,
                        isDraggable: !lockedSubWidgets.has(`${item.i}-values`),
                      }}
                      className="relative p-4 bg-gray-300 rounded"
                    >
                      <button
                        onClick={() => toggleSubWidgetLock(`${item.i}-values`)}
                        className="lock-sub-widget absolute top-1 right-1 p-1 bg-white rounded-full shadow hover:bg-gray-100 transition"
                        title={
                          lockedSubWidgets.has(`${item.i}-values`)
                            ? "Verrouiller"
                            : "déverrouiller"
                        }
                      >
                        {lockedSubWidgets.has(`${item.i}-values`) ? (
                          <Lock size={14} />
                        ) : (
                          <Unlock size={14} />
                        )}
                      </button>

                      <ValueComponent
                        value={values}
                        unit="°C"
                        decimalPlaces={1}
                        actions={actions}
                      />
                    </div>

                    <div
                      key={`${item.i}-range`}
                      data-grid={{
                        i: `${item.i}-range`,
                        x: 2,
                        y: 2,
                        w: 2,
                        h: 5,
                        isDraggable: !lockedSubWidgets.has(`${item.i}-range`),
                      }}
                      className="relative p-4 bg-gray-300 rounded"
                    >
                      <button
                        onClick={() => toggleSubWidgetLock(`${item.i}-range`)}
                        className="lock-sub-widget absolute top-1 right-1 p-1 bg-white rounded-full shadow hover:bg-gray-100 transition"
                        title={
                          lockedSubWidgets.has(`${item.i}-range`)
                            ? "Verrouiller"
                            : "Déverrouiller"
                        }
                      >
                        {lockedSubWidgets.has(`${item.i}-range`) ? (
                          <Lock size={14} />
                        ) : (
                          <Unlock size={14} />
                        )}
                      </button>

                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={values}
                        onChange={(e) => setValues(Number(e.target.value))}
                        className="mt-4 w-64 cursor-pointer"
                      />
                      <p className="text-gray-900 font-bold">
                        Valeur actuelle : {values} °C
                      </p>
                    </div>
                  </ResponsiveGridLayout>
                ) : index === 2 ? (
                  <ResponsiveGridLayout
                    className="layout "
                    layouts={{ lg: items }}
                    breakpoints={{
                      lg: 1200,
                      md: 996,
                      sm: 768,
                      xs: 480,
                      xxs: 0,
                    }}
                    cols={{ lg: 12, md: 8, sm: 6, xs: 4, xxs: 2 }}
                    rowHeight={10}
                    isDraggable={true}
                    draggableCancel=".lock-sub-widget"
                    //isResizable
                    //draggableHandle=".drag-handle"
                  >
                    {/* Premier sous-widget (Gauge) */}
                    <div
                      key={`${item.i}-semaphore`}
                      data-grid={{
                        i: `${item.i}-semaphore`,
                        x: 0.5,
                        y: 0,
                        w: 1,
                        h: 10,
                        isDraggable: !lockedSubWidgets.has(
                          `${item.i}-semaphore`
                        ),
                      }}
                      className="relative p-4 bg-gray-300 rounded"
                    >
                      <button
                        onClick={() =>
                          toggleSubWidgetLock(`${item.i}-semaphore`)
                        }
                        className="lock-sub-widget absolute top-1 right-1 p-1 bg-white rounded-full shadow hover:bg-gray-100 transition"
                        title={
                          lockedSubWidgets.has(`${item.i}-semaphore`)
                            ? "Verrouiller"
                            : "déverrouiller"
                        }
                      >
                        {lockedSubWidgets.has(`${item.i}-semaphore`) ? (
                          <Lock size={14} />
                        ) : (
                          <Unlock size={14} />
                        )}
                      </button>

                      <GaugeSemaphore
                        value={valuesp}
                        ranges={ranges}
                        actions={actions}
                        size={150}
                      />
                    </div>

                    <div
                      key={`${item.i}-range`}
                      data-grid={{
                        i: `${item.i}-range`,
                        x: 2,
                        y: 2,
                        w: 2,
                        h: 5,
                        isDraggable: !lockedSubWidgets.has(`${item.i}-range`),
                      }}
                      className="relative p-4 bg-gray-300 rounded"
                    >
                      <button
                        onClick={() => toggleSubWidgetLock(`${item.i}-range`)}
                        className="lock-sub-widget absolute top-1 right-1 p-1 bg-white rounded-full shadow hover:bg-gray-100 transition"
                        title={
                          lockedSubWidgets.has(`${item.i}-range`)
                            ? "Verrouiller"
                            : "Déverrouiller"
                        }
                      >
                        {lockedSubWidgets.has(`${item.i}-range`) ? (
                          <Lock size={14} />
                        ) : (
                          <Unlock size={14} />
                        )}
                      </button>

                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={valuesp}
                        onChange={(e) => setValuesp(Number(e.target.value))}
                        className="mt-4 w-64"
                      />
                      <p>Valeur actuelle : {valuesp}</p>
                    </div>
                  </ResponsiveGridLayout>
                ) : (
                  WidgetComponent && (
                    <WidgetComponent width={300} height={200} />
                  )
                )}
              </div>
            );
          })}
        </ResponsiveGridLayout>

        <button
          onClick={() => setDraggable(!draggable)}
          className="mt-4 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition"
        >
          {draggable ? (
            <Lock size={18} className="text-gray-600" />
          ) : (
            <Unlock size={18} className="text-gray-600" />
          )}
        </button>
        {/*<button
          onClick={() => setDraggable2(!draggable2)}
          className="mt-4 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition"
        >
          {draggable2 ? (
            <Lock size={18} className="text-gray-600" />
          ) : (
            <Unlock size={18} className="text-gray-600" />
          )}
        </button>*/}

        {confirmId && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white rounded shadow-lg p-6 w-80 text-center">
              <h2 className="text-lg font-semibold mb-2">
                Supprimer le widget ?
              </h2>

              <div className="flex justify-center gap-4">
                <button
                  onClick={() => {
                    handleRemove(confirmId);
                    setConfirmId(null);
                  }}
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
                >
                  Supprimer
                </button>
                <button
                  onClick={() => setConfirmId(null)}
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition"
                >
                  Annuler
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DragBox;
