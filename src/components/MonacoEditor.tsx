import Editor from "@monaco-editor/react";

type MonacoProps = {
  data: string;
  setData: (data: string) => void;
};

export const MonacoEditor = ({ data, setData }: MonacoProps) => {
  return (
    <div>
      <Editor
        height="90vh"
        theme="vs-dark"
        defaultLanguage="markdown"
        defaultValue={data}
        onChange={(e) => {
          setData(e || "");
        }}
      />
    </div>
  );
};
