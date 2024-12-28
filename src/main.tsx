import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Provider } from "react-redux";
import { store } from "./store/store.ts";
import { BrowserRouter, Route, Routes } from "react-router";
import TechnicalRound from "./modules/codeEditor/pages/TechnicalRound.tsx";
createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/technical" element={<TechnicalRound />} />
        <Route path="/" element={<App />} />
      </Routes>
    </BrowserRouter>
  </Provider>
);
