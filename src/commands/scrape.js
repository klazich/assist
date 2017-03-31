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
    const ext = argv.ext || ['.csv' || '.json']

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

      if (!fs.existsSync(join(readDir, 'src'))) fs.mkdirSync(join(readDir, 'src'))
      fs.writeFile(
        join(readDir, 'src', moment(o.date).format('YYYYMMDD') + '.json'),
        JSON.stringify(o, null, 2),
        (err) => {
          if (err) log.error(err.message, { err })
        })

      conversions.forEach(type => {
        if (!fs.existsSync(type.path)) fs.mkdirSync(type.path)

        let convertData
        switch (type.name) {
          case 'xls':
            convertData = scrape.toXLS(data, fields)
            break
          case 'json':
            convertData = scrape.toJSON(data)
            break
          default:
          case 'csv':
            convertData = scrape.toCSV(data, fields)
            break
        }

        let dirpath = type.path
        let filepath = join(dirpath, name + timestamp + type.ext)

        fs.writeFile(filepath, convertData, (err) => {
          if (err) {
            log.error([_.padEnd(file.base, 15), '->', _.padEnd(type.ext, 6), 'FAILED'].join(' '))
            log.error(err.message, { err })
          }
          else log.info([file.base, '\t to', _.padEnd(type.ext, 6), ('DONE'), `file location: '${dirpath}'`].join(' '))
        })
      })
    })

    if (debug) {
      process.nextTick(() => { if (debug.includes('argv')) log.debug({ argv }) })
    }

  }

  return cmd
}
