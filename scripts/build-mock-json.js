const commander = require('commander')
const fs = require('fs')
const path = require('path')
const Bundler = require('parcel-bundler')

commander
  .arguments('[src...]')
  .option('-d, --out-dir <path>', 'set the output directory')
  .action((srcs, { outDir }) => {
    new Bundler(srcs, {
      outDir,
      watch: false,
      target: 'node',
      sourceMaps: false,
    })
      .bundle()
      .then(() =>
        Promise.all(
          fs
            .readdirSync(outDir, { withFileTypes: true })
            .filter(dirent => dirent.isFile() && dirent.name.endsWith('.js'))
            .map(dirent => [
              path.resolve(outDir, dirent.name),
              path.resolve(outDir, dirent.name.replace(/\.js$/, '.json')),
            ])
            .map(
              ([srcFilename, distFilename]) =>
                new Promise((resolve, reject) => {
                  console.log('Write to', distFilename)

                  const { default: data } = require(srcFilename)
                  fs.writeFile(
                    distFilename,
                    JSON.stringify(data, null, 2),
                    err => (err ? reject(err) : resolve()),
                  )
                }),
            ),
        ),
      )
      .then(
        () => console.log('Complete'),
        errs => {
          console.error(errs)
          process.exit(1)
        },
      )
  })

commander.parse(process.argv)
