import { renderToString } from "react-dom/server";
import { SecondaryPage } from "./components/pages/SecondaryPage";
export function renderPage(slug: string) {
  return renderToString(<SecondaryPage pathname={`/${slug}.html`} />);
}
