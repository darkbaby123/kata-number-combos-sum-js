function combos(sum, start = 1) {
  if (sum === start) return [[start]]
  if (sum < start) return null

  const re = []
  const limit = Math.floor(sum / 2)

  for (let i = start; i <= limit; i++) {
    const restCombos = combos(sum - i, i)
    if (!restCombos) continue
    for (let rest of restCombos) re.push([i].concat(rest))
  }

  return (re.length === 0 ? [] : re).concat([[sum]])
}

module.exports = combos
