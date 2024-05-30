import ReactMarkdown from "react-markdown";

type PreviewProps = {
  data: string;
};

export const Preview = ({ data }: PreviewProps) => {
  return (
    <div className="">
      <ReactMarkdown>{data}</ReactMarkdown>
    </div>
  );
};
