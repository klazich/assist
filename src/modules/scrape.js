module.exports = function (dep) {
  let result = {}

  const { path, tabletojson, _, fs, log, json2csv } = dep
  const { resolve, join, parse } = path


  result.toCSV = (data, fields) => {
    try {
      let csv = json2csv({ data, fields, excelStrings: true })
      log.verbose('conversion to CSV successful')
      return csv
    } catch (err) {
      log.verbose('conversion to CSV failed')
      log.error(err)
    }
  }

  result.toTable = (jsonObj) => {
    // todo
  }

  result.readReports = (dirpath) => fs.readdirSync(dirpath)
    .filter(e => fs.lstatSync(join(dirpath, e)).isFile())
    .filter(e => /\.html?/.test(e))
    .map((report) => {
      let reportPath = resolve(dirpath, report)
      let reportData = fs.readFileSync(reportPath)

      let headings = []
      let [, ...data] = tabletojson.convert(reportData)
        .map(e => e[0])
        .filter(o => Object.keys(o).length >= 12)
        .map(o => Object.values(_.pick(o, ['0', '2', '4', '6', '8', '10'])))
        .map(e => e.map(p => p.replace(/,|"/g, '')))
        .map((e, i) => i === 0 ? headings = e : _.zipObject(headings, e))
      // .sort((a, b) => a.includes('')
      //   ? (b.includes('') ? 0 : 1)
      //   : (b.includes('') ? -1 : 0))

      let otherData = tabletojson.convert(reportData)
        .map(e => e[0])
        .filter(o => Object.keys(o).length < 12)
        .find(o => {
          for (let v of Object.values(o)) {
            if (v.includes('As of')) return true
          }
        })
      let date = Object.values(otherData).find(v => /\d+\/\d+\/\d\d\d\d/.test(v))

      return {
        name: report.split('.')[0],
        file: parse(reportPath),
        date: new Date(date),
        headings,
        data
      }
    })
    .filter(e => e !== undefined)

  return result
}
