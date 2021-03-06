// See http://brunch.io for documentation.
module.exports = {
  paths: {
    watched: ['app/brunch'],
    public: 'vendor/assets'
  },
  modules: {
    wrapper: false
  },
  files: {
    javascripts: {
      joinTo: {
        'javascripts/brunch/app.js': /^app/,
        'javascripts/brunch/vendor.js': /^node_modules/
      },
      order: {
        before: [
          'app/brunch/vue_resources.js'
        ],
        after: [
          'app/brunch/dashboard.js',
          'app/brunch/vue_instance.js'
        ]
      }
    },
    stylesheets: {
      joinTo: {
        'stylesheets/brunch/app.css': /^app/,
        'stylesheets/brunch/vendor.css': /^node_modules/
      }
    }
  },
  npm: {
    globals: {Vue: 'vue'},
    globals: {VueResource: 'vue-resource'},
    styles: {
      'font-awesome': ['css/font-awesome.css']
    }
  },
  plugins: {
    copycat: { // copies to vendor/assets/fonts
      fonts: ["node_modules/font-awesome/fonts"],
      verbose : true
    }
  }
}
