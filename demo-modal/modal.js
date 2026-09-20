/* Modale */
const openButton = document.getElementById('open-modal');
const overlay = document.getElementById('modal-overlay');
const dialog = overlay.querySelector('[role="dialog"]');
const closeButton = document.getElementById('close-modal');

// Éléments rendus inertes : jamais un ancêtre de la modale
const inertTargets = [
  document.querySelector('.layout'),
  document.getElementById('footer-container')
];

let trigger = null;

function getFocusableElements() {
  return Array.from(dialog.querySelectorAll('button, a[href], input, select, textarea'));
}

function openModal() {
  trigger = openButton;

  overlay.hidden = false;

  inertTargets.forEach(element => {
    element.inert = true;
  });

  document.documentElement.classList.add('modal-open');

  dialog.focus();
}

function closeModal() {
  inertTargets.forEach(element => {
    element.inert = false;
  });

  document.documentElement.classList.remove('modal-open');

  overlay.hidden = true;

  trigger.focus();
}

openButton.addEventListener('click', openModal);
closeButton.addEventListener('click', closeModal);

document.addEventListener('keydown', event => {
  if (overlay.hidden) return;

  if (event.key === 'Escape') {
    closeModal();
    return;
  }

  if (event.key !== 'Tab') return;

  const focusable = getFocusableElements();
  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  const active = document.activeElement;

  if (!dialog.contains(active)) {
    event.preventDefault();
    (event.shiftKey ? last : first).focus();
  } else if (event.shiftKey && (active === first || active === dialog)) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && active === last) {
    event.preventDefault();
    first.focus();
  }
});

/* Copier le code */
const copyButtons = document.querySelectorAll('.copy-btn');

copyButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const type = btn.getAttribute('data-copy');
    const code = document.getElementById(`code-${type}`);

    if (!code) return;

    navigator.clipboard.writeText(code.textContent).then(() => {
      const original = btn.textContent;
      btn.textContent = 'Copié ✓';

      setTimeout(() => {
        btn.textContent = original;
      }, 1500);
    });
  });
});
