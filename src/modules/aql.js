
module.exports = function (dep) {
  let result = {}

  let { aqlAssets, _ } = dep
  let { AQL_LEVEL, LOT_SIZE, LOT_RANGES, AQL_TABLE } = aqlAssets

  result.getSampleSize = (level, lotSize) => {
    return new Promise((resolve, reject) => {
      if (level > 10) reject('AQL level can not be greater than 10')

      let lotIdx = _.sortedIndex(LOT_SIZE, lotSize)
      if (lotIdx === -1) reject('Error matching Lot param to lot index')

      let lvlIdx = _.sortedIndex(AQL_LEVEL, level)
      if (lvlIdx === -1) reject('Error matching AQL param to AQL index')

      let returnObj = {}

      returnObj = {
        request: { level, lotSize },
        lot: LOT_RANGES[lotIdx],
        range: []
      }

      try {
        _.range(lvlIdx - 2, lvlIdx + 3)
          .forEach(v => {
            if (_.isUndefined(AQL_LEVEL[v]) === false) {
              returnObj.range.push({
                size: AQL_TABLE[lotIdx][v] === 'ALL'
                  ? lotSize
                  : AQL_TABLE[lotIdx][v],
                aql: AQL_LEVEL[v],
                result: v === lvlIdx || undefined
              })
            }
          })
      } catch (e) {
        reject(e)
      }
      resolve(returnObj)
    })
  }

  return result
}
