import React from "react";
import ReactDOM from "react-dom";
import "css/app.css";
import "react-toastify/dist/ReactToastify.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { BookmarkProvider, ModalProvider, NavbarProvider } from "context";
import { ToastPortal } from "components";
import { store } from "redux/store/store";
import { Provider } from "react-redux";
// Call make Server
ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<Router>
				<BookmarkProvider>
					<App />
					<ToastPortal />
				</BookmarkProvider>
			</Router>
		</Provider>
	</React.StrictMode>,
	document.getElementById("root")
);
