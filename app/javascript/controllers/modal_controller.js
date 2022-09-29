import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  toggleModal () {
    document.getElementById("search-modal").classList.toggle('expand');
    document.getElementById("overlay").classList.toggle('hidden');
  }
}
