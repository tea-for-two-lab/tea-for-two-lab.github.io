const tabs = Array.from(document.querySelectorAll('[role="tab"]'));
const panels = Array.from(document.querySelectorAll('[role="tabpanel"]'));

function activateTab(tab) {
  tabs.forEach(currentTab => {
    const isSelected = currentTab === tab;
    const panelId = currentTab.getAttribute('aria-controls');
    const panel = document.getElementById(panelId);

    currentTab.setAttribute('aria-selected', String(isSelected));
    currentTab.tabIndex = isSelected ? 0 : -1;

    if (panel) {
      panel.hidden = !isSelected;
    }
  });
}

function moveFocus(currentTab, direction) {
  const currentIndex = tabs.indexOf(currentTab);
  const nextIndex = (currentIndex + direction + tabs.length) % tabs.length;

  tabs[nextIndex].focus();
}

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    activateTab(tab);
  });

  tab.addEventListener('keydown', event => {
    switch (event.key) {
      case 'ArrowRight':
        event.preventDefault();
        moveFocus(tab, 1);
        break;

      case 'ArrowLeft':
        event.preventDefault();
        moveFocus(tab, -1);
        break;

      case 'Home':
        event.preventDefault();
        tabs[0].focus();
        break;

      case 'End':
        event.preventDefault();
        tabs[tabs.length - 1].focus();
        break;

      case 'Enter':
      case ' ':
        event.preventDefault();
        activateTab(tab);
        break;
    }
  });
});
