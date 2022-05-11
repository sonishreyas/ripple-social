import React from "react";
import ReactDOM from "react-dom";
import "css/index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import {
	AuthProvider,
	LoginProvider,
	NavbarProvider,
	RegisterProvider,
	ThemeProvider,
} from "context";

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
							</AuthProvider>
						</LoginProvider>
					</RegisterProvider>
				</NavbarProvider>
			</ThemeProvider>
		</Router>
	</React.StrictMode>,
	document.getElementById("root")
);
