import { CirclePlus } from "lucide-react";
import { toast } from "sonner";
import { useSectionsStore } from "../store/useSections";
import placeholder from "../placeholders.json";

type SectionProps = {
  title: string;
};

export const Section = ({ title }: SectionProps) => {
  const { addSection, setActiveSection } = useSectionsStore();

  const handleAddSection = (titleToFind: string) => {
    const sectionToAdd = placeholder.find((item) => item.title === titleToFind);
    if (!sectionToAdd) return;
    addSection(sectionToAdd);
    setActiveSection(sectionToAdd);
    toast(`${titleToFind} was added successfully!`);
  };

  return (
    <div className="flex min-h-[20px] py-5 my-2 w-full items-center border-2 border-[#99ABE4] gap-4 rounded-md px-4 bg-[#617ACA]">
      <button
        onClick={() => {
          handleAddSection(title);
        }}
      >
        <CirclePlus />
      </button>
      <p className="font-bold">{title}</p>
    </div>
  );
};
