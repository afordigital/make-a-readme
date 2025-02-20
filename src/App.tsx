import { Toaster } from '@pheralb/toast'
import { DraggableSection } from './components/DraggableSection'
import { MonacoEditor } from './components/MonacoEditor'
import { Preview } from './components/Preview'
import { SectionCreation } from './components/SectionCreation'
import Split, { SplitProps } from 'react-split'
import { Box } from '@radix-ui/themes'
import { Header } from './components/Header'
import { ThemeProvider } from './components/theme-provider'
import { useState } from 'react'
import { RawMD } from './components/RawMD'

type SnapCenterProps = {
  sizes: number[]
  SNAP_TRESHOLD: number
  setSizes: (sizes: number[]) => void
}

const SNAP_TRESHOLD = 5

function App() {
  const [markdownView, setMarkdownView] = useState(true)
  const [sizes, setSizes] = useState<number[]>([50, 50])

  const createGutterElement = (direction: 'horizontal' | 'vertical') => {
    const gutterElement = document.createElement('div')
    gutterElement.className = `gutter gutter-${direction}`
    return gutterElement
  }

  const handleSnapCenter = ({
    sizes,
    SNAP_TRESHOLD,
    setSizes
  }: SnapCenterProps) => {
    const [leftPanel, rightPanel] = sizes

    if (
      Math.abs(leftPanel - 50) <= SNAP_TRESHOLD &&
      Math.abs(rightPanel - 50) <= SNAP_TRESHOLD
    ) {
      setSizes([50, 50])
    } else {
      setSizes(sizes)
    }
  }

  const splitProps: SplitProps = {
    cursor: 'col-resize',
    direction: 'horizontal',
    expandToMin: true,
    gutter: (_, direction) => createGutterElement(direction),
    gutterAlign: 'center',
    gutterSize: 1,
    minSize: 100,
    sizes: sizes,
    onDrag: (sizes) => setSizes(sizes),
    onDragEnd: (sizes) => handleSnapCenter({ sizes, SNAP_TRESHOLD, setSizes })
  }

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Toaster theme="light" />
      <Box className="bg-[#FAFAFA] text-slate-900">
        <Header />
        <div className="grid grid-cols-[438px_2fr] gap-x-6">
          <aside className="items-container slush-bg px-6 py-4 flex flex-col gap-y-3.5 border-r border-[#CBD5E1]">
            <DraggableSection />
            <SectionCreation />
          </aside>

          <section className="app-container bg-white -ml-6">
            <Split {...splitProps} className="flex h-full gap-x-4">
              <MonacoEditor />
              {markdownView ? (
                <RawMD />
              ) : (
                <Preview setMarkdownView={setMarkdownView} />
              )}
            </Split>
          </section>
        </div>
      </Box>
    </ThemeProvider>
  )
}

export default App
