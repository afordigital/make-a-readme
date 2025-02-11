import { X, RotateCcw } from 'lucide-react'
import { useSortable, defaultAnimateLayoutChanges } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { GripVerticalIcon } from 'lucide-react'
import { CSSProperties } from 'react'
import { SectionType } from '../store/useSections'

// @ts-expect-error description
const animateLayoutChanges = (args) =>
  args.isSorting || args.wasDragging ? defaultAnimateLayoutChanges(args) : true

export function SortableItem({
  section,
  isSelected,
  onRemove,
  onClick,
  onReset
}: {
  section: SectionType
  isSelected: boolean
  onRemove: (id: string) => void
  onReset: (id: string, placeholderId: string) => void
  onClick: (id: string) => void
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      animateLayoutChanges,
      id: section.id
    })

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
    userSelect: 'none'
  } as CSSProperties

  return (
    <li
      ref={setNodeRef}
      style={style}
      className={`flex w-full group items-center h-[48px] border-2 ${
        isSelected ? '' : ''
      } justify-between rounded-md p-3 cursor-pointer`}
      onClick={() => onClick(section.id)}
    >
      <div
        className="flex gap-2 items-center"
        onClick={() => onClick(section.id)}
      >
        <span className="cursor-grab" {...attributes} {...listeners}>
          <GripVerticalIcon strokeWidth={2} size={16} />
        </span>
        <p>{section.title}</p>
      </div>
      <div className="flex gap-2">
        <button
          onClick={(event) => {
            event.stopPropagation()
            onRemove(section.id)
          }}
          className="group-hover:flex hidden hover:bg-red-100 items-center justify-center rounded-[4px] p-1 size-[32px]"
        >
          <X size={16} color="#C72527" />
        </button>
        <button
          onClick={(event) => {
            event.stopPropagation()
            onReset(section.id, section?.placeholderId ?? '')
          }}
          className="group-hover:flex hidden hover:bg-slate-200 items-center justify-center rounded-[4px] p-1 size-[32px]"
        >
          <RotateCcw size={16} />
        </button>
      </div>
    </li>
  )
}
