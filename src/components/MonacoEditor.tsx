import { Editor, type Monaco } from '@monaco-editor/react'
import { useSectionsStore } from '../store/useSections'
import OneDarkPro from '../theme/onedarkpro.json'

export const MonacoEditor = () => {
  const { activeSection, updateSection, setActiveSection } = useSectionsStore()

  const handleUpdateSection = (value: string) => {
    if (!activeSection) return

    const newActiveSection = {
      ...activeSection,
      content: value
    }

    setActiveSection(newActiveSection)
    updateSection(newActiveSection)
  }

  const handleEditorDidMount = (monaco: Monaco) => {
    monaco.editor.defineTheme('OneDarkPro', {
      base: 'vs-dark',
      inherit: true,
      ...OneDarkPro
    })
  }

  return (
    <div className="flex-1 overflow-hidden">
      <Editor
        height={'100%'}
        theme="OneDarkPro"
        defaultLanguage="markdown"
        value={activeSection?.content ?? ''}
        beforeMount={handleEditorDidMount}
        onChange={(value) => {
          if (!value) return
          handleUpdateSection(value)
        }}
      />
    </div>
  )
}
