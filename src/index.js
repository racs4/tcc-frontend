import { render } from "react-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";

import Home from "./pages/home/Home";
import ICD from "./pages/icd/ICD";
import ColorConverter from "./pages/color-converter/ColorConverter";

const rootElement = document.getElementById("root");
render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="icd" element={<ICD />} />
      <Route path="converter" element={<ColorConverter />} />
    </Routes>
  </BrowserRouter>,
  rootElement
);
