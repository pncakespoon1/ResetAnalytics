// Wants:
// Graph session stats over time 

const timelines = ["Iron", "Wood", "Iron Pickaxe", "Nether", "Bastion", "Fortress", "Nether Exit", "Stronghold", "End"]

const hmsToMs = (h, m, s) => h * 60 * 60 * 1000 + m * 60 * 1000 + Math.round(s * 1000)
const timeToMs = time => time.length > 0 ? hmsToMs(...time.replace("*", "").split(":")) : 0
const isNewSession = (prev, curr, breakTime) => prev - curr - breakTime > (1000 * 60 * 60)
const isPncakeTracker = item => "Session Marker" in item
const sum = (data) => data.reduce((sum, value) => sum + value, 0)
const mean = dist => (dist.length > 0 ? sum(dist) / dist.length : 0)
const stdev = dist => (dist.length > 1 ? Math.sqrt(dist.reduce((acc, val) => acc + Math.pow(val - mean(dist), 2), 0) / dist.length) : 0)

const processLinePlotData = (data) => {
  if (data.length === 0) {
    return []
  }
  const distData = []
  const sortedData = [...data].sort((a, b) => a - b)
  const step = 5000
  const start = Math.floor(sortedData[0] / step) * step
  const end = sortedData[Math.floor((sortedData.length > 50 ? sortedData.length * 0.98 : sortedData.length - 1))]
  const dataRange = Array.from(Array((Math.ceil((end - start) / step / 8) * 8) + 1).keys(), (i) => start + i * step)
  dataRange.forEach((num, idx) => {
    const index = sortedData.findIndex((element) => element >= num)
    const count1 = index !== -1 ? index : sortedData.length
    distData.push({ time: num, count: count1 })
  })
  return distData
}

// Blinds per hour (preBlindCount / (preBlindRTA / 1000 / 60 / 60))
const bph = item => {
  const preBlindRTA = timeToMs(item["Nether Exit"].length > 0 ? item["Nether Exit"] : item["RTA"]) + timeToMs(item["RTA Since Prev"])
  const preBlindCount = item["Nether Exit"].length > 0
  return [preBlindRTA, preBlindCount]
}

// Total playtime
const tp = item => {
  return timeToMs(item["RTA Since Prev"]) + timeToMs(item["RTA"])
}

// Time spent in overworld
const owTime = item => {
  return timeToMs(item["Nether"].length > 0 ? item["Nether"] : item["RTA"]) + timeToMs(item["RTA Since Prev"])
}

// Time spent on wall
const wallTime = item => {
  if (isPncakeTracker(item)) {
    return timeToMs(item["Wall Time Since Prev"])
  } else {
    return null
  }
}

// Time spent in nether
const netherTime = item => {
  return tp(item) - owTime(item)
}

// Seeds played
const sp = item => {
  return parseInt(item["Played Since Prev"]) + 1
}

// Reset count
const rc = item => {
  return parseInt(item["Wall Resets Since Prev"]) + parseInt(item["Played Since Prev"]) + 1
}

// Enter type analysis
const et = (item, types) => {
  if (item["Enter Type"] !== "None" && item["Nether"]) {
    if (!types.hasOwnProperty(item["Enter Type"]))
      types[item["Enter Type"]] = { total: 0, sum: 0 }
    types[item["Enter Type"]].total += 1
    types[item["Enter Type"]].sum += timeToMs(item["Nether"])
  }
}

// Biome Type nether enter analysis
const bt = (item, types) => {
  if (item["Nether"]) {
    for (let type in types) {
      if (item["Spawn Biome"].includes(type)) {
        types[type].total += 1
        types[type].sum += timeToMs(item["Nether"])
        return
      }
    }
    types["other"].total += 1
    types["other"].sum += timeToMs(item["Nether"])
  }
}

// Iron Type nether enter analysis
const it = (item, types) => {
  if (item["Nether"]) {
    for (let type in types) {
      if (item["Iron Source"] === type) {
        types[type].total += 1
        types[type].sum += timeToMs(item["Nether"])
        return
      }
    }
    types["other"].total += 1
    types["other"].sum += timeToMs(item["Nether"])
  }
}

const ei = (item, types) => {
  if (item["Nether"]) {
    for (let ironType in types) {
      if (item["Iron Source"] === ironType) {
        for (let enterType in types[ironType]) {
          if (item["Enter Type"] === enterType) {
            types[ironType][enterType].total += 1
            types[ironType][enterType].sum += timeToMs(item["Nether"])
            return
          }
        }
      }
    }
    for (let enterType in types["other"]) {
      if (item["Enter Type"] === enterType) {
        types["other"][enterType].total += 1
        types["other"][enterType].sum += timeToMs(item["Nether"])
        return
      }
    }
  }
}

