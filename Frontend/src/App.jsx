import "./App.css";
import Login from "./pages/Login";
import { Route, Routes } from "react-router-dom";
import Register from "./pages/Register";
import WatchPartyPage from "./pages/WatchPartyPage";
import SingleVideoPage from "./pages/SingleVideoPage";
import Homepage from "./pages/Homepage";
import UploadVideo from "./pages/UploadVideo";
import UploadedVideos from "./AppComponents/Video/UploadedVideos";
import AuthRoute from "./AppComponents/Layout/AuthLayout";
import { useSelector } from "react-redux";
import DashBoard from "./pages/DashBoard";

function App() {
	const user = useSelector((state) => state.auth.user);

	return (
		<div className='w-[100vw] overflow-x-hidden'>
			<Routes>
				<Route path='/' element={<Homepage />} />
				<Route path='/login' element={<Login />}></Route>
				<Route path='/register' element={<Register />}></Route>

				<Route element={<AuthRoute user={user} />}>
					<Route path='/watchPartyPage' element={<WatchPartyPage />}></Route>
					<Route path='/singleVideoPage' element={<SingleVideoPage />}></Route>
					<Route path='/uploadVideo' element={<UploadVideo />}></Route>
					<Route path='/uploadVideo/:videoId' element={<UploadVideo />} />
					<Route path='/allVideos/:videoId' element={<UploadedVideos />} />

					{/* Protected Routes */}
					<Route path='/dashboard' element={<DashBoard />}></Route>
				</Route>
			</Routes>
		</div>
	);
}

export default App;
