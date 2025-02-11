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
        <div className="w-screen h-screen overflow-hidden grid grid-cols-8 items-center">
          <div className="relative flex flex-col gap-4 h-full p-6 col-span-2 overflow-auto">
            <DraggableSection />
            <SectionCreation />
          </div>

          <div className="flex flex-col gap-8 w-auto pr-10 h-full p-4 col-span-6 ">
            <div className="w-full flex-1 flex">
              <Split className="split h-full flex-1">
                <MonacoEditor />
                <Preview />
              </Split>
            </div>
          </div>
        </div>
      </Box>
    </>
  )
}

export default App
