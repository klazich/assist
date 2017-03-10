module.exports = function (dep) {
  let result = {}

  const { path, tabletojson, _, fs } = dep
  const { resolve, join, parse } = path

  const root = resolve(__dirname, '..')

  result.parseReport = (dirpath = join(root, 'scrape')) => {
    return fs.readdirSync(dirpath)
      .map(report => {
        let reportPath = resolve(dirpath, report)
        let reportData = fs.readFileSync(reportPath)

        let headings = []
        let [, ...data] = tabletojson.convert(reportData)
          .map(e => e[0])
          .filter(o => Object.keys(o).length >= 12)
          .map(o => Object.values(_.pick(o, ['0', '2', '4', '6', '8', '10'])))
          .map(e => e.map(p => p.replace(/,|"/g, '')))
          .sort((a, b) => a.includes('')
            ? (b.includes('') ? 0 : 1)
            : (b.includes('') ? -1 : 0))
          .map((e, i) => i === 0 ? headings = e : _.zipObject(headings, e))

        return {
          name: report.split('.')[0],
          file: parse(reportPath),
          headings,
          data
        }
      })
  }

  return result
}
