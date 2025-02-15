import "./App.css";
import Login from "./pages/Login";
import { Route, Routes } from "react-router-dom";
import Register from "./pages/Register";
import AppLayout from "./AppComponents/Layout/appLayout";

function App() {
	return (
		<div className='w-[100vw] overflow-x-hidden'>
			<Routes>
				<Route path='/' element={<AppLayout />}></Route>
				<Route path='/login' element={<Login />}></Route>
				<Route path='/register' element={<Register />}></Route>
			</Routes>
		</div>
	);
}

export default App;
