const sidebar = document.getElementById("mySidebar");
const expandSidebarButton = document.querySelector(".openbtn");
const collapseSidebarButton = document.querySelector(".closebtn");

function closeNav() {
    sidebar.classList.add("collapsed");
    expandSidebarButton.hidden = false;
    collapseSidebarButton.hidden = true;
    collapseSidebarButton.setAttribute("aria-expanded", "false");
}

function openNav() {
    sidebar.classList.remove("collapsed");
    expandSidebarButton.hidden = true;
    collapseSidebarButton.hidden = false;
    collapseSidebarButton.setAttribute("aria-expanded", "true");
}
