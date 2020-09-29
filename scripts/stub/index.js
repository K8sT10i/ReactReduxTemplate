const commander = require('commander')
const path = require('path')
const Bundler = require('parcel-bundler')
const server = require('./server')
const api = require('./api')

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
  .action((srcs, { outDir, port }) => {
    new Bundler(srcs, {
      outDir,
      watch: true,
      target: 'node',
      sourceMaps: false,
    }).bundle()

    api.all('/:file', (req, resp) => {
      const { file } = req.params
      const filename = path.resolve(outDir, `${file}.js`)

      try {
        delete require.cache[require.resolve(filename)]
        const { default: data } = require(filename)

        resp.json(data)
      } catch (e) {
        resp.sendStatus(404)
      }
    })

    server.listen(port, () =>
      console.log('Stub API is listening on port %s.', port),
    )
  })

commander.parse(process.argv)
