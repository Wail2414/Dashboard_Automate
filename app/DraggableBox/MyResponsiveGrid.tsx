"use client";
import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

// Liste initiale
const initialItems = [
  { id: "1", content: "Élément 1" },
  { id: "2", content: "Élément 2" },
  { id: "3", content: "Élément 3" },
];

const DragAndDropExample = () => {
  const [items, setItems] = useState(initialItems);

  const onDragEnd = (result: any) => {
    // Si pas de changement de position, on sort
    if (!result.destination) return;

    // Réordonner la liste
    const reorderedItems = Array.from(items);
    const [removed] = reorderedItems.splice(result.source.index, 1);
    reorderedItems.splice(result.destination.index, 0, removed);

    setItems(reorderedItems);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {items.map((item, index) => (
              <Draggable key={item.id} draggableId={item.id} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={{
                      padding: "8px",
                      margin: "4px",
                      backgroundColor: "lightblue",
                      border: "1px solid #ccc",
                      borderRadius: "4px",
                    }}
                  >
                    {item.content}
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default DragAndDropExample;
