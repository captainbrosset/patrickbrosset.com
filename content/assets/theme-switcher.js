const theme = localStorage.getItem('theme') || 'auto';
document.documentElement.setAttribute('data-theme', theme);

window.onload = function() {
  document.querySelectorAll('[name=theme-option-input').forEach(input => {
    input.addEventListener('change', e => {
      const newTheme = e.target.value;
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
    });
  });
}
