module.exports = function (dep) {
  let cmd = {}

  cmd.command = 'scrape [readDir] [writeDir]'
  cmd.desc = 'Scrape report data from Axapta HTML files'
  cmd.builder = {
    debug: {
      describe: "Output argv object"
    }
  }
  cmd.handler = function (argv) {

    const { scrape, log, dir, join, fs } = dep
    const { debug } = argv

    const readDir = argv.readDir || process.env.READ_DIR
    const writeDir = argv.writeDir || process.env.WRITE_DIR

    scrape.readReports(readDir).forEach(o => {
      fs.writeFileSync(join(writeDir, `${o.name}.txt`), JSON.stringify(o, null, 2))
      log.info(`${process.pid}  report for ${o.name} @ ${writeDir}\\${o.name}.txt`)

    })
    log.debug(JSON.stringify(argv, null, 2))





    if (debug) {
      if (debug.includes('argv')) log.debug(argv)
    }
  }

  return cmd
}
