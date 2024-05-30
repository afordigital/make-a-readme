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
import { useSectionsStore } from "../store/useSections";
import placeholder from "../placeholders.json";
import { toast } from "sonner";

const measuringConfig = {
  droppable: {
    strategy: MeasuringStrategy.Always,
  },
};

export const DraggableSection = () => {
  const { sections, deleteSection, activeSection, setActiveSection } =
    useSectionsStore();
  const sectionsToArray = sections.map((section) => section.title);

  const defaultSection = {
    title: "",
    content: "",
  };

  const [items, setItems] = useState(sectionsToArray);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
    useSensor(TouchSensor, {
      activationConstraint: "",
    })
  );
  const handleRemove = (id: string) => {
    setItems((items) => items.filter((item) => item !== id));

    const sectionToDelete = placeholder.find((item) => item.title === id);
    if (!sectionToDelete) return;
    deleteSection(sectionToDelete);

    const sectionsFiltered = sections.filter((section) => section.title !== id);

    if (
      sectionToDelete.title === activeSection.title &&
      sectionToDelete.content === activeSection.content
    ) {
      if (sectionsFiltered.length > 0) {
        setActiveSection(sectionsFiltered[0]);
      } else {
        setActiveSection(defaultSection);
      }
    }

    console.log(activeSection);

    toast(`${id} was deleted successfully!`);
  };

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
