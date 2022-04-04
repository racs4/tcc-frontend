import { render } from "react-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import App from "./App";
import Home from "./pages/home/Home";
import ICD from "./pages/icd/ICD";
import convert from "color-convert";

const rootElement = document.getElementById("root");
render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="icd" element={<ICD />} />
    </Routes>
  </BrowserRouter>,
  rootElement
);
