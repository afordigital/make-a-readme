import { Trash, RefreshCw } from "lucide-react";
import { useSortable, defaultAnimateLayoutChanges } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVerticalIcon } from "lucide-react";
import { CSSProperties } from "react";

// @ts-expect-error description
const animateLayoutChanges = (args) =>
  args.isSorting || args.wasDragging ? defaultAnimateLayoutChanges(args) : true;

export function SortableItem({
  id,
  title,
  isSelected,
  onRemove,
  onClick,

}: {
  id: string;
  title: string;
  isSelected: boolean;
  onRemove: (id: string) => void;
  onClick: (id: string) => void;
}) {

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
    userSelect: "none",
  } as CSSProperties


  return (
    <div
      ref={setNodeRef}
      style={style}
      className=
      {`flex my-4 w-full items-center border-2 ${isSelected? 'border-[#ffffff]' : 'border-[#99ABE4]'} justify-between rounded-md px-4 py-8 bg-[#617ACA] cursor-pointer`}
      onClick={() => onClick(id)}
     
    >
      <div className="flex gap-4" onClick={() => onClick(id)}>
        <span
          className="cursor-grab"
         {...attributes}
         {...listeners}
        >
        <GripVerticalIcon></GripVerticalIcon>

        </span>
        <p>{title}</p>
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
