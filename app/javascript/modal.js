// dropdown function that applies or removes 'expand' class to the sections-sidebar nav
const toggleSidebar = () => {
  document.getElementById("sections-sidebar").classList.toggle("expand");
}

const toggleSideBarIfExpanded = (e) => {
	e.preventDefault();
	if(e.currentTarget.classList === 'sections-sidebar expand') {
		setTimeout(toggleSidebar, 1000);
	}
}

// Add click listener to hamburger icon which invokes sidebar function
// $(() => $('#sections-sidebar-btn').on('click', toggleSidebar));
document.getElementById("sections-sidebar-btn").addEventListener("click", toggleSidebar);

// Close an expanded sidebar after 1 second if mouse leaves sidebar element
// Incomplete feature because sidebar does not remain open if mouse reenters element
// $(() => $('#sections-sidebar').mouseleave(toggleSideBarIfExpanded));
document.getElementById("sections-sidebar").addEventListener("mouseleave", toggleSideBarIfExpanded);