import ReactMarkdown from "react-markdown";
import { useSectionsStore } from "../store/useSections";

export const Preview = () => {
  const { sections } = useSectionsStore();

  const aux = sections.map((section) => section.content);

  return (
    <div className="w-6/12 grow flex flex-col px-2 gap-4">
      {aux.map((item) => (
        <ReactMarkdown>{item}</ReactMarkdown>
      ))}
    </div>
  );
};
