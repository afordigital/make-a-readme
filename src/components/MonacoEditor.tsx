import { Editor, type Monaco } from "@monaco-editor/react";
import { useSectionsStore } from "../store/useSections";
import OneDarkPro from "../theme/onedarkpro.json";

export const MonacoEditor = () => {
  const { activeSection, updateSection, setActiveSection } = useSectionsStore();

  const handleUpdateSection = (value: string) => {
    const newActiveSection = {
      id: activeSection.id,
      title: activeSection.title,
      content: value,
    };

    setActiveSection(newActiveSection);
    updateSection(newActiveSection);
  };

  const handleEditorDidMount = (monaco: Monaco) => {
    monaco.editor.defineTheme("OneDarkPro", {
      base: "vs-dark",
      inherit: true,
      ...OneDarkPro,
    });
  };

  return (
    <div className="flex-1 overflow-hidden">
      <Editor
        height="90vh"
        theme="OneDarkPro"
        defaultLanguage="markdown"
        defaultValue={activeSection.content}
        value={activeSection.content}
        beforeMount={handleEditorDidMount}
        onChange={(value) => {
          if (!value) return;
          handleUpdateSection(value);
        }}
      />
    </div>
  );
};
