import { useState } from "react";
import { DraggableSection } from "./components/DraggableSection";
import { MonacoEditor } from "./components/MonacoEditor";
import { Preview } from "./components/Preview";
import { Button } from "./components/common/Button";
import { MODE, SCREEN, VARIANT } from "./components/constants";

function App() {
  const [data, setData] = useState("// some comment");

  const [mode, setMode] = useState(MODE.DRAFT);
  const [screenView, setScreenView] = useState([SCREEN.EDITOR, SCREEN.PREVIEW]);

  const handleScreenViewClick = (view: SCREEN) => {
    if (screenView.length === 1 && screenView[0] === view) {
      return;
    }

    if (screenView.includes(view)) {
      setScreenView(screenView.filter((screen) => screen !== view));
    } else {
      setScreenView([...screenView, view]);
    }
  };

  console.log(screenView);

  return (
    <div className="w-screen h-screen overflow-hidden flex text-white items-center bg-[#293456]">
      <div className="min-w-[400px] bg-[#293357] relative h-full">
        <div className="w-full flex gap-x-8 p-4">
          <Button
            variant={mode === MODE.DRAFT ? VARIANT.PRIMARY : VARIANT.SECONDARY}
            onClick={() => {
              setMode(MODE.DRAFT);
            }}
          >
            Draft
          </Button>
          <Button
            variant={mode === MODE.DRAFT ? VARIANT.SECONDARY : VARIANT.PRIMARY}
            onClick={() => {
              setMode(MODE.ADD_SECTION);
            }}
          >
            Add Section
          </Button>
        </div>
        <DraggableSection></DraggableSection>
      </div>
      <div className="grid grid-cols-2 gap-8 w-full px-20">
        <div className="relative w-full flex flex-col gap-4">
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
          {screenView.includes(SCREEN.EDITOR) && (
            <MonacoEditor data={data} setData={setData} />
          )}
        </div>
        <div className="relative flex flex-col w-full gap-4">
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
          {screenView.includes(SCREEN.PREVIEW) && <Preview data={data} />}
        </div>
      </div>
    </div>
  );
}

export default App;
