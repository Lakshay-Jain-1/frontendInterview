import { createRoot } from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./store/store.ts";
import { BrowserRouter, Route, Routes } from "react-router";
import TechnicalRound from "./modules/codeEditor/pages/TechnicalRound.tsx";
import VideoChat from "./modules/interview/pages/Interview.tsx";
import App from "./App.tsx";
createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/technical" element={<TechnicalRound />} />
        <Route path="/interview" element={<VideoChat />} />
        <Route path="/" element={<App />} />
      </Routes>
    </BrowserRouter>
  </Provider>
);
