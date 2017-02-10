'use strict'

module.exports = function (dep) {
  let result = {}

  let { aqlAssets, _ } = dep
  let { AQL_LEVEL, LOT_SIZE, LOT_RANGE, AQL_TABLE } = aqlAssets

  result.getSampleSize = (level, lotSize) => {

    let lotIdx = _.sortedIndex(LOT_SIZE, lotSize)
    let lvlIdx = _.sortedIndex(AQL_LEVEL, level)
    let sampleSize = AQL_TABLE[lotIdx][lvlIdx] === 'ALL'
      ? lotSize
      : AQL_TABLE[lotIdx][lvlIdx]


  }
}

const getSampleSize = (aql, lotSize) => {

  let lotIndex = LOT_SIZE.findIndex(v => lotSize < v) - 1;
  if (lotIndex < 0) lotIndex = 14;
  let result = AQL_TABLE[lotIndex][AQL_LEVEL.findIndex(v => v === aql)];
  let lotRange = LOT_RANGES[lotIndex];

  return new Promise((resolve, reject) => {
    if (lotIndex === -1) {
      reject(`Could not match AQL -> ${aql}`)
    } else if (aql > 10) {
      reject('AQL can\'t be grater than 10')
    } else {
      let obj = result === 'ALL'
        ? { sampleSize: lotSize, lotRange }
        : { sampleSize: result, lotRange };
      resolve(obj)
    }
  })
};

module.exports = getSampleSize;