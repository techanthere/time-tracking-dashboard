window.addEventListener("DOMContentLoaded", () => {
  const tabs = document.querySelectorAll('[role="tab"]');
  const tabList = document.querySelector('[role="tablist"]');

  // Add a click event handler to each tab
  tabs.forEach(tab => {
    tab.addEventListener("click", changeTabs);
  });

  // Enable arrow navigation between tabs in the tab list
  let tabFocus = 0;

  tabList.addEventListener("keydown", e => {
    // Move right
    if (e.keyCode === 39 || e.keyCode === 40 || e.keyCode === 38 || e.keyCode === 37) {
      if (e.keyCode === 39) {
        tabFocus++;
        // If we're at the end, go to the start
        if (tabFocus >= tabs.length) {
          tabFocus = 0;
        }
        // Move left
      } else if (e.keyCode === 37) {
        tabFocus--;
        // If we're at the start, move to the end
        if (tabFocus < 0) {
          tabFocus = tabs.length - 1;
        }
      }

      tabs[tabFocus].focus();
    }
  });
});

function changeTabs(e) {
  const target = e.target;
  const parentAll = document.querySelector(".main");
  parentAll.querySelectorAll('[aria-selected="true"]').forEach(t => t.setAttribute("aria-selected", false));
  target.setAttribute("aria-selected", true);
  parentAll.querySelectorAll('[role="tabpanel"]').forEach(div => {
  div.setAttribute("hidden", true);
  });
  parentAll.querySelector(`#${target.getAttribute("aria-controls")}`).removeAttribute("hidden");
}
