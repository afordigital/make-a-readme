import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type SectionType = {
  id: string
  placeholderId: string
  title: string
  content: string
}

type SectionStore = {
  sections: SectionType[]
  activeSection: SectionType | null
  setActiveSection: (sectionToUpdate: SectionType | null) => void
  addSection: (sectionToAdd: SectionType) => void
  updateSection: (sectionToUpdate: SectionType) => void
  setSections: (sections: SectionType[]) => void
}

export const useSectionsStore = create<SectionStore>()(
  persist(
    (set) => ({
      sections: [],
      activeSection: null,
      setActiveSection: (newActiveSection) =>
        set(() => ({
          activeSection: newActiveSection
        })),

      addSection: (sectionToAdd) =>
        set((prev) => ({
          sections: [...prev.sections, sectionToAdd]
        })),

      updateSection: (sectionToUpdate) =>
        set((prev) => ({
          sections: prev.sections.map((section) =>
            section.id === sectionToUpdate.id ? sectionToUpdate : section
          )
        })),
      setSections: (sections) =>
        set(() => ({
          sections
        }))
    }),
    {
      name: 'section-storage'
    }
  )
)
