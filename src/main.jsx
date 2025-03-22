import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { store } from "./app/store.js";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router";
import "./index.css";
import App from "./App.jsx";
// if (process.env.NODE_ENV === "production") disableReactDevTools();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
