import ReactMarkdown from 'react-markdown'
import { useSectionsStore } from '../store/useSections'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { dracula } from 'react-syntax-highlighter/dist/cjs/styles/prism'

export const Preview = () => {
  const { sections } = useSectionsStore()

  const markdown = sections.map((section) => section.content).join('\n')

  return (
    <div className="flex w-full flex-col gap-4 pl-4">
      <ReactMarkdown
        className={'markdown'}
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={{
          code({ className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '')

            return match ? (
              <SyntaxHighlighter
                // @ts-expect-error - I don't know how to fix this
                style={dracula}
                PreTag="div"
                language={match[1]}
                {...props}
              >
                {String(children).replace(/\n$/, '')}
              </SyntaxHighlighter>
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            )
          }
        }}
      >
        {markdown}
      </ReactMarkdown>
    </div>
  )
}
