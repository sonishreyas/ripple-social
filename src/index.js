import React from "react";
import ReactDOM from "react-dom";
import "css/app.css";
import "react-toastify/dist/ReactToastify.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import {
	AuthProvider,
	BookmarkProvider,
	LoginProvider,
	ModalProvider,
	NavbarProvider,
	PostProvider,
	RegisterProvider,
	ThemeProvider,
	UserProvider,
} from "context";
import { ToastPortal } from "components";
import { store } from "redux/store/store";
import { Provider } from "react-redux";
// Call make Server
ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<Router>
				<ThemeProvider>
					<NavbarProvider>
						<RegisterProvider>
							<LoginProvider>
								<AuthProvider>
									<ModalProvider>
										<UserProvider>
											<PostProvider>
												<BookmarkProvider>
													<App />
													<ToastPortal />
												</BookmarkProvider>
											</PostProvider>
										</UserProvider>
									</ModalProvider>
								</AuthProvider>
							</LoginProvider>
						</RegisterProvider>
					</NavbarProvider>
				</ThemeProvider>
			</Router>
		</Provider>
	</React.StrictMode>,
	document.getElementById("root")
);
