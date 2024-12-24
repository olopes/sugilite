import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  connect() {
    this.element.dataset.title = "Hello World!"
    this.element.dataset.lang="en";
  }
}
