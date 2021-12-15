module.exports = function(config) {
  config.addPassthroughCopy({ public: './'})
  config.addPassthroughCopy('./src/assets');
  
  config.addWatchTarget("./src/assets/**/*.css");
  config.setBrowserSyncConfig({
    files: ['_site/**/*'],
  })
  let markdownIt = require("markdown-it");
  let options = {
    html: true,
    breaks: true,
    linkify: true
  };
  const md = markdownIt(options).use(require('markdown-it-anchor'), {
    level: 1,
  // slugify: string => string,
  permalink: true,
  // renderPermalink: (slug, opts, state, permalink) => {},
  permalinkClass: 'header-anchor',
  permalinkSymbol: '#',
  permalinkBefore: true
  });
  config.setLibrary("md", md);
  return {
    templateFormats: ['md', 'njk', 'jpg', 'png', 'gif'],
    dir: {
      input: 'src',
      output: '_site',
      layouts: '_js/layouts',
    }
  }
}
