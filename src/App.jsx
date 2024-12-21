import { BrowserRouter, Route, Routes } from "react-router-dom";
import FilterAndSort from "./FilterAndSort";
import PaginationComponent from "./functionality/pagination/PaginationComponent";
import Home from "./Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/paginate" element={<PaginationComponent />} />
        <Route path="/filter" element={<FilterAndSort />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
