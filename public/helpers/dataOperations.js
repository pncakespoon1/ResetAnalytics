// Wants:
// Graph session stats over time 

const timelines = ["Wood", "Iron Pickaxe", "Nether", "Bastion", "Fortress", "Nether Exit", "Stronghold", "End"]

const hmsToMs = (h, m, s) => h * 60 * 60 * 1000 + m * 60 * 1000 + s * 1000
const timeToMs = time => time.length > 0 ? hmsToMs(...time.split(":")) : 0
const isNewSession = (prev, curr, breakTime) => prev - curr - breakTime > (1000 * 60 * 60)

// Blinds per hour
export const blindsPerHour = (data, keepSessions=[]) => {
  let preBlindRTA = 0
  let preBlindCount = 0
  let prevTime = null
  let currSess = 0
  data.forEach((item, idx) => {
    if (item["Date and Time"].length === 0)
      return
    let currTime = (new Date(item["Date and Time"])).getTime()
    if (idx > 0 && isNewSession(prevTime, currTime, timeToMs(data[idx - 1]["Break RTA Since Prev"])))
      currSess++
    prevTime = currTime
    if (keepSessions.size > 0 && !keepSessions.has(currSess))
      return
    preBlindRTA += timeToMs(item["Nether Exit"].length > 0 ? item["Nether Exit"] : item["RTA"]) + timeToMs(item["RTA Since Prev"])
    preBlindCount += item["Nether Exit"].length > 0
  })
  return preBlindCount / (preBlindRTA / 1000 / 60 / 60)
}

// Nethers per hour
export const nethersPerHour = (data, keepSessions=[]) => {
  let owRTA = 0
  let netherCount = 0
  let prevTime = null
  let currSess = 0
  data.forEach((item, idx) => {
    if (item["Date and Time"].length === 0)
      return
    let currTime = (new Date(item["Date and Time"])).getTime()
    if (idx > 0 && isNewSession(prevTime, currTime, timeToMs(data[idx - 1]["Break RTA Since Prev"])))
      currSess++
    prevTime = currTime
    if (keepSessions.size > 0 && !keepSessions.has(currSess))
      return
    owRTA += timeToMs(item["Nether"].length > 0 ? item["Nether"] : item["RTA"]) + timeToMs(item["RTA Since Prev"])
    netherCount += item["Nether"].length > 0
  })
  return netherCount / (owRTA / 1000 / 60 / 60)
}

// RTA Nethers per hour
export const RTANethersPerHour = (data, keepSessions=[]) => {
  let breakTime = 0
  let netherCount = 0
  let prevTime = null
  let lastInSess = null
  let currSess = 0
  let totalRTA = 0
  data.forEach((item, idx) => {
    if (item["Date and Time"].length === 0)
      return
    let currTime = (new Date(item["Date and Time"])).getTime()
    if (idx > 0 && isNewSession(prevTime, currTime, timeToMs(data[idx - 1]["Break RTA Since Prev"]))) {
      if (currSess === 0)
        lastInSess = (new Date(data[0]["Date and Time"])).getTime()
      totalRTA += lastInSess - (new Date(data[idx - 1]["Date and Time"])).getTime() + timeToMs(data[idx - 1]["RTA Since Prev"])
      currSess++
      lastInSess = currTime
    }
    prevTime = currTime
    if (keepSessions.size > 0 && !keepSessions.has(currSess))
      return
    if (idx !== data.length - 1)
      breakTime += timeToMs(item["Break RTA Since Prev"])
    // If the run has a nether split, subtract Total RTA by RTA of run, then add Nether
    if (item["Nether"].length > 0) {
      totalRTA += timeToMs(item["Nether"]) - timeToMs(item["RTA"])
      netherCount++
    }
  })
  lastInSess = lastInSess || (new Date(data[0]["Date and Time"])).getTime()
  totalRTA +=  lastInSess - (new Date(data[data.length - 1]["Date and Time"])).getTime() + timeToMs(data[data.length - 1]["RTA Since Prev"])
  //console.log(totalRTA, breakTime, netherCount)
  return netherCount / ((totalRTA - breakTime) / 1000 / 60 / 60)
}

// Seeds Played
export const seedsPlayed = (data, keepSessions=[]) => {
  let seeds = 0
  let prevTime = null
  let currSess = 0
  data.forEach((item, idx) => {
    if (item["Date and Time"].length === 0)
      return
    let currTime = (new Date(item["Date and Time"])).getTime()
    if (idx > 0 && isNewSession(prevTime, currTime, timeToMs(data[idx - 1]["Break RTA Since Prev"])))
      currSess++
    prevTime = currTime
    if (keepSessions.size > 0 && !keepSessions.has(currSess))
      return
    seeds += parseInt(item["Played Since Prev"])
  })
  return seeds
}

// Total Playtime
export const totalPlaytime = (data, keepSessions=[]) => {
  let playtime = 0
  let prevTime = null
  let currSess = 0
  data.forEach((item, idx) => {
    if (item["Date and Time"].length === 0)
      return
    let currTime = (new Date(item["Date and Time"])).getTime()
    if (idx > 0 && isNewSession(prevTime, currTime, timeToMs(data[idx - 1]["Break RTA Since Prev"])))
      currSess++
    prevTime = currTime
    if (keepSessions.size > 0 && !keepSessions.has(currSess))
      return
    playtime += timeToMs(item["RTA Since Prev"]) + timeToMs(item["RTA"])
  })
  return playtime
}

