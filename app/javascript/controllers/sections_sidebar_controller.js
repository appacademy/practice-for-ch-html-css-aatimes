import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  // dropdown function that applies or removes 'expand' class to the sections-sidebar nav
  toggleSidebar () {
    document.getElementById("sections-sidebar").classList.toggle("expand");
  }

  // Close an expanded sidebar after 1 second if mouse leaves sidebar element
  // Incomplete feature because sidebar does not remain open if mouse reenters element
  toggleSidebarIfExpanded (e) {
    e.preventDefault();
    if(e.currentTarget.classList[1] === 'expand') {
      setTimeout(this.toggleSidebar, 1000);
    }
  }
}