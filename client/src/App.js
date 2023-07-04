import { BrowserRouter, Routes, Route} from "react-router-dom"
import Navbar from "./components/navbar";
import SubforumPage from "./pages/subforumPage";
import Home from "./pages/HomePage";
import Post from "./pages/PostPage";

function App() {

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/:subforum" element={<SubforumPage />}></Route>
          <Route path="/:subforum/:id" element={<Post />}></Route>
      </Routes>
    </BrowserRouter>
    
  );
}

export default App;
