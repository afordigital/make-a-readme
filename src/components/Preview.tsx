import ReactMarkdown from 'react-markdown'
import { useSectionsStore } from '../store/useSections'

export const Preview = () => {
  const { sections } = useSectionsStore()

  return (
    <div className="flex w-full flex-col gap-4 pl-4">
      {sections.map((section) => (
        <ReactMarkdown key={section.id}>{section.content}</ReactMarkdown>
      ))}
    </div>
  )
}
