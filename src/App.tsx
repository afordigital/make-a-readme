import { Toaster } from "@pheralb/toast";
import { DraggableSection } from "./components/DraggableSection";
import { MonacoEditor } from "./components/MonacoEditor";
import { Preview } from "./components/Preview";
import { SectionCreation } from "./components/SectionCreation";
import Split from "react-split";
import { Box } from "@radix-ui/themes";
import { Header } from "./components/Header";
import { ThemeProvider } from "./components/theme-provider";
import { useState } from "react";
import { RawMD } from "./components/RawMD";

function App() {
	const [markdownView, setMarkdownView] = useState(true);

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
						<Split
							className="flex h-full gap-x-4"
							minSize={[450, 700]}
							expandToMin={true}
							gutterSize={1}
							snapOffset={0}
						>
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
	);
}

export default App;
