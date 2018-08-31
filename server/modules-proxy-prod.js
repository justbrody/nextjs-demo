const proxy = require('http-proxy-middleware')

const MODULE_PREFIX = 'modules'
const MODULE_PORT = 3000

var modules = proxy(`/${MODULE_PREFIX}`, {
  target: `http://${MODULE_PREFIX}:${MODULE_PORT}/`,
  pathRewrite: function (path, req) {
    var moduleHost = req.originalUrl.split('/')[2]
    return path.replace(`/${MODULE_PREFIX}/${moduleHost}`, '')
  },
  router: function (req) {
    const MODULE = req.originalUrl.split('/')[2]
    return `http://${MODULE}:${MODULE_PORT}`
  },
  changeOrigin: true
})

const moduleApis = proxy(`/${MODULE_PREFIX}`, {
  target: `http://${MODULE_PREFIX}:${MODULE_PORT}/`,
  pathRewrite:
    function (path, req) {
      var moduleHost = req.originalUrl.split('/')[3]
      return path.replace(`/${MODULE_PREFIX}/${moduleHost}`, '')
    },
  router:
    function (req) {
      const MODULE = req.originalUrl.split('/')[3]
      return `http://${MODULE}:${MODULE_PORT}`
    },
  changeOrigin: true
})

module.exports = {modules, moduleApis}
