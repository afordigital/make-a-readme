import { Toaster } from '@pheralb/toast'
import { DraggableSection } from './components/DraggableSection'
import { MonacoEditor } from './components/MonacoEditor'
import { Preview } from './components/Preview'
import { SectionCreation } from './components/SectionCreation'
import Split from 'react-split'
import { Box } from '@radix-ui/themes'
import { Header } from './components/Header'

function App() {
  return (
    <>
      <Toaster theme="light" />
      <Box className="bg-[#FAFAFA] text-slate-900">
        <Header />
        <div className="grid grid-cols-[438px_2fr] gap-x-6">
          <aside className="items-container px-6 py-4 flex flex-col gap-y-6 border-r border-[#CBD5E1]">
            <DraggableSection />
            <SectionCreation />
          </aside>

          <section className="app-container">
            <Split className="flex h-full gap-x-4">
              <MonacoEditor />
              <Preview />
            </Split>
          </section>
        </div>
      </Box>
    </>
  )
}

export default App
