import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  connect() {
    const element = this.element as HTMLElement;
    element.dataset.title = "Hello World!"
    element.dataset.lang = "en";
  }
}
