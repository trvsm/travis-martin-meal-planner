import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Landing from "./pages/landing/Landing";
import List from './pages/list/List';
import Options from "./pages/options/Options";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/meals" element={<Options />}/>
        <Route path="/list" element={<List />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
