import "./App.css";
import Login from "./pages/Login";
import { Route, Routes } from "react-router-dom";
import Register from "./pages/Register";
import WatchPartyPage from "./pages/WatchPartyPage";
import SingleVideoPage from "./pages/SingleVideoPage";
import AppLayout from "./AppComponents/Layout/AppLayout";
import Homepage from "./pages/Homepage";
import PrivateRoute from "./AppComponents/Layout/PrivateRoute";
import UploadVideo from "./pages/UploadVideo";
import { SocketProvider } from "./socket";
import ProfilePage from "./pages/ProfilePage";
import SearchChannel from "./pages/SearchNewChannel";

function App() {
  return (
    <div className="w-[100vw] max-h-screen overflow-x-hidden">
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/watchPartyPage/join/:id"
          element={
            <SocketProvider>
              <WatchPartyPage />
            </SocketProvider>
          }
        />

        <Route path="/singleVideoPage/:id" element={<SingleVideoPage />} />
        <Route path="/uploadVideo" element={<UploadVideo />} />
        <Route path="/user/profile/:id" element={<ProfilePage />} />
        <Route path="/user/search" element={<SearchChannel />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <AppLayout />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
