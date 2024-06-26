const path = require('node:path');
const { isBuild } = require('./is-build');
const { bundleCode } = require('./bundle-code');
const { config, INLINE } = require('./config');

const { url, type } = config;

/**
 * Builder for when all the bookmarklet code is in the bookmarklet link.
 */
const inlineBuilder = {
  bundleForUrl() {
    return bundleCode(path.join(__dirname, '../src/bookmarklet.js'), {
      verbose: true,
      inline: true,
    });
  },
  configure11ty(_eleventyConfig) {
    // no op
  }
};

/**
 * Builder for when the bookmarklet code is lazy loaded after bookmarklet is triggered by user.
 */
const lazyLoadBuilder = {
  bundleForUrl() {
    return bundleCode(path.join(__dirname, './lazy-loader.js'), {
      // size of this isn't interesting because it doesn't change
      verbose: false,
      inline: true,
    })
    .then(code => {
      const devUrl = 'http://localhost:8080';
      return code.replaceAll('__BOOKMARKLET_URL__', isBuild ? url : devUrl);
    })
  },
  // Need to minify bookmarklet.js to be served as a static file
  configure11ty(eleventyConfig) {
    eleventyConfig.addTemplateFormats('js');
    eleventyConfig.addExtension('js', {
      outputFileExtension: 'js',
      /**
       * @param {string} _content content to transform
       * @param {string} filePath path to file being transformed, relative to project root
       */
      compile: async (_content, filePath) => {
        if (filePath !== './src/bookmarklet.js') {
          return;
        }

        return () => {
          return bundleCode(path.join(__dirname, '../', filePath), {
            verbose: true,
            inline: false,
          });
        };
      }
    });
  }
};

module.exports.builder = type === INLINE ? inlineBuilder : lazyLoadBuilder;
