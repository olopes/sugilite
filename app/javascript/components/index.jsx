import React from "react";
import { createRoot } from "react-dom/client";
import App from "./app-root";

document.addEventListener("turbo:load", () => {
    const root = createRoot(
        document.getElementById("sugilite-root")
    );
    root.render(<App />);
});
