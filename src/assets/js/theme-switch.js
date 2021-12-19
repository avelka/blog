const switcher = document.querySelector('#theme-switcher')
const doc = document.firstElementChild;
const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

darkModeMediaQuery.onChange = ((e) => {
  const darkModeOn = e.matches;
  console.log(`Dark mode is ${darkModeOn ? '🌒 on' : '☀️ off'}.`);
});

console.log(doc, darkModeMediaQuery);
switcher.addEventListener('input', e =>
toggleDarkTheme(e.target.checked))

const toggleDarkTheme = dark => {

  doc.setAttribute('color-scheme',  dark ? "dark" : "light");
}