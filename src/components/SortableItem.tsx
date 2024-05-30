import { Trash, RefreshCw } from "lucide-react";
import { useSortable, defaultAnimateLayoutChanges } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVerticalIcon } from "lucide-react";
import { useSectionsStore } from "../store/useSections";
import placeholder from "../placeholders.json";

// @ts-expect-error description
const animateLayoutChanges = (args) =>
  args.isSorting || args.wasDragging ? defaultAnimateLayoutChanges(args) : true;

export function SortableItem({
  id,
  onRemove,
}: {
  id: string;
  onRemove: (id: string) => void;
}) {
  const { setActiveSection } = useSectionsStore();

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      animateLayoutChanges,
      id: id,
    });
  let height;
  switch (id) {
    case "1":
      height = 20;
      break;
    case "2":
      height = 50;
      break;
    case "3":
      height = 35;
      break;
    case "4":
      height = 25;
      break;
    default:
      height = 20;
  }

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
    height: `${height}px`,
    cursor: "grab",
    userSelect: "none",
  };

  const handleUpdateActiveSection = (id: string) => {
    const sectionToUpdate = placeholder.find((item) => item.title === id);
    if (!sectionToUpdate) return;
    setActiveSection(sectionToUpdate);
  };

  return (
    <div
      ref={setNodeRef}
      className="flex my-4 w-full items-center border-2 border-[#99ABE4] justify-between rounded-md px-4 py-8 bg-[#617ACA]"
      // @ts-expect-error description
      style={style}
      onClick={() => handleUpdateActiveSection(id)}
      {...attributes}
    >
      <div className="flex gap-4 cursor-pointer" {...listeners}>
        <GripVerticalIcon></GripVerticalIcon>
        <p>{id}</p>
      </div>
      <div className="flex gap-2">
        <button
          onClick={(event) => {
            event.stopPropagation();
            onRemove(id);
          }}
          className="hover:bg-[#293357] flex items-center justify-center rounded-full p-1 size-[32px]"
        >
          <RefreshCw size={16} />
        </button>
        <button
          onClick={(event) => {
            event.stopPropagation();
            onRemove(id);
          }}
          className="hover:bg-[#293357] flex items-center justify-center rounded-full p-1 size-[32px]"
        >
          <Trash size={16} />
        </button>
      </div>
    </div>
  );
}
