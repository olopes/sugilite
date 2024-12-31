import { createRoot } from "react-dom/client";
import AppRoot from "@/components/app-root";

document.addEventListener("turbo:load", () => {
  const rootEl = document.getElementById("sugilite-root")!;
  const root = createRoot(rootEl);
  root.render(<AppRoot title={rootEl.dataset.title ?? "Sugilite"} />);
});
