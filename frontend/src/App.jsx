import { BrowserRouter, Routes, Route } from "react-router-dom";
import Builder from "./pages/Builder";
import Form from "./pages/Form";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Builder />} />
        <Route path="/form/:id" element={<Form />} />
        <Route path="/dashboard/:id" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