// Does all operations
export const doAllOps = (data, keepSessions = []) => {
  const currTimeline = {}
  // Initalize 
  let [enterTypes, resetCount, timePlayed, seedsPlayed, owRTA, preBlindRTA, preBlindCount] = [{}, 0, 0, 0, 0, 0, 0]

  let biomeTypes = {
    "beach": { total: 0, sum: 0 },
    "forest": { total: 0, sum: 0 },
    "plains": { total: 0, sum: 0 },
    "other": { total: 0, sum: 0 }
  }

  let ironTypes = {
    "Buried Treasure w/ tnt": { total: 0, sum: 0 },
    "Buried Treasure": { total: 0, sum: 0 },
    "Full Shipwreck": { total: 0, sum: 0 },
    "Half Shipwreck": { total: 0, sum: 0 },
    "Village": { total: 0, sum: 0 },
    "other": { total: 0, sum: 0 },
  }

  let enterInfo = {
    "Buried Treasure w/ tnt": null,
    "Buried Treasure": null,
    "Full Shipwreck": null,
    "Half Shipwreck": null,
    "Village": null,
    "other": null,
  }

  for (let ironType in enterInfo) {
    enterInfo[ironType] = {
      "Magma Ravine": { total: 0, sum: 0 },
      "Lava Pool": { total: 0, sum: 0 },
      "Bucketless": { total: 0, sum: 0 },
      "Obsidian": { total: 0, sum: 0 }
    }
  }


  let [wallRTA, netherRTA] = [0, 0]

  let netherTree = [
    { name: "No Structures", value: 0 },
    {
      name: "Bastion First", children: [
        { name: "1 Str", value: 0 },
        { name: "2 Str", value: 0 },
        { name: "Blind", value: 0 }
      ]
    },
    {
      name: "Fortress First", children: [
        { name: "1 Str", value: 0 },
        { name: "2 Str", value: 0 },
        { name: "Blind", value: 0 }
      ]
    }
  ]

  let prevTime = null
  let currSess = 0
  data.forEach((item, idx) => {
    // Determine if this is valid for the session
    if (item["Date and Time"].length === 0)
      return
    let currTime = (new Date(item["Date and Time"])).getTime()
    if (idx > 0 && isNewSession(prevTime, currTime, timeToMs(data[idx - 1]["Break RTA Since Prev"])))
      currSess++
    prevTime = currTime
    if (keepSessions.size > 0 && !keepSessions.has(currSess))
      return

    let lastTime = 0
    timelines.forEach((tItem, idx) => {
      if (!currTimeline.hasOwnProperty(tItem)) {
        currTimeline[tItem] = { total: 0, sum: 0, relativeTotal: 0, relativeSum: 0, preSplitRTA: 0, cDist: [], rDist: [] }
      }
      if (item[tItem].length > 0 || (tItem === "Bastion" && item["Fortress"].length > 0)) {
        // Do structure 1, structure 2
        if (tItem === "Bastion") {
          if (!currTimeline.hasOwnProperty("Fortress")) {
            currTimeline["Fortress"] = { total: 0, sum: 0, relativeTotal: 0, relativeSum: 0, preSplitRTA: 0, cDist: [], rDist: [] }
          }
          const bastTime = timeToMs(item["Bastion"])
          const fortTime = timeToMs(item["Fortress"])
          // For simplicity, bastion = structure 1, fortress = structure 2
          if (bastTime > 0 && fortTime > 0) {
            // Both structures
            currTimeline["Bastion"].preSplitRTA += Math.min(bastTime, fortTime)
            currTimeline["Fortress"].preSplitRTA += Math.max(bastTime, fortTime)
            currTimeline["Bastion"].cDist.push(Math.min(bastTime, fortTime))
            currTimeline["Fortress"].cDist.push(Math.max(bastTime, fortTime))
            currTimeline["Bastion"].rDist.push(Math.min(bastTime, fortTime) - lastTime)
            currTimeline["Fortress"].rDist.push(Math.abs(fortTime - bastTime))
            if (item["Nether Exit"].length > 0) {
              netherTree[((fortTime > bastTime) ? 1 : 2)].children[2].value += 1
            } else {
              netherTree[((fortTime > bastTime) ? 1 : 2)].children[1].value += 1
            }
          } else if (bastTime > 0) {
            // Just bastion
            currTimeline["Bastion"].preSplitRTA += bastTime
            currTimeline["Fortress"].preSplitRTA += timeToMs(item["RTA"])
            currTimeline["Bastion"].cDist.push(bastTime)
            currTimeline["Bastion"].rDist.push(bastTime - lastTime)
            netherTree[1].children[0].value += 1
          } else if (fortTime > 0) {
            // Just fortress
            currTimeline["Bastion"].preSplitRTA += fortTime
            currTimeline["Fortress"].preSplitRTA += timeToMs(item["RTA"])
            currTimeline["Bastion"].cDist.push(fortTime)
            currTimeline["Bastion"].rDist.push(fortTime - lastTime)
            netherTree[2].children[0].value += 1
          }
        } else if (tItem != "Fortress") {
          currTimeline[tItem].preSplitRTA += timeToMs(item[tItem])
          currTimeline[tItem].cDist.push(timeToMs(item[tItem]))
          if (idx !== 0) {
            currTimeline[tItem].rDist.push(timeToMs(item[tItem]) - lastTime)
          }
        }
        lastTime = timeToMs(item[tItem])
      } else {
        currTimeline[tItem].preSplitRTA += timeToMs(item["RTA"])
      }
    })

    // Data operations
    et(item, enterTypes)
    bt(item, biomeTypes)
    it(item, ironTypes)
    ei(item, enterInfo)
    resetCount += rc(item)
    timePlayed += tp(item)
    seedsPlayed += sp(item)
    owRTA += owTime(item)
    netherRTA += netherTime(item)
    const bphData = bph(item)
    preBlindRTA += bphData[0]
    preBlindCount += bphData[1]
    if (isPncakeTracker(data[0])) {
      wallRTA += wallTime(item)
    }
  })

  netherTree[0].value += (currTimeline["Nether"].cDist.length - currTimeline["Bastion"].cDist.length)

  // Average out all the data
  const finalTimeline = []
  let prevCount = resetCount
  timelines.forEach(tItem => {
    if (!currTimeline.hasOwnProperty(tItem))
      finalTimeline.push({ time: 0, total: 0, tsp: 0, XPH: 0, cStdev: 0, rStdev: 0, cDist: [], rDist: [], cConv: 0, rConv: 0 })
    else
      finalTimeline.push({
        time: mean(currTimeline[tItem].cDist),
        total: currTimeline[tItem].cDist.length,
        tsp: mean(currTimeline[tItem].rDist),
        xph: (currTimeline[tItem] ? currTimeline[tItem].total / (currTimeline[tItem].preSplitRTA / 1000 / 60 / 60) : 0),
        cStdev: stdev(currTimeline[tItem].cDist),
        rStdev: stdev(currTimeline[tItem].rDist),
        cDist: processLinePlotData(currTimeline[tItem].cDist),
        rDist: processLinePlotData(currTimeline[tItem].rDist),
        cConv: currTimeline[tItem].cDist.length / resetCount,
        rConv: currTimeline[tItem].cDist.length / prevCount
      })
    prevCount = currTimeline[tItem].cDist.length
  })

  const ops = {
    ot: owRTA,
    nt: netherRTA,
    tl: finalTimeline,
    rc: resetCount,
    pc: seedsPlayed,
    tp: timePlayed,
    nph: (currTimeline["Nether"] ? currTimeline["Nether"].total : 0) / ((isPncakeTracker(data[0]) ? owRTA + wallRTA : owRTA) / 1000 / 60 / 60),
    bph: preBlindCount / (preBlindRTA / 1000 / 60 / 60),
    et: enterTypes,
    bt: biomeTypes,
    it: ironTypes,
    ei: enterInfo,
    ntd: netherTree,
    pn: isPncakeTracker(data[0])
  }

  if (isPncakeTracker(data[0])) {
    const ops1 = {
      wt: wallRTA,
    }
    return { ...ops, ...ops1 }
  } else {
    return ops
  }
}

// Session stats based off if time difference > like 1hr
export const splitIntoSessions = data => {
  const sessions = []
  let first = true;
  let prevTime = null;
  data.forEach((item, idx) => {
    if (item["Date and Time"].length === 0)
      return
    if (!first) {
      let currTime = (new Date(item["Date and Time"])).getTime()
      // If there was more than 1hr of gap, start a new session

      if (idx > 0 && ((!isPncakeTracker(data[idx - 1]) && isNewSession(prevTime, currTime, timeToMs(data[idx - 1]["Break RTA Since Prev"]))) || (isPncakeTracker(data[idx - 1]) && data[idx - 1]["Session Marker"].includes("$"))))
        sessions.push({ time: prevTime, entries: [item] })
      else
        sessions[sessions.length - 1].entries.push(item)
      prevTime = currTime
    } else {
      prevTime = (new Date(item["Date and Time"])).getTime()
      sessions.push({ time: prevTime, entries: [item] })
      first = false
    }
  })
  return sessions
}