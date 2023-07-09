import { BrowserRouter, Routes, Route} from "react-router-dom"
import Navbar from "./components/navbar";
import SubforumPage from "./pages/subforumPage";
import Home from "./pages/HomePage";
import Post from "./pages/PostPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import UserPage from "./pages/UserPage";
import CreateSubforumPage from "./pages/CreateSubforumPage";
import SubforumSettingsPage from "./pages/SubforumSettingsPage";
import BrowseSubforumsPage from "./pages/BrowseSubforumsPage";

function App() {

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/all" element={<BrowseSubforumsPage />}></Route>
          <Route path="/:subforum" element={<SubforumPage />}></Route>
          <Route path="/:subforum/settings" element={<SubforumSettingsPage />}></Route>
          <Route path="/:subforum/:id" element={<Post />}></Route>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/register" element={<RegisterPage />}></Route>
          <Route path="/user/:username" element={<UserPage />}></Route>
          <Route path="/create" element={<CreateSubforumPage />}></Route>
      </Routes>
    </BrowserRouter>
    
  );
}

export default App;
