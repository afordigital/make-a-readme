import { create } from "zustand";
import { persist } from "zustand/middleware";

type Section = {
  id: string;
  content: string;
};

type SectionStore = {
  sections: Section[];
  addSection: (sectionToAdd: Section) => void;
  updateSection: (sectionToUpdate: Section) => void;
  deleteSection: (sectionToDelete: Section) => void;
};

export const useSectionsStore = create<SectionStore>()(
  persist(
    (set) => ({
      sections: [],

      addSection: (sectionToAdd) =>
        set((prev) => ({
          sections: [...prev.sections, sectionToAdd],
        })),

      updateSection: (sectionToUpdate) =>
        set((prev) => ({
          sections: prev.sections.map((section) =>
            section.id === sectionToUpdate.id ? sectionToUpdate : section
          ),
        })),

      deleteSection: (sectionToDelete) =>
        set((prev) => ({
          sections: prev.sections.filter(
            (section) => section.id !== sectionToDelete.id
          ),
        })),
    }),
    {
      name: "listed-storage",
    }
  )
);
