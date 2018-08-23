const proxy = require('http-proxy-middleware')

const letterValue = (str) => {
  var anum = {
    a: 1,
    b: 2,
    c: 3,
    d: 4,
    e: 5,
    f: 6,
    g: 7,
    h: 8,
    i: 9,
    j: 10,
    k: 11,
    l: 12,
    m: 13,
    n: 14,
    o: 15,
    p: 16,
    q: 17,
    r: 18,
    s: 19,
    t: 20,
    u: 21,
    v: 22,
    w: 23,
    x: 24,
    y: 25,
    z: 26
  }
  if (str.length === 1) return anum[str] || ' '
  return str.split('').map(letterValue).reduce((accu, curr) => accu + curr)
}

const MODULE_PREFIX = 'modules'

var modules = proxy(`/${MODULE_PREFIX}`, {
  target: `http://${MODULE_PREFIX}:3000/`,
  pathRewrite:
    function (path, req) {
      var moduleHost = req.originalUrl.split('/')[2]
      // console.log(path.replace(`/${MODULE_PREFIX}/${moduleHost}`, ''))
      return path.replace(`/${MODULE_PREFIX}/${moduleHost}`, '')
    },
  router:
    function (req) {
      const MODULE = req.originalUrl.split('/')[2]
      const MODULE_PORT = 65535 - letterValue(MODULE)
      // console.log(`http://localhost:${MODULE_PORT}`)
      return `http://localhost:${MODULE_PORT}`
    },
  changeOrigin: true
})

module.exports = modules
