import { BrowserRouter, Routes, Route} from "react-router-dom"
import Navbar from "./components/navbar";
import SubforumPage from "./pages/subforumPage";
import Home from "./pages/HomePage";
import Post from "./pages/PostPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

function App() {

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/:subforum" element={<SubforumPage />}></Route>
          <Route path="/:subforum/:id" element={<Post />}></Route>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/register" element={<RegisterPage />}></Route>
      </Routes>
    </BrowserRouter>
    
  );
}

export default App;
