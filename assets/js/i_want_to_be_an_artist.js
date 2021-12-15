//It's a joke, I am perfectly fine being a lazy dev, and I dont want to spend time inventing fancy stuff here
// thanks to https://github.com/georgedoescode/ for this snippet

(async function () {
  if (CSS["paintWorklet"] === undefined) {
    await import("https://unpkg.com/css-paint-polyfill");
  }
  const seed = Math.round(Math.random() * 100000);
  console.log({seed});
  document.documentElement.style.setProperty('--fleck-seed', seed.toString());
  // The code for this worklet can be found here: https://github.com/georgedoescode/houdini-fleck-patterns/blob/main/fleck-worklet.js
  CSS.paintWorklet.addModule("https://unpkg.com/@georgedoescode/houdini-fleck");
 
  // Fix a weird Safari/Firefox polyfill issue...
  setTimeout(() => {
    document.querySelectorAll(".fleck-pattern").forEach((el) => {
      el.style.width = "100%";

    });
  }, 250);
})();