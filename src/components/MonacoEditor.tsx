import Editor from "@monaco-editor/react";
import { useSectionsStore } from "../store/useSections";

export const MonacoEditor = () => {
  const { activeSection, updateSection, setActiveSection } = useSectionsStore();

  const handleUpdateSection = (value: string) => {
    const newActiveSection = {
      title: activeSection.title,
      content: value,
    };

    setActiveSection(newActiveSection);
    updateSection(newActiveSection);
  };

  console.log(activeSection);

  return (
    <div className="flex-1 overflow-hidden">
      <Editor
        height="90vh"
        theme="vs-dark"
        defaultLanguage="markdown"
        defaultValue={activeSection.content}
        value={activeSection.content}
        onChange={(value) => {
          if (!value) return;
          handleUpdateSection(value);
        }}
      />
    </div>
  );
};