// Reset count
export const resetCount = (data, keepSessions=[]) => data.reduce((total, curr) => {
  let resets = 0
  let prevTime = null
  let currSess = 0
  data.forEach((item, idx) => {
    if (item["Date and Time"].length === 0)
      return
    let currTime = (new Date(item["Date and Time"])).getTime()
    if (idx > 0 && isNewSession(prevTime, currTime, timeToMs(data[idx - 1]["Break RTA Since Prev"])))
      currSess++
    prevTime = currTime
    if (keepSessions.size > 0 && !keepSessions.has(currSess))
      return
    resets += parseInt(item["Wall Resets Since Prev"]) + parseInt(item["Played Since Prev"]) + 1
  })
  return resets
}, 0)

// Averages for all timeline stats
export const avgTimelines = (data, keepSessions=[]) => {
  const currTimeline = {}
  // Initalize 
  let prevTime = null
  let currSess = 0
  data.forEach((item, idx) => {
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
      if (item[tItem].length > 0) {
        if (!currTimeline.hasOwnProperty(tItem))
          currTimeline[tItem] = {total: 0, sum: 0, relativeTotal: 0, relativeSum: 0}
        // Do structure 1, structure 2
        if (tItem === "Bastion") {
          if (!currTimeline.hasOwnProperty("Bastion"))
            currTimeline["Bastion"] = {total: 0, sum: 0, relativeTotal: 0, relativeSum: 0}
          if (!currTimeline.hasOwnProperty("Fortress"))
            currTimeline["Fortress"] = {total: 0, sum: 0, relativeTotal: 0, relativeSum: 0}
          const bastTime = timeToMs(item["Bastion"])
          const fortTime = timeToMs(item["Fortress"])
          // For simplicity, bastion = structure 1, fortress = structure 2
          if (bastTime > 0 && fortTime > 0) {
            // Both structures
            currTimeline["Bastion"].total++
            currTimeline["Fortress"].total++
            currTimeline["Bastion"].sum += Math.min(bastTime, fortTime)
            currTimeline["Fortress"].sum += Math.max(bastTime, fortTime)
            currTimeline["Bastion"].relativeTotal++
            currTimeline["Fortress"].relativeTotal++
            currTimeline["Bastion"].relativeSum += Math.min(bastTime, fortTime) - lastTime
            currTimeline["Fortress"].relativeSum += Math.abs(fortTime - bastTime)
          } else if (bastTime > 0) {
            // Just bastion
            currTimeline["Bastion"].total++
            currTimeline["Bastion"].sum += bastTime
            currTimeline["Bastion"].relativeSum += bastTime - lastTime
            currTimeline["Bastion"].relativeTotal++
          } else if (fortTime > 0) {
            // Just fortress
            currTimeline["Bastion"].total++
            currTimeline["Bastion"].sum += fortTime
          }
        } else if (tItem != "Fortress") {
          currTimeline[tItem].total += 1
          currTimeline[tItem].sum += timeToMs(item[tItem])
          if (idx !== 0) {
            currTimeline[tItem].relativeSum += timeToMs(item[tItem]) - lastTime
            currTimeline[tItem].relativeTotal++
          }
        }
        lastTime = timeToMs(item[tItem])
      }
    })
  })
  // Average out all the data
  const finalTimeline = []
  timelines.forEach(tItem => {
    if (!currTimeline.hasOwnProperty(tItem))
      finalTimeline.push({time: 0, total: 0, tsp: 0})
    else
      finalTimeline.push({
        time: currTimeline[tItem].sum / currTimeline[tItem].total,
        total: currTimeline[tItem].total,
        tsp: currTimeline[tItem].relativeSum / currTimeline[tItem].relativeTotal
      })
  })
  return finalTimeline
}

export const enterTypeAnalysis = (data, keepSessions=[]) => {
  const enterTypes = {}
  let prevTime = null
  let currSess = 0
  data.forEach((item, idx) => {
    if (item["Date and Time"].length === 0)
      return
    let currTime = (new Date(item["Date and Time"])).getTime()
    if (idx > 0 && isNewSession(prevTime, currTime, timeToMs(data[idx - 1]["Break RTA Since Prev"])))
      currSess++
    prevTime = currTime
    if (keepSessions.size > 0 && !keepSessions.has(currSess))
      return
    if (item["Enter Type"] !== "None") {
      if (!enterTypes.hasOwnProperty(item["Enter Type"]))
        enterTypes[item["Enter Type"]] = {total: 0, sum: 0}
      enterTypes[item["Enter Type"]].total += 1
      enterTypes[item["Enter Type"]].sum += timeToMs(item["Nether"])
    }
  })
  return enterTypes
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

      if (idx > 0 && isNewSession(prevTime, currTime, timeToMs(data[idx - 1]["Break RTA Since Prev"])))
        sessions.push({time: prevTime, entries: [item]})
      else
        sessions[sessions.length - 1].entries.push(item)
      prevTime = currTime
    } else {
      prevTime = (new Date(item["Date and Time"])).getTime()
      sessions.push({time: prevTime, entries: [item]})
      first = false
    }
  })
  return sessions
}