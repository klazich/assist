module.exports = function (dep) {
  let cmd = {}

  cmd.command = 'scrape [ext] [readDir] [writeDir]'
  cmd.desc = 'Scrape report data from Axapta HTML files'
  cmd.builder = {
    debug: {
      describe: 'Output argv object'
    },
    ext: {
      describe: "Extension to save as (default: '.txt')"
    }
  }
  cmd.handler = function (argv) {

    const { scrape, log, dir, join, fs, _ } = dep
    const { debug } = argv

    const readDir = argv.readDir || process.env.READ_DIR
    const writeDir = argv.writeDir || process.env.WRITE_DIR
    const ext = argv.ext || '.json'

    scrape.readReports(readDir).forEach(o => {

      if(!fs.existsSync(writeDir)) fs.mkdirSync(writeDir)

      let reportPath = join(writeDir, `${o.name + ext}`)

      let reportCSV = scrape.toCSV(o.data, o.headings)

      fs.writeFile(reportPath, reportCSV, (err) => {
        if (err) log.error(err)
        else log.info(`${o.file.base} -> ${o.name + ext}\t successful\t file @ ${writeDir}`)
      })
    })

    if (debug) {
      if (typeof debug === 'string') {
        if (debug.includes('argv')) log.debug('argv', { argv })
      }
    }
  }

  return cmd
}
