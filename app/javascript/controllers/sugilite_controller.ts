import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  connect() {
    const element = this.element as HTMLElement;
    element.dataset.title = "Sugilite \u{1F48E} The gemstone archive"
    element.dataset.lang = "en";
  }
}
