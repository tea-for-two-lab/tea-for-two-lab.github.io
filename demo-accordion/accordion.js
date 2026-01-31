/* Accordéon */
const buttons = document.querySelectorAll('.accordion button');

buttons.forEach(button => {
  const panel = document.getElementById(
    button.getAttribute('aria-controls')
  );

  button.addEventListener('click', () => {
    const expanded =
      button.getAttribute('aria-expanded') === 'true';

    button.setAttribute(
      'aria-expanded',
      String(!expanded)
    );

    panel.hidden = expanded;
  });
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
