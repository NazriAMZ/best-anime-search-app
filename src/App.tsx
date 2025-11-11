import { Routes, Route } from "react-router-dom";
import DetailPage from "./pages/DetailPage";
import SearchPage from "./pages/SearchPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<SearchPage />} />
      <Route path="/anime/:id" element={<DetailPage />} />
    </Routes>
  );
}
