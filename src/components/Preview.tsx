import ReactMarkdown from 'react-markdown'
import type { ExtraProps } from 'react-markdown'
import { useSectionsStore } from '../store/useSections'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { CSSProperties } from 'react'

type HighlighterStyle = { [key: string]: CSSProperties }
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
          }
        }}
      >
        {markdown}
      </ReactMarkdown>
    </div>
  )
}
