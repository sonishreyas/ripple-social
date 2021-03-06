import React from "react";
import ReactDOM from "react-dom";
import "css/app.css";
import "react-toastify/dist/ReactToastify.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { ToastPortal } from "components";
import { store } from "store";
import { Provider } from "react-redux";
// Call make Server
ReactDOM.render(
	<React.StrictMode>
		<Router>
			<Provider store={store}>
				<App />
				<ToastPortal />
			</Provider>
		</Router>
	</React.StrictMode>,
	document.getElementById("root")
);
