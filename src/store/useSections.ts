import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Section = {
  title: string;
  content: string;
};

type SectionStore = {
  sections: Section[];
  activeSection: Section;
  setActiveSection: (sectionToUpdate: Section) => void;
  addSection: (sectionToAdd: Section) => void;
  updateSection: (sectionToUpdate: Section) => void;
  deleteSection: (sectionToDelete: Section) => void;
};

export const useSectionsStore = create<SectionStore>()(
  persist(
    (set) => ({
      sections: [],

      activeSection: {
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
