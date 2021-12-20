const switcher = document.querySelector('#theme-switcher')
const doc = document.firstElementChild;
const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
const toggleDarkTheme = (dark, persist = true) => {

  if (persist) {
    localStorage.setItem('dark-mode', dark);
  }
  const isDarkModeEnabled = localStorage.getItem('dark-mode') == 'true';
  switcher.querySelector('#dark').checked = isDarkModeEnabled;
  const theme = isDarkModeEnabled ? "dark" : "light";
  doc.setAttribute('color-scheme', theme);
}


toggleDarkTheme(darkModeMediaQuery.matches, false);
switcher.addEventListener('input', e =>
  toggleDarkTheme(e.target.checked))

