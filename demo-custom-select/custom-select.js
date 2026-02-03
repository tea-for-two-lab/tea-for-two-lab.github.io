const select = document.querySelector('.custom-select');
const trigger = select.querySelector('.custom-select__trigger');
const listbox = select.querySelector('.custom-select__list');
const options = Array.from(listbox.querySelectorAll('[role="option"]'));
const hiddenInput = select.querySelector('input[type="hidden"]');

let isOpen = false;
let currentIndex = -1;

/* ---------- utils ---------- */

function openListbox() {
  isOpen = true;
  listbox.hidden = false;
  trigger.setAttribute('aria-expanded', 'true');
}

function closeListbox({ restoreFocus = true } = {}) {
  isOpen = false;
  listbox.hidden = true;
  trigger.setAttribute('aria-expanded', 'false');

  resetOptions();
  currentIndex = -1;

  if (restoreFocus) {
    trigger.focus();
  }
}

function resetOptions() {
  options.forEach(option => {
    option.tabIndex = -1;
  });
}

function setActiveOption(index) {
  resetOptions();

  currentIndex = index;
  const option = options[currentIndex];

  option.tabIndex = 0;
  option.focus();
}

function selectOption(option) {
  // Mise à jour visuelle
  trigger.querySelector('.custom-select__label').textContent =
    option.textContent;

  // Mise à jour valeur formulaire
  hiddenInput.value = option.textContent;

  // Mise à jour ARIA
  options.forEach(opt =>
    opt.removeAttribute('aria-selected')
  );
  option.setAttribute('aria-selected', 'true');

  closeListbox();
}

/* ---------- events ---------- */

/* Bouton */
trigger.addEventListener('click', () => {
  isOpen ? closeListbox() : openListbox();
});

trigger.addEventListener('keydown', (e) => {
  // Ouvrir la liste sans entrer dedans
  if (!isOpen && (e.key === 'Enter' || e.key === ' ')) {
    e.preventDefault();
    openListbox();
    return;
  }

  // Entrée volontaire dans la liste
  if (isOpen && e.key === 'ArrowDown') {
    e.preventDefault();

    const selectedIndex = options.findIndex(
      option => option.getAttribute('aria-selected') === 'true'
    );

    setActiveOption(selectedIndex >= 0 ? selectedIndex : 0);
    return;
  }

  // Fermeture
  if (isOpen && e.key === 'Escape') {
    e.preventDefault();
    closeListbox();
  }
});

/* Options */
options.forEach((option, index) => {
  option.addEventListener('click', () => {
    selectOption(option);
  });

  option.addEventListener('keydown', (e) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setActiveOption((index + 1) % options.length);
        break;

      case 'ArrowUp':
        e.preventDefault();
        setActiveOption(
          (index - 1 + options.length) % options.length
        );
        break;

      case 'Enter':
        e.preventDefault();
        selectOption(option);
        break;

      case 'Escape':
        e.preventDefault();
        closeListbox();
        break;
    }
  });
});

/* Clic extérieur */
document.addEventListener('click', (e) => {
  if (isOpen && !select.contains(e.target)) {
    closeListbox({ restoreFocus: false });
  }
});
