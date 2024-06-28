import { useEffect, useState } from 'react'
import { Toaster } from 'sonner'
import { DraggableSection } from './components/DraggableSection'
import { MonacoEditor } from './components/MonacoEditor'
import { Preview } from './components/Preview'
import { Button } from './components/common/Button'
import { MODE, SCREEN, VARIANT } from './components/constants'
import { SectionCreation } from './components/SectionCreation'
import Split from 'react-split'
// import { debounce } from 'lodash-es'

function App() {
  const [screenSize, setScreenSize] = useState({ width: window.innerWidth, height: window.innerHeight })
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

  const gutterStyleHorizontal = () => {
    return {
      'width': `${10}px`,
      'height': `${100}%`,
    }
  }

  const gutterStyleVertical = () => {
    return {
      'width': `${100}%`,
      'height': `${10}px`,
    }
  }

  // const handleResize = debounce(() => {
  //   setScreenSize({ width: window.innerWidth, height: window.innerHeight })
  // }, 300)

  useEffect(() => {
    const handleResize = () => {
      setScreenSize({ width: window.innerWidth, height: window.innerHeight })
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return (
    <>
      <Toaster />
      <div className="max-w-screen h-auto min-h-screen grid grid-cols-8 text-white bg-[#293456]">
        <div className="col-span-8 h-[60px] border-b border-[rgb(153,171,228,0.5)] bg-[#293357]"></div>
        <div className="h-[90vh] flex flex-col gap-4 bg-[rgb(41,51,87,0.5)] relative p-3 lg:p-4 pr-1 sm:pr-3 col-span-3 sm:col-span-2 overflow-auto">
          <div className="w-full flex flex-col lg:flex-row gap-4 sm:px-2 lg:px-4">
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
            <SectionCreation />
          )}
        </div>

        <div className="flex flex-col gap-8 w-auto p-3 lg:p-4 sm:pr-6 lg:pr-10 h-full col-span-5 sm:col-span-6 ">
          <div className="relative w-full flex flex-col md:flex-row gap-4">
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
          <div className="w-full h-[65vh] md:h-[75vh] sm:flex">
            {showBothScreens ? (
              <Split
                // Funciona bien si no cambias el tamaño de la pantalla
                // elementStyle={() => ({'flex': `${1}`})} // Necesario, pero sobreescribe los estilos
                gutterStyle={screenSize.width >= 1024 ? gutterStyleHorizontal : gutterStyleVertical}
                sizes={[50, 50]}
                minSize={100}
                expandToMin={false}
                gutterSize={10}
                direction={screenSize.width >= 1024 ? "horizontal" : "vertical"}
                className="h-full flex-1 flex flex-col lg:flex-row"
              >
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
