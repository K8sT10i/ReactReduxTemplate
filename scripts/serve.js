const commander = require('commander')
const http = require('http')
const httpProxy = require('http-proxy')
const Bundler = require('parcel-bundler')

commander
  .arguments('[src...]')
  .option(
    '-d, --out-dir <path>',
    'set the output directory. defaults to "dist"',
  )
  .option(
    '-p, --port <port>',
    'set the port to serve on. defaults to 1234',
    parseInt,
  )
  .option('--proxy <url>', 'set the proxy url', url => {
    const { origin: proxyURL, pathname: proxyPrefix } = new URL(url)
    return { proxyURL, proxyPrefix }
  })
  .action((srcs, { outDir, port, proxy: { proxyURL, proxyPrefix } }) => {
    http
      .createServer((req, resp) => {
        if (req.url.startsWith(proxyPrefix)) {
          proxy.web(req, resp)
        } else {
          bundle(req, resp)
        }
      })
      .listen(port)

    const proxy = httpProxy.createProxyServer({ target: proxyURL })
    proxy.on('error', (err, req, resp) => {
      resp.writeHead(500)
      resp.end(err.message)
    })

    const bundle = new Bundler(srcs, { outDir }).middleware()
  })

commander.parse(process.argv)
