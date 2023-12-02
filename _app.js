import React from "react";
import ReactDOM from "react-dom/client";
import { PrimeReactProvider } from "primereact/api";
import { App } from "./App.js";
import "primereact/resources/themes/tailwind-light/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<PrimeReactProvider>
		<App/>
	</PrimeReactProvider>
);