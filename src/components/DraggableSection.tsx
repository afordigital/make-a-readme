import { useState } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  MeasuringStrategy,
  TouchSensor,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import { SortableItem } from "./SortableItem";

const measuringConfig = {
  droppable: {
    strategy: MeasuringStrategy.Always,
  },
};

export const DraggableSection = () => {
  const [items, setItems] = useState(["1", "2", "3", "4", "5", "6", "7", "8"]);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
    useSensor(TouchSensor, {
      activationConstraint: "",
    })
  );
  const handleRemove = (id: string) =>
    setItems((items) => items.filter((item) => item !== id));

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      measuring={measuringConfig}
    >
      <SortableContext items={items} strategy={verticalListSortingStrategy}>
        <div className="bg-[#293357] p-4 h-screen overflow-hidden">
          {items.map((id) => (
            <SortableItem onRemove={handleRemove} key={id} id={id} />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );

  function handleDragEnd(event) {
    const { active, over } = event;
    if (active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.indexOf(active.id);
        const newIndex = items.indexOf(over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }
};
