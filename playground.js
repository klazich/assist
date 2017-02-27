const _ = require('lodash')

let ARR = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i']

let idx = 1


let x = []
_.range(idx - 2, idx + 3).forEach(v => {
  if (typeof ARR[v] !== 'undefined') x.push(ARR[v])
})

console.log(x)