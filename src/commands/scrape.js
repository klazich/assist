module.exports = function (dep) {
  let cmd = {}

  cmd.command = 'scrape [readDir] [ext]'
  cmd.desc = 'Scrape report data from Axapta HTML files'
  cmd.builder = {
    debug: {
      describe: 'Output argv object',
      array: true
    },
    ext: {
      describe: 'Extension to save as (default: \'.txt\')',
      array: true
    }
  }
  cmd.handler = function (argv) {
    const { scrape, log, join, fs, _, moment } = dep
    const { debug, readDir } = argv
    const ext = argv.ext || [ '.json' ]

    if (!fs.existsSync(readDir)) {
      log.error(`readDir: '${readDir}' does not exist`)
      return 1
    }

    let conversions = ext
      .map(e => ({
        name: e.replace(/\./g, ''),
        path: join(readDir, e.replace(/\./g, '')),
        ext: e
      }))

    scrape.readReports(readDir).forEach(o => {
      let { data, fields, name, file } = o
      let timestamp = moment().format('_YYYYMMDD')

      conversions.forEach(type => {
        if (!fs.existsSync(type.path)) fs.mkdirSync(type.path)

        let convertData
        switch (type.name) {
          case 'csv':
            convertData = scrape.toCSV(data, fields)
            break
          case 'xls':
            convertData = scrape.toXLS(data, fields)
            break
          case 'done':
            convertData = data
            break
          default:
          case 'json':
            convertData = scrape.toJSON(data, fields)
        }

        let dirpath = type.path
        let filepath = join(dirpath, name + timestamp + type.ext)

        fs.writeFile(filepath, convertData, (err) => {
          if (err) log.error(err)
          else log.info([ _.padEnd(file.base, 15), '->', _.padEnd(type.ext, 6), `successful, file @ '${dirpath}'` ].join(' '))
        })
      })
    })

    if (debug) {
      if (typeof debug === 'string') {
        if (debug.includes('argv')) log.object('argv', argv)
      }
    }
  }

  return cmd
}
