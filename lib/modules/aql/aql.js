'use strict'

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

      resolve({
        sampleSize: AQL_TABLE[lotIdx][lvlIdx] === 'ALL'
          ? lotSize
          : AQL_TABLE[lotIdx][lvlIdx],
        aqlUsed: AQL_LEVEL[lvlIdx],
        lotRange: LOT_RANGES[lotIdx]
      })
    })
  }

  return result
}
