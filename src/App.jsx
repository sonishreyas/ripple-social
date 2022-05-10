import "./App.css";

function App() {
	return (
		<div className="grid-container">
			<Routes>{/* <Route path="/" element={<Home />}></Route> */}</Routes>
			<Outlet />
		</div>
	);
}

export default App;
