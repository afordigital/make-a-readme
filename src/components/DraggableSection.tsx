import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  MeasuringStrategy,
  TouchSensor,
  DragEndEvent
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy
} from '@dnd-kit/sortable'

import { SortableItem } from './SortableItem'
import { useSectionsStore } from '../store/useSections'
import { toast } from 'sonner'
import placeholders from '../placeholders.json'

const measuringConfig = {
  droppable: {
    strategy: MeasuringStrategy.Always
  }
}

export const DraggableSection = () => {
  const {
    sections,
    activeSection,
    setActiveSection,
    setSections,
    updateSection
  } = useSectionsStore()

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    }),
    useSensor(TouchSensor)
  )

  const handleActiveSection = (id: string) => {
    const sectionToUpdate = sections.find((item) => item.id === id)
    if (!sectionToUpdate) return
    setActiveSection(sectionToUpdate)
  }

  const handleResetSection = (id: string, placeholderId: string) => {
    console.log('reset section', id, placeholderId)
    const placeholder = placeholders.find((item) => item.id === placeholderId)
    if (!placeholder) return

    const selectedSection = sections.find((item) => item.id === id)
    if (!selectedSection) return

    updateSection({
      ...selectedSection,
      title: placeholder.title,
      content: placeholder.content
    })

    toast('Section was reset successfully!')
  }

  const handleRemove = (id: string) => {
    setSections(sections.filter((section) => section.id !== id))

    if (activeSection?.id === id) {
      setActiveSection(null)
    }

    toast('Section was removed successfully!')
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (!over) return

    const activeSection = sections.find((section) => section.id === active.id)
    if (activeSection) setActiveSection(activeSection)

    if (active.id !== over.id) {
      const oldIndex = sections.findIndex((section) => section.id === active.id)
      const newIndex = sections.findIndex((section) => section.id === over.id)

      setSections(arrayMove(sections, oldIndex, newIndex))
    }
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      measuring={measuringConfig}
    >
      <SortableContext items={sections} strategy={verticalListSortingStrategy}>
        <div className="h-full bg-[#293357] sm:p-4 overflow-auto">
          {sections.map((section) => (
            <SortableItem
              key={section.id}
              section={section}
              onRemove={handleRemove}
              onReset={handleResetSection}
              onClick={handleActiveSection}
              isSelected={activeSection?.id === section.id}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  )
}
