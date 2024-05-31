import ReactMarkdown from "react-markdown";
import { useSectionsStore } from "../store/useSections";

export const Preview = () => {
  const { sections } = useSectionsStore();

  const aux = sections.map((section) => section.content);

  return (
    <div className="flex flex-1 flex-col gap-4">
      {aux.map((item) => (
        <ReactMarkdown>{item}</ReactMarkdown>
      ))}
    </div>
  );
};