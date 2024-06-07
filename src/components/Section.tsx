import { CirclePlus } from 'lucide-react'
import { toast } from 'sonner'
import { useSectionsStore } from '../store/useSections'
import placeholder from '../placeholders.json'

type SectionProps = {
  title: string
}

export const Section = ({ title }: SectionProps) => {
  const { addSection, setActiveSection } = useSectionsStore()

  const handleAddSection = (titleToFind: string) => {
    const sectionToAdd = placeholder.find((item) => item.title === titleToFind)
    if (!sectionToAdd) return

    const newSection = {
      ...sectionToAdd,
      placeholderId: sectionToAdd.id,
      id: crypto.randomUUID()
    }

    addSection(newSection)
    setActiveSection(newSection)
    toast(`${titleToFind} was added successfully!`)
  }

  return (
    <div className="flex p-3 my-2 w-full justify-between items-center border-2 border-[#99ABE4] gap-4 rounded-md bg-[#617ACA]">
      <p className="font-bold">{title}</p>
      <button
        onClick={() => {
          handleAddSection(title)
        }}
      >
        <CirclePlus className="self-end" />
      </button>
    </div>
  )
}
