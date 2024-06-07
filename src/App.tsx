import { useState } from 'react'
import { Toaster } from 'sonner'
import { DraggableSection } from './components/DraggableSection'
import { MonacoEditor } from './components/MonacoEditor'
import { Preview } from './components/Preview'
import { Button } from './components/common/Button'
import { MODE, SCREEN, VARIANT } from './components/constants'
import { SectionCreation } from './components/SectionCreation'
import Split from 'react-split'

function App() {
  const [mode, setMode] = useState(MODE.DRAFT)
  const [screenView, setScreenView] = useState([SCREEN.EDITOR, SCREEN.PREVIEW])

  const showBothScreens =
    screenView.includes(SCREEN.EDITOR) && screenView.includes(SCREEN.PREVIEW)

  const handleScreenViewClick = (view: SCREEN) => {
    if (screenView.length === 1 && screenView[0] === view) {
      return
    }

    if (screenView.includes(view)) {
      setScreenView(screenView.filter((screen) => screen !== view))
    } else {
      setScreenView([...screenView, view])
    }
  }

  return (
    <>
      <Toaster />
      <div className="w-screen h-screen overflow-hidden grid grid-cols-8 text-white items-center bg-[#293456]">
        <div className="col-span-8 h-[60px] border-b border-[rgb(153,171,228,0.5)] bg-[#293357]"></div>
        <div className="min-w-[400px] bg-[rgb(41,51,87,0.5)] relative flex flex-col gap-4 h-full p-4 col-span-2 overflow-auto">
          <div className="w-full flex gap-x-4 px-4">
            <Button
              variant={
                mode === MODE.DRAFT ? VARIANT.PRIMARY : VARIANT.SECONDARY
              }
              onClick={() => {
                setMode(MODE.DRAFT)
              }}
            >
              Draft
            </Button>
            <Button
              variant={
                mode === MODE.DRAFT ? VARIANT.SECONDARY : VARIANT.PRIMARY
              }
              onClick={() => {
                setMode(MODE.ADD_SECTION)
              }}
            >
              Add Section
            </Button>
          </div>
          {mode === MODE.DRAFT ? (
            <DraggableSection />
          ) : (
            <div className="flex flex-col mt-5 px-4 pb-4 flex-1 scroll-container">
              <SectionCreation />
            </div>
          )}
        </div>

        <div className="flex flex-col gap-8 w-auto pr-10 h-full p-4 col-span-6">
          <div className="relative w-full flex gap-4">
            <Button
              onClick={() => handleScreenViewClick(SCREEN.EDITOR)}
              variant={
                screenView.includes(SCREEN.EDITOR)
                  ? VARIANT.PRIMARY
                  : VARIANT.SECONDARY
              }
            >
              Editor
            </Button>
            <Button
              onClick={() => handleScreenViewClick(SCREEN.PREVIEW)}
              variant={
                screenView.includes(SCREEN.PREVIEW)
                  ? VARIANT.PRIMARY
                  : VARIANT.SECONDARY
              }
            >
              Preview
            </Button>
          </div>
          <div className="w-full relative h-full">
            {showBothScreens ? (
              <Split className="split">
                <MonacoEditor />
                <Preview />
              </Split>
            ) : (
              <>
                {screenView.includes(SCREEN.EDITOR) && <MonacoEditor />}
                {screenView.includes(SCREEN.PREVIEW) && <Preview />}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default App
