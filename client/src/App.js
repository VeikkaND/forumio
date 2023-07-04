import { BrowserRouter, Routes, Route} from "react-router-dom"
import Navbar from "./components/navbar";
import SubforumPage from "./pages/subforumPage";
import Home from "./pages/HomePage";

function App() {

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/:subforum" element={<SubforumPage />}></Route>
      </Routes>
    </BrowserRouter>
    
  );
}

export default App;
