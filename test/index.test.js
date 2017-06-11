const combos = require('../lib/index.js')

Array.prototype.equals = function(a2) {
  var len = this.length
  if (len !== a2.length) return false
  for (var i = 0; i < len; i++) if (this[i] !== a2[i]) return false
  return true
}

let answers = {}

function get1s(times) {
  var res = []
  while (times--) res.push(1)
  return res
}

function the42ndGod(num) {
  if (answers[num]) return answers[num]

  var arr = [[num]], diff, perm, lim = num / 2

  for (var i = 1; i < num; i++) {
    arr.push([i].concat(get1s(num - i)))
  }

  for (i = 1; i < lim; i++) {
    diff = num - i
    if (diff > 1) {
      perm = the42ndGod(diff)

      for (var j = 0, len = perm.length; j < len; j++) {
        arr.push([i].concat(perm[j]))
      }
    }
  }

  if (num !== 2 && num % 2 === 0) arr.push([num / 2, num / 2])

  arr = rem(arr)
  answers[num] = arr
  return arr
}

function rem(arr, num) {
  arr = arr.map(e => e.sort((a,b) => a - b))

  for (var i = 0, len = arr.length; i < len; i++) {
    for (var j = i + 1; j < len; j++) {
      if (arr[i].equals(arr[j])) {
        arr.splice(j, 1)
        j--
        len--
      }
    }
  }

  return arr
}

function sortAndStringify(a) {
  const arrayOfStrings = a.map(subArray => JSON.stringify(subArray.sort()))
  return JSON.stringify(arrayOfStrings.sort())
}

describe('Find all possible number combos that sum to a number', () => {
  for(let i = 1; i <= 20; i++) {
    const a = the42ndGod(i)
    const b = combos(i)

    it(`testing ${i}`, () => {
      expect(b.length).toEqual(a.length)
      expect(sortAndStringify(b)).toEqual(sortAndStringify(a))
    })
  }
})
