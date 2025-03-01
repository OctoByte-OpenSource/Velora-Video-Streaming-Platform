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
import ProfileImage from "./AppComponents/ProfileImage";
import ProfilePageWrapped from "./pages/ProfilePage";
import SearchNewChannel from "./pages/SearchNewChannel";
import { SocketProvider } from "./socket";
import { Toaster } from "react-hot-toast";

function App() {
  const user = useSelector((state) => state.auth.user);

  return (
    <div className="w-[100vw] overflow-x-hidden">
      <Routes>
        <Route path="/" element={<AuthRoute user={user} />}>
          <Route index path="/" element={<DashBoard />} />
          <Route path="/video/:id" element={<SingleVideoPage />} />
          <Route path="/uploadVideo" element={<UploadVideo />} />
          <Route path="/editVideo/:videoId" element={<UploadVideo />} />
          <Route path="/allVideos" element={<UploadedVideos />} />
          <Route path="/user/profile/:id" element={<ProfilePageWrapped />} />
          <Route path="/user/search" element={<SearchNewChannel />} />
          <Route
            path="/watchPartyPage/join/:id"
            element={
              <SocketProvider>
                <WatchPartyPage />
              </SocketProvider>
            }
          />
        </Route>
        <Route path="/startPage" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
