import { create } from "zustand";
import { persist } from "zustand/middleware";

export type SectionType = {
  id: string;
  title: string;
  content: string;
};

type SectionStore = {
  sections: SectionType[];
  activeSection: SectionType;
  setActiveSection: (sectionToUpdate: SectionType) => void;
  addSection: (sectionToAdd: SectionType) => void;
  updateSection: (sectionToUpdate: SectionType) => void;
  deleteSection: (sectionToDelete: SectionType) => void;
};

export const useSectionsStore = create<SectionStore>()(
  persist(
    (set) => ({
      sections: [],

      activeSection: {
        id: crypto.randomUUID(),
        title: "",
        content: "",
      },

      setActiveSection: (newActiveSection) =>
        set(() => ({
          activeSection: newActiveSection,
        })),

      addSection: (sectionToAdd) =>
        set((prev) => ({
          sections: [...prev.sections, sectionToAdd],
        })),

      updateSection: (sectionToUpdate) =>
        set((prev) => ({
          sections: prev.sections.map((section) =>
            section.title === sectionToUpdate.title ? sectionToUpdate : section
          ),
        })),

      deleteSection: (sectionToDelete) =>
        set((prev) => ({
          sections: prev.sections.filter(
            (section) => section.title !== sectionToDelete.title
          ),
        })),
    }),
    {
      name: "listed-storage",
    }
  )
);
