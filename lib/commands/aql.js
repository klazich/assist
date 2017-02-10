'use strict'

module.exports = function (dep) {
  let cmd = {}

  cmd.command = 'aql <level> <lotSize>'
  cmd.desc = 'Get sample size with given AQL level and lot size'
  cmd.builder = {}
  cmd.handler = function (argv) {
    const { level, lotSize } = argv
    const { log, _, colors, aql: { getSampleSize } } = dep
    const { gray, green } = colors

    getSampleSize(level, lotSize)
      .then(({ sampleSize, lotRange }) => {
        log.log(null, `${_.padStart('AQL Level', 16)}  ${level}`)
        log.log(null, `${_.padStart('Lot Size', 16)}  ${lotSize} ${gray(lotRange)}`)
        log.log('debug', `${_.padStart('Sample Size', 16)}  ${green(sampleSize)}`)
      })
      .catch((e) => log.log('error', e))
  }

  return cmd
}