import ReactMarkdown from 'react-markdown'
import type { ExtraProps } from 'react-markdown'
import { useSectionsStore } from '../store/useSections'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism'

export const Preview = () => {
  const { sections } = useSectionsStore()

  const markdown = sections.map((section) => section.content).join('\n')

  // TODO: Change this markdown as an output to copy code
  // Investigate onClick={() => {navigator.clipboard.writeText(this.state.textToCopy)}}

  return (
    <div className="pl-4 h-[calc(100vh_-_10.9rem)] overflow-auto pr-1">
      <ReactMarkdown
        className="markdown"
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={{
          code({ className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '')
            return match ? (
              <SyntaxHighlighter
                PreTag="div"
                language={match[1]}
                {...(props as ExtraProps)}
                style={dracula}
              >
                {String(children).replace(/\n$/, '')}
              </SyntaxHighlighter>
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            )
          },
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          a({ node, ...props }) {
            return <a target="_blank" {...props} />
          }
        }}
      >
        {markdown}
      </ReactMarkdown>
    </div>
  )
}
