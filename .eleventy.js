module.exports = function(config) {
  config.addPassthroughCopy({ public: './'})
  config.addPassthroughCopy('./src/assets');
  
  config.addWatchTarget("./src/assets/**/*.css");
  config.setBrowserSyncConfig({
    files: ['_site/**/*'],
  })

  return {
    templateFormats: ['md', 'njk', 'jpg', 'png', 'gif'],
    dir: {
      input: 'src',
      output: '_site',
      layouts: '_js/layouts',
    }
  }
}
