fetch('/assets/includes/header.html')
  .then(res => res.text())
  .then(html => {
    const header = document.getElementById('header-content');
    header.innerHTML = html;

    const titleTarget = header.querySelector('#page-title');
    const pageTitle = document.body.dataset.pageTitle;

    if (titleTarget && pageTitle) {
      titleTarget.textContent = pageTitle;
    }
  });
