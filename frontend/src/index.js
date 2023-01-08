import React from "react";
import ReactDOM from "react-dom/client";
import NotesContextProvider from "./context.js/NotesContextProvider";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <NotesContextProvider>
      <App />
    </NotesContextProvider>
  </React.StrictMode>
);
