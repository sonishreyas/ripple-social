import React from "react";
import ReactDOM from "react-dom";
import "css/index.css";
import "react-toastify/dist/ReactToastify.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import {
	AuthProvider,
	LoginProvider,
	NavbarProvider,
	RegisterProvider,
	ThemeProvider,
} from "context";
import { ToastPortal } from "components";
// Call make Server
ReactDOM.render(
	<React.StrictMode>
		<Router>
			<ThemeProvider>
				<NavbarProvider>
					<RegisterProvider>
						<LoginProvider>
							<AuthProvider>
								<App />
								<ToastPortal />
							</AuthProvider>
						</LoginProvider>
					</RegisterProvider>
				</NavbarProvider>
			</ThemeProvider>
		</Router>
	</React.StrictMode>,
	document.getElementById("root")
);
