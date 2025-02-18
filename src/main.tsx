import React from "react";
import ReactDOM from "react-dom/client";
import { Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import "./index.css";
import App from "./App";

import "./i18n";

const rootElement = document.getElementById("root");

if (rootElement) {
	ReactDOM.createRoot(rootElement).render(
		<React.StrictMode>
			<Theme appearance="light">
				<App />
			</Theme>
		</React.StrictMode>,
	);
} else {
	console.error("El elemento con id 'root' no se encuentra en el DOM.");
}
